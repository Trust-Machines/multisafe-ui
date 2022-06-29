import {script, Network, networks, payments} from 'bitcoinjs-lib';
import React, {useEffect, useState} from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useConnect} from '@stacks/connect-react';
import {
    bufferCVFromString,
    callReadOnlyFunction,
    contractPrincipalCV, createAssetInfo, cvToJSON, FungibleConditionCode, listCV,
    makeStandardFungiblePostCondition,
    noneCV,
    PostConditionMode,
    standardPrincipalCV, tupleCV, ClarityValue,
    uintCV, bufferCV
} from '@stacks/transactions';
import {bytesToHex} from 'micro-stacks/common';
import {hashSha256} from 'micro-stacks/crypto-sha';
import {getRandomBytes} from 'micro-stacks/crypto';
import {hexToBytes, intToBigInt} from 'micro-stacks/common';

import {getPublicKey} from 'noble-secp256k1';
import {NETWORK, MAGIC_BRIDGE} from '@trustmachines/multisafe-contracts';
import useTranslation from '../../../hooks/use-translation';
import useSafe from '../../../hooks/use-safe';
import useModal from '../../../hooks/use-modal';
import useSafeCalls from '../../../hooks/use-safe-call';
import usePendingTxs from '../../../hooks/use-pending-txs';
import useUserSession from '../../../hooks/use-user-session';
import SectionHeader from '../components/section-header';
import {contractPrincipalCVFromString} from '../../../helper';
import {generateHTLCAddress, numberToLE} from '../../../helper/hltc';
import useNetwork from '../../../hooks/use-network';
import useAddress from '../../../hooks/use-address';


// fetch supplier data

const BRIDGE_API = 'http://localhost:4444/api';

interface Supplier {
    controller: string,
    inboundFee: number,
    outboundFee: number,
    outboundBaseFee: number,
    inboundBaseFee: number,
    publicKey: string,
    funds: number,
    id: number
}

export interface InboundSwapStarted {
    id: string;
    supplier: Supplier;
    createdAt: number;
    secret: string;
    expiration: number;
    publicKey: string;
    inputAmount: string;
}

export interface InboundSwapReady extends InboundSwapStarted {
    address: string;
    swapperId: number;
}

export interface InboundSwapWarned extends InboundSwapReady {
    warned: true;
}


const fetchSupplier = async (id: number): Promise<Supplier> => {
    const suppliers: Supplier[] = await fetch(`${BRIDGE_API}/suppliers`).then(r => r.json()).then(r => r.suppliers);
    return suppliers.find(x => x.id === id)!;
}

export async function fetchBtcTxData(txid: string, address: string): Promise<any> {
    const url = `${BRIDGE_API || ''}/api/tx-data?txid=${txid}&address=${address}`;
    const res = await fetch(url).then(r => r.json());
    console.log(res)
}


interface Unsent {
    status: 'unsent';
}

interface Unconfirmed {
    status: 'unconfirmed';
    txid: string;
    amount: string;
    outputIndex: number;
}

interface Confirmed {
    status: 'confirmed';
    txid: string;
    txData: any;
    amount: string;
    outputIndex: number;
}

export type WatchAddressApi = Unsent | Unconfirmed | Confirmed;

const watchAddress = async (address: string): Promise<WatchAddressApi> => {
    const url = `${BRIDGE_API}/watch-address?address=${address}`;
    const res = await fetch(url);
    const data = (await res.json());
    return data;
}

export function createId() {
    return `${new Date().getTime()}`;
}

export function createReadySwap(swap: InboundSwapStarted, swapperId: number): InboundSwapReady {
    const {secret, publicKey, supplier} = swap;
    const hash = hashSha256(hexToBytes(secret));
    const payment = generateHTLCAddress({
        senderPublicKey: Buffer.from(publicKey, 'hex'),
        recipientPublicKey: Buffer.from(supplier.publicKey, 'hex'),
        swapper: swapperId,
        hash: Buffer.from(hash),
        expiration: swap.expiration,
    });
    return {
        ...swap,
        address: payment.address!,
        swapperId,
    };
}


export function createInboundSwap({
                                      supplier,
                                      swapperId,
                                      publicKey,
                                      inputAmount,
                                      expiration = 500,
                                  }: {
    supplier: Supplier;
    swapperId?: number;
    publicKey: string;
    inputAmount: string;
    expiration?: number;
}): InboundSwapStarted | InboundSwapReady {
    const secret = getRandomBytes(32);
    const swap = {
        id: createId(),
        secret: bytesToHex(secret),
        createdAt: new Date().getTime(),
        supplier,
        publicKey,
        inputAmount,
        expiration,
    };
    if (swapperId !== undefined) {
        return createReadySwap(swap, swapperId);
    }
    return swap;
}


const SwapView = (props: { swap: InboundSwapReady }) => {
    const {swap,} = props;
    const [userSession] = useUserSession();

    const [txState, setTxState] = useState<WatchAddressApi | null>(null);
    const {safe} = useSafe();
    const {doContractCall} = useConnect();
    const [network, stacksNetwork] = useNetwork();
    const watch = () => {
        setTxState(null)
        watchAddress(swap.address).then(r => {
            setTxState(r)
        })
    }

    const finalize = () => {
        if (txState?.status !== 'confirmed') {
            return;
        }


        const {secret} = swap;
        const txBuff = Buffer.from(txState.txid, 'hex');
        const preimageBuff = Buffer.from(hexToBytes(secret));
        const functionArgs: ClarityValue[] = [
            contractPrincipalCVFromString(MAGIC_BRIDGE[network]),
            bufferCV(txBuff),
            bufferCV(preimageBuff),
        ]

        const [contractAddress, contractName] = safe.fullAddress.split('.')
        doContractCall({
            network: stacksNetwork,
            contractAddress,
            contractName,
            functionName: 'mb-finalize-swap',
            functionArgs,
            postConditionMode: PostConditionMode.Allow,
            onFinish: (data) => {
                console.log(data);
            },
        })

    }

    const escrow = () => {
        if (txState?.status !== 'confirmed') {
            return;
        }

        const privateKey = userSession!.loadUserData().appPrivateKey;
        const publicKey = getPublicKey(privateKey, true);

        const {txData} = txState;
        // @ts-ignore
        const {secret, supplier, address} = swap;

        const {block, proof, txHex, outputIndex, prevBlocks, amount, burnHeight} = txData;
        console.log(txData)
        const param_block = tupleCV({
            height: uintCV(block.height),
            header: bufferCV(Buffer.from(block.header, 'hex'))
        });

        const param_prevBlocks = listCV([]);
        const param_txHex = bufferCV(Buffer.from(txHex, 'hex'));
        const param_proof = tupleCV({
            hashes: listCV(proof.hashes.map((x: any) => bufferCV(Buffer.from(x, 'hex')))),
            'tree-depth': uintCV(proof['tree-depth']),
            'tx-index': uintCV(proof['tx-index']),
        });

        const param_outputIndex = uintCV(outputIndex);
        const swapperHex = numberToLE(swap.swapperId);

        const amountWithFeeRate = (amount * (10000 - supplier.inboundFee)) / 10000;
        const minToReceive = amountWithFeeRate - supplier.inboundBaseFee;

        const functionArgs: ClarityValue[] = [
            contractPrincipalCVFromString(MAGIC_BRIDGE[network]),
            param_block,
            param_prevBlocks,
            param_txHex,
            param_proof,
            param_outputIndex,
            bufferCV(Buffer.from(publicKey, 'hex')),
            bufferCV(Buffer.from(supplier.publicKey, 'hex')),
            bufferCV(script.number.encode(swap.expiration)),
            bufferCV(Buffer.from(hashSha256(hexToBytes(secret)))),
            bufferCV(Buffer.from(swapperHex, 'hex')),
            uintCV(supplier.id),
            uintCV(minToReceive)
        ]

        const [contractAddress, contractName] = safe.fullAddress.split('.')
        doContractCall({
            network: stacksNetwork,
            contractAddress,
            contractName,
            functionName: 'mb-escrow-swap',
            functionArgs,
            postConditionMode: PostConditionMode.Allow,
            onFinish: (data) => {
                console.log(data);
            },
        })


    }

    return <>
        <Box sx={{mb: '10px'}}> {swap.address}{' - '}{swap.id}</Box>
        <Box sx={{mb: '10px'}}><Button variant="contained" onClick={watch}>Watch</Button></Box>

        {txState && (
            <Box>
                Status: {txState.status}<br/>
                {txState.status === 'confirmed' && <>
                    <br/><br/>txId: {txState.txid}
                    <br/><br/>txData: <Box component="textarea" sx={{
                    width: '100%',
                    height: '300px',
                    mb: '10px'
                }} defaultValue={JSON.stringify(txState.txData, null, 2)}/>
                    <Button variant="contained" onClick={escrow}>Escrow</Button>
                    <Button variant="contained" onClick={finalize}>Finalize</Button>
                </>}
            </Box>
        )}

    </>;
}


const BtcBridge = (props: { readOnly: boolean }) => {
    const {readOnly} = props;

    const [swaps, setSwaps] = useState<InboundSwapReady[]>([]);
    const [swap, setSwap] = useState<InboundSwapReady | null>(null);
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const {safe} = useSafe();
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const {safeSetThresholdCall} = useSafeCalls();
    const [pendingTxs] = usePendingTxs();
    const [threshold, setThreshold] = useState<number>(safe.threshold);
    const {doSTXTransfer, doContractCall} = useConnect();
    const [network, stacksNetwork] = useNetwork();
    const [userSession] = useUserSession();
    const address = useAddress();

    const readSwaps = () => {
        const keys = Object.keys(localStorage);
        const swaps = (keys.map(x => x.startsWith('inbound-swap-') ? JSON.parse(localStorage.getItem(x)!) : null).filter(x => x)) as InboundSwapReady[];
        setSwaps(swaps);
    }

    useEffect(() => {
        readSwaps();
    }, []);

    const fetchSwapperId = async () => {
        const [contractAddress, contractName] = MAGIC_BRIDGE[network].split('.')
        const resp = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-swapper-id',
            functionArgs: [contractPrincipalCVFromString(safe.fullAddress)],
            senderAddress: address!,
            network: stacksNetwork
        });
        const js = cvToJSON(resp);
        return Number(js.value.value);
    }

    const initialize = () => {
        const [contractAddress, contractName] = safe.fullAddress.split('.');
        doContractCall({
            network: stacksNetwork,
            contractAddress,
            contractName,
            functionName: 'mb-initialize-swapper',
            functionArgs: [
                contractPrincipalCVFromString(MAGIC_BRIDGE[network])
            ],
            postConditionMode: PostConditionMode.Deny,
            onFinish: (data) => {
                console.log(data)
            },
        }).then();
    }

    const generateInboundSwap = async () => {
        const supplierId = 0;
        const swapperId = await fetchSwapperId();

        const supplier = await fetchSupplier(supplierId);
        setSupplier(supplier);
        const privateKey = userSession!.loadUserData().appPrivateKey;
        const publicKey = getPublicKey(privateKey, true);
        const expiration = undefined;
        const inputAmount = '40000'; // 0.0004

        const swap = createInboundSwap({
            supplier,
            publicKey,
            inputAmount,
            swapperId,
            expiration,
        });

        localStorage.setItem(`inbound-swap-${createId()}`, JSON.stringify(swap));
        readSwaps();
    }

    return <>
        <SectionHeader title={t('BTC Bridge')} icon={<FactCheckIcon/>}/>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            <Box sx={{mb: '40px'}}>
                <Button onClick={initialize} variant="contained">Initialize</Button>
            </Box>
            <Box sx={{mb: '40px'}}>
                <Button onClick={generateInboundSwap} variant="contained">Register Inbound Swap</Button>
            </Box>
            <Box sx={{mb: '40px'}}>
                <h3>Swaps</h3>
                {swaps.map(s => {
                    return <Box key={s.id} sx={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        mb: '10px'
                    }} onClick={() => {
                        setSwap(s);
                    }}>
                        {s.address}{' - '}{s.id}
                    </Box>
                })}
            </Box>

            {swap && (
                <>
                    <hr/>
                    <SwapView swap={swap}/>
                </>
            )}
        </Box>
    </>
}

export default BtcBridge;

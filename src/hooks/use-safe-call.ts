import {FinishedTxData, useConnect} from '@stacks/connect-react';
import {
    bufferCVFromString,
    ClarityValue,
    contractPrincipalCV,
    noneCV,
    PostConditionMode,
    someCV,
    standardPrincipalCV,
    uintCV
} from '@stacks/transactions';
import {DEPLOYER} from '@trustmachines/multisafe-contracts';
import useNetwork from './use-network';
import useSafe from './use-safe';
import usePendingTxs from './use-pending-txs';
import {contractPrincipalCVFromString} from '../helper';
import {SafeTransaction} from '../store/safe';

const useSafeCalls = (): {
    safeAddOwnerCall: (owner: string) => Promise<FinishedTxData>,
    safeRemoveOwnerCall: (owner: string) => Promise<FinishedTxData>,
    safeSetThresholdCall: (threshold: number) => Promise<FinishedTxData>,
    safeConfirmTxCall: (transaction: SafeTransaction) => Promise<FinishedTxData>,
    safeRevokeTxCall: (txId: number) => Promise<FinishedTxData>,
    safeTransferFtCall: (ft: string, amount: string, recipient: string, memo: string) => Promise<FinishedTxData>,
    safeTransferStxCall: (recipient: string, amount: string, memo: string) => Promise<FinishedTxData>,
    safeTransferNftCall: (nft: string, id: string, recipient: string) => Promise<FinishedTxData>,
} => {
    const {doContractCall} = useConnect();
    const [network, stacksNetwork] = useNetwork();
    const [safe,] = useSafe();
    const [, syncPendingTxs] = usePendingTxs();

    const doSafeCall = (fn: 'submit' | 'confirm' | 'revoke', args: ClarityValue[]): Promise<FinishedTxData> => new Promise((resolve) => {
        doContractCall({
            network: stacksNetwork,
            contractAddress: safe.address,
            contractName: safe.name,
            functionName: fn,
            functionArgs: args,
            postConditionMode: PostConditionMode.Allow,
            onFinish: (data) => {
                resolve(data);
                syncPendingTxs();
            }
        }).then()
    });

    const safeAddOwnerCall = (owner: string) => doSafeCall('submit', [
        contractPrincipalCV(DEPLOYER[network], 'add-owner'),
        contractPrincipalCV(safe.address, safe.name),
        contractPrincipalCV(DEPLOYER[network], 'ft-none'),
        contractPrincipalCV(DEPLOYER[network], 'nft-none'),
        someCV(standardPrincipalCV(owner)),
        noneCV(),
        noneCV(),
    ]);

    const safeRemoveOwnerCall = (owner: string) => doSafeCall('submit', [
        contractPrincipalCV(DEPLOYER[network], 'remove-owner'),
        contractPrincipalCV(safe.address, safe.name),
        contractPrincipalCV(DEPLOYER[network], 'ft-none'),
        contractPrincipalCV(DEPLOYER[network], 'nft-none'),
        someCV(standardPrincipalCV(owner)),
        noneCV(),
        noneCV(),
    ]);

    const safeSetThresholdCall = (threshold: number) => doSafeCall('submit', [
        contractPrincipalCV(DEPLOYER[network], 'set-threshold'),
        contractPrincipalCV(safe.address, safe.name),
        contractPrincipalCV(DEPLOYER[network], 'ft-none'),
        contractPrincipalCV(DEPLOYER[network], 'nft-none'),
        noneCV(),
        someCV(uintCV(threshold)),
        noneCV(),
    ]);

    const safeConfirmTxCall = (transaction: SafeTransaction) => doSafeCall('confirm', [
        uintCV(transaction.id),
        contractPrincipalCVFromString(transaction.executor),
        contractPrincipalCV(safe.address, safe.name),
        contractPrincipalCVFromString(transaction.paramFt),
        contractPrincipalCVFromString(transaction.paramNft),
    ]);

    const safeRevokeTxCall = (txId: number) => doSafeCall('revoke', [
        uintCV(txId)
    ]);

    const safeTransferFtCall = (ft: string, recipient: string, amount: string, memo: string) => doSafeCall('submit', [
        contractPrincipalCV(DEPLOYER[network], 'transfer-sip-010'),
        contractPrincipalCV(safe.address, safe.name),
        contractPrincipalCVFromString(ft),
        contractPrincipalCV(DEPLOYER[network], 'nft-none'),
        someCV(standardPrincipalCV(recipient)),
        someCV(uintCV(amount)),
        memo.length > 0 ? someCV(bufferCVFromString(memo)) : noneCV(),
    ]);

    const safeTransferStxCall = (recipient: string, amount: string, memo: string) => doSafeCall('submit', [
        contractPrincipalCV(DEPLOYER[network], 'transfer-stx'),
        contractPrincipalCV(safe.address, safe.name),
        contractPrincipalCV(DEPLOYER[network], 'ft-none'),
        contractPrincipalCV(DEPLOYER[network], 'nft-none'),
        someCV(standardPrincipalCV(recipient)),
        someCV(uintCV(amount)),
        memo.length > 0 ? someCV(bufferCVFromString(memo)) : noneCV()
    ]);

    const safeTransferNftCall = (nft: string, id: string, recipient: string) => doSafeCall('submit', [
        contractPrincipalCV(DEPLOYER[network], 'transfer-sip-009'),
        contractPrincipalCV(safe.address, safe.name),
        contractPrincipalCV(DEPLOYER[network], 'ft-none'),
        contractPrincipalCVFromString(nft),
        someCV(standardPrincipalCV(recipient)),
        someCV(uintCV(id)),
        noneCV(),
    ]);

    return {
        safeAddOwnerCall,
        safeRemoveOwnerCall,
        safeSetThresholdCall,
        safeConfirmTxCall,
        safeRevokeTxCall,
        safeTransferFtCall,
        safeTransferStxCall,
        safeTransferNftCall
    };
}

export default useSafeCalls;
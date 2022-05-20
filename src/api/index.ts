import {StacksNetwork} from '@stacks/network';
import {
    callReadOnlyFunction,
    ClarityValue,
    cvToJSON,
    cvToValue,
    listCV,
    uintCV
} from '@stacks/transactions';
import {SafeTransaction} from '../store/safe';
import ftList from '../constants/ft-list';
import {FTAsset} from '../types';
import {TX_PER_PAGE} from '../constants';

export const getAccountMemPool = (network: StacksNetwork, account: string): Promise<{
    tx_id: string,
    contract_call?: {
        contract_id: string,
        function_name: string,
        function_args: {
            name: string
            repr: string
            type: string
        } []
    }
}[]> => {
    return fetch(`${network.coreApiUrl}/extended/v1/tx/mempool?sender_address=${account}`).then(r => r.json()).then(r => r.results);
}

export const getBnsName = (network: StacksNetwork, address: string): Promise<string | null> => {
    return fetch(`${network.coreApiUrl}/v1/addresses/stacks/${address}`).then(r => r.json()).then(r => {
        if (r.names.length > 0) {
            return r.names[0];
        }
        return null;
    })
}

export const resolveBnsName = (network: StacksNetwork, name: string): Promise<string | null> => {
    return fetch(`${network.coreApiUrl}/v1/names/${name}`).then(r => r.json()).then(r => {
        if (r.error) {
            return null;
        }
        return r.address;
    });
}

export const getContractInfo = (network: StacksNetwork, address: string, name: string): Promise<{ tx_id: string } | null> => {
    const contractId = `${address}.${name}`;
    return fetch(`${network.coreApiUrl}/extended/v1/contract/${contractId}?unanchored=true`).then(r => r.json()).then(r => {
        if (r.tx_id) {
            return r;
        }

        return null;
    });
}

export interface AddressBalance {
    stx: {
        balance: string
    },
    fungible_tokens: Record<string, { balance: string }>
}

export const getContractBalances = (network: StacksNetwork, address: string): Promise<AddressBalance> => {
    const [contractAddress, contractName] = address.split('.')
    return fetch(`${network.coreApiUrl}/extended/v1/address/${contractAddress}.${contractName}/balances`).then(r => r.json())
}

export const callReadOnly = (network: StacksNetwork, path: string, functionArgs: ClarityValue[], senderAddress: string) => {
    const [contractAddress, contractName, functionName] = path.split('.')
    return callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName,
        functionArgs,
        senderAddress,
        network
    })
}

export interface SafeInfo {
    version: string,
    owners: string[],
    threshold: number,
    nonce: number
}

export const getSafeInfo = (network: StacksNetwork, safe: string, senderAddress: string): Promise<SafeInfo> => {
    return callReadOnly(network, `${safe}.get-info`, [], senderAddress).then(r => {
        const js = cvToJSON(r);
        return {
            version: js.value.version.value,
            owners: js.value.owners.value.map((x: any) => x.value),
            threshold: Number(js.value.threshold.value),
            nonce: Number(js.value.nonce.value),
        }
    });
}

export const getSafeTransactions = (network: StacksNetwork, safe: string, nonce: number, senderAddress: string): Promise<SafeTransaction[]> => {
    const txIds: number[] = [];
    for (let x = nonce - 1; x >= 0; x--) {
        txIds.push(x);

        if (txIds.length === TX_PER_PAGE) {
            break;
        }
    }
    const args = [listCV([...txIds.map(x => uintCV(x))])];
    return callReadOnly(network, `${safe}.get-transactions`, args, senderAddress).then(r => {
        return cvToJSON(r).value.map((x: any, i: number) => {

            return {
                id: txIds[i],
                confirmations: x.value.confirmations.value.map((c: any) => c.value),
                confirmed: x.value.confirmed.value,
                executor: x.value.executor.value,
                threshold: Number(x.value.threshold.value),
                paramFt: x.value['param-ft'].value,
                paramNft: x.value['param-nft'].value,
                paramP: x.value['param-p'].value ? x.value['param-p'].value.value : null,
                paramU: x.value['param-u'].value ? x.value['param-u'].value.value : null,
                paramB: x.value['param-b'].value ? x.value['param-b'].value.value : null,
            }
        });
    });
}

export const getFTInfo = async (network: StacksNetwork, address: string, senderAddress: string): Promise<FTAsset> => {
    const inList = ftList[network.isMainnet() ? 'mainnet' : 'testnet'].find(x => x.address === address);
    if (inList) {
        return inList;
    }

    return Promise.all([
        callReadOnly(network, `${address}.get-name`, [], senderAddress),
        callReadOnly(network, `${address}.get-symbol`, [], senderAddress),
        callReadOnly(network, `${address}.get-decimals`, [], senderAddress)
    ]).then(r => {
        return {
            address,
            name: cvToValue(r[0]).value,
            symbol: cvToValue(r[1]).value,
            decimals: Number(cvToValue(r[2]).value)
        }
    })
}
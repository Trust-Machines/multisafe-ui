import {StacksNetwork} from '@stacks/network';
import {callReadOnlyFunction, ClarityValue, cvToJSON, listCV, uintCV} from '@stacks/transactions';
import {SafeTransaction} from '../store/safe';

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
    }
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

export const getSafeVersion = (network: StacksNetwork, safe: string, senderAddress: string): Promise<string> => {
    return callReadOnly(network, `${safe}.get-version`, [], senderAddress).then(r => {
        return cvToJSON(r).value
    });
}

export const getSafeNonce = (network: StacksNetwork, safe: string, senderAddress: string): Promise<number> => {
    return callReadOnly(network, `${safe}.get-nonce`, [], senderAddress).then(r => {
        return Number(cvToJSON(r).value);
    });
}

export const getSafeOwners = (network: StacksNetwork, safe: string, senderAddress: string): Promise<string[]> => {
    return callReadOnly(network, `${safe}.get-owners`, [], senderAddress).then(r => {
        return cvToJSON(r).value.map((x: any) => x.value);
    });
}

export const getSafeMinConfirmation = (network: StacksNetwork, safe: string, senderAddress: string): Promise<number> => {
    return callReadOnly(network, `${safe}.get-min-confirmation`, [], senderAddress).then(r => {
        return Number(cvToJSON(r).value);
    });
}

export const getSafeTransactions = (network: StacksNetwork, safe: string, nonce: number, senderAddress: string):Promise<SafeTransaction> => {
    const txIds: number[] = [];
    for (let x = nonce - 1; x >= 0; x--) {
        txIds.push(x);

        if (txIds.length === 20) {
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
                paramP: x.value['param-p'].value,
                paramU: x.value['param-u'].value
            }
        });
    });
}
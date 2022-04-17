import {StacksNetwork} from '@stacks/network';
import {callReadOnlyFunction, ClarityValue, cvToJSON} from '@stacks/transactions';

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

export const getSafeThreshold = (network: StacksNetwork, safe: string, senderAddress: string): Promise<number> => {
    return callReadOnly(network, `${safe}.get-min-confirmation`, [], senderAddress).then(r => {
        return Number(cvToJSON(r).value);
    });
}
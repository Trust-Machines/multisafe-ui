import {StacksNetwork} from '@stacks/network';

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
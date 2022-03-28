import {useState, useEffect} from 'react';
import {standardPrincipalCV, callReadOnlyFunction, cvToJSON} from '@stacks/transactions';

import useAddress from './useAddress';
import useNetwork from './useNetwork';

import {BNS_ADDRESSES} from '../constants';

const useBnsName = (): string | null => {
    const [name, setName] = useState<string | null>(null);
    const address = useAddress();
    const [network, stacksNetwork] = useNetwork()

    useEffect(() => {
        setName(null);
        if (!address) {
            return;
        }
        
        callReadOnlyFunction({
            contractAddress: BNS_ADDRESSES[network],
            contractName: 'bns',
            functionName: 'resolve-principal',
            functionArgs: [standardPrincipalCV(address)],
            senderAddress: address,
            network: stacksNetwork
        }).then(r => {
            const res = cvToJSON(r).value.value;
            if (res?.name?.value && res?.namespace?.value) {
                const bnsName = `${Buffer.from(res.name.value.substring(2), 'hex').toString('ascii')}.${Buffer.from(res.namespace.value.substring(2), 'hex').toString('ascii')}`;
                setName(bnsName);
            }
        })
    }, [address, network, stacksNetwork])

    return name;
}

export default useBnsName;
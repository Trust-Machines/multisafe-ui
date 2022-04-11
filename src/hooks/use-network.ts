import {useMemo} from 'react';
import {useAtom} from 'jotai';
import {StacksMainnet, StacksNetwork, StacksTestnet} from '@stacks/network';
import {NETWORK} from '@trustmachines/multisafe-contracts';

import {networkAtom} from '../store';

const useNetwork = (): [NETWORK, StacksNetwork, (n: NETWORK) => void] => {
    const [network, setNetwork_] = useAtom(networkAtom);

    const setNetwork = (n: NETWORK) => {
        setNetwork_(n);
        localStorage.setItem('app_network', n)
    }

    const stacksNetwork = useMemo(() => network === 'mainnet' ? new StacksMainnet() : new StacksTestnet(), [network]);

    return [network, stacksNetwork, setNetwork];
}

export default useNetwork;
import {useMemo} from 'react';
import {useAtom} from 'jotai';
import {StacksMainnet, StacksNetwork, StacksTestnet} from '@stacks/network';

import {networkAtom} from '../store';

import {Network} from '../store/network';

const useNetwork = (): [Network, StacksNetwork, (n: Network) => void] => {
    const [network, setNetwork_] = useAtom(networkAtom);

    const setNetwork = (n: Network) => {
        setNetwork_(n);
        localStorage.setItem('app_network', n)
    }

    const stacksNetwork = useMemo(() => network === 'mainnet' ? new StacksMainnet() : new StacksTestnet(), [network]);

    return [network, stacksNetwork, setNetwork];
}

export default useNetwork;
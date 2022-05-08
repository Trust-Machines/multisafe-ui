import {useAtom} from 'jotai';
import {StacksNetwork} from '@stacks/network';
import {NETWORK} from '@trustmachines/multisafe-contracts';

import {networkAtom} from '../store';
import {getStacksNetwork} from '../helper';

const useNetwork = (): [NETWORK, StacksNetwork, (n: NETWORK) => void] => {
    const [network, setNetwork_] = useAtom(networkAtom);

    const setNetwork = (n: NETWORK) => {
        setNetwork_(n);
        localStorage.setItem('app_network', n)
    }

    const stacksNetwork = getStacksNetwork(network)

    return [network, stacksNetwork, setNetwork];
}

export default useNetwork;
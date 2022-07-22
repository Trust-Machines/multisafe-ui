import {StacksNetwork} from 'micro-stacks/network';
import {NETWORK} from '@trustmachines/multisafe-contracts';
import * as MicroStacks from '@micro-stacks/react'
import {getStacksNetwork} from '../helper';

const useNetwork = (): [NETWORK, StacksNetwork, (n: NETWORK) => void] => {
    const {setNetwork, isMainnet} = MicroStacks.useNetwork()
    const network = isMainnet ? 'mainnet' : 'testnet'

    const stacksNetwork = getStacksNetwork(network)

    return [network, stacksNetwork, setNetwork];
}

export default useNetwork;

import {Network} from './store/network';

export const BASE_NETWORKS: Network[] = ['mainnet', 'testnet'];

export const BNS_ADDRESSES: Record<Network, string> = {
    'mainnet': 'SP000000000000000000002Q6VF78',
    'testnet': 'ST000000000000000000002AMW42H',
}
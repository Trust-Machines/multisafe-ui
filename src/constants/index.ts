import {NETWORK} from '@trustmachines/multisafe-contracts';
import {StacksMainnet, StacksTestnet, StacksNetwork} from 'micro-stacks/network';

export const baseAuthOptions = {
    redirectTo: '/',
    manifestPath: '/manifest.json',
    appDetails: {
        name: 'MultiSafe',
        icon: `${window.origin}/logo512.png`,
    },
}

export const NULL_ADDRESS: Record<NETWORK, string> = {
    mainnet: 'SP000000000000000000002Q6VF78',
    testnet: 'ST000000000000000000002AMW42H'
}

export const NETWORKS: Record<NETWORK, StacksNetwork> = {
    'mainnet': new StacksMainnet(),
    'testnet': new StacksTestnet()
}

export const DATA_BACKENDS: Record<NETWORK, string> = {
    'mainnet': 'https://mainnet-api.multisafe.xyz',
    'testnet': 'https://testnet-api.multisafe.xyz'
}

export const TX_PER_PAGE = 5;

export const NFT_PLACEHOLDER = '/nft-placeholder.png';

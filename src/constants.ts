import {Network} from './store/network';
import {AppConfig} from "@stacks/connect-react";

export const BASE_NETWORKS: Network[] = ['mainnet', 'testnet'];

export const BNS_ADDRESSES: Record<Network, string> = {
    'mainnet': 'SP000000000000000000002Q6VF78',
    'testnet': 'ST000000000000000000002AMW42H',
}


export const appConfig = new AppConfig(['store_write', 'publish_data'], document.location.href);


export const baseAuthOptions = {
    redirectTo: '/',
    manifestPath: '/manifest.json',
    appDetails: {
        name: 'MultiSafe',
        icon: '/logo400.png',
    },
}
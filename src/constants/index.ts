import {AppConfig} from '@stacks/connect-react';
import {NETWORK} from '@trustmachines/multisafe-contracts';

export const appConfig = new AppConfig(['store_write', 'publish_data'], document.location.href);

export const baseAuthOptions = {
    redirectTo: '/',
    manifestPath: '/manifest.json',
    appDetails: {
        name: 'MultiSafe',
        icon: '/logo400.png',
    },
}

export const NULL_ADDRESS: Record<NETWORK, string>  = {
    mainnet: "SP000000000000000000002Q6VF78",
    testnet: "ST000000000000000000002AMW42H"
}
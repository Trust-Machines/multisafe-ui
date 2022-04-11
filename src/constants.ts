import {AppConfig} from '@stacks/connect-react';

export const appConfig = new AppConfig(['store_write', 'publish_data'], document.location.href);

export const baseAuthOptions = {
    redirectTo: '/',
    manifestPath: '/manifest.json',
    appDetails: {
        name: 'MultiSafe',
        icon: '/logo400.png',
    },
}
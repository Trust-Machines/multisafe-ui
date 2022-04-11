import {atom} from 'jotai';

import {NETWORK} from '@trustmachines/multisafe-contracts';

const initial = (): NETWORK => {
    const s = localStorage.getItem('app_network');
    const networks: NETWORK[] = ['mainnet', 'testnet'];
    if (s && networks.includes(s as NETWORK)) {
        return s as NETWORK
    }

    return 'mainnet';
}

export const networkAtom = atom<NETWORK>(initial());
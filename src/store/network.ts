import {atom} from 'jotai';
import {BASE_NETWORKS} from "../constants";

export type Network = 'mainnet' | 'testnet';

const initial = (): Network => {
    const s = localStorage.getItem('app_network');
    if (s && BASE_NETWORKS.includes(s as Network)) {
        return s as Network
    }

    return 'mainnet';
}

export const networkAtom = atom<Network>(initial());
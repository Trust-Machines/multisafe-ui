import {atom} from 'jotai';
import {SafeB} from '../api/backend';

export interface SafesState {
    loading: boolean,
    list: SafeB[],
    init: boolean
}

export const safesAtom = atom<SafesState>({loading: false, list: [], init: false});

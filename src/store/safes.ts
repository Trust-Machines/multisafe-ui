import {atom} from 'jotai';

export interface SafesState {
    loading: boolean,
    list: string[],
    init: boolean
}

export const safesAtom = atom<SafesState>({loading: false, list: [], init: false});
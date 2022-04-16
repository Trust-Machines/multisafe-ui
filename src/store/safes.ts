import {atom} from 'jotai';

export interface SafesState {
    loading: boolean,
    list: string[]
}

export const safesAtom = atom<SafesState>({loading: false, list: []});
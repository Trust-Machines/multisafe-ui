import {atom} from 'jotai';

export interface Safe {
    name: string
}

export interface SafesState {
    loading: boolean,
    safes: Safe[]
}

export const safesAtom = atom<SafesState>({loading: true, safes: []});
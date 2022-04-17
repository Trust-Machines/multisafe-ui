import {atom} from 'jotai';

export interface SafeTransaction {
    id: number,
    executor: string,
    confirmations: string[],
    confirmed: boolean,
    paramP: string,
    paramU: number
}

export interface SafeState {
    loading: boolean,
    address: string,
    version: string,
    owners: string[],
    minConfirmation: number,
    nonce: number,
    stxBalance: string,
    transactions: SafeTransaction[]
}

export const initial = {
    loading: false,
    address: "",
    version: "",
    owners: [],
    minConfirmation: 0,
    nonce: -1,
    stxBalance: "",
    transactions: []
}

export const safeAtom = atom<SafeState>(initial);
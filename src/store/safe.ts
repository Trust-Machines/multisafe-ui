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
    name: string,
    version: string,
    owners: string[],
    minConfirmation: number,
    nonce: number,
    stxBalance: string,
    transactions: SafeTransaction[],
    init: boolean
}

export const initial: SafeState = {
    loading: false,
    address: "",
    name: "",
    version: "",
    owners: [],
    minConfirmation: 0,
    nonce: -1,
    stxBalance: "",
    transactions: [],
    init: false
}

export const safeAtom = atom<SafeState>(initial);
import {atom} from 'jotai';
import BigNumber from 'bignumber.js';

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
    fullAddress: string,
    version: string,
    owners: string[],
    minConfirmation: number,
    nonce: number,
    balance: BigNumber,
    transactions: SafeTransaction[],
    init: boolean
}

export const initial: SafeState = {
    loading: false,
    address: "",
    name: "",
    fullAddress: "",
    version: "",
    owners: [],
    minConfirmation: 0,
    nonce: -1,
    balance: new BigNumber("0"),
    transactions: [],
    init: false
}

export const safeAtom = atom<SafeState>(initial);
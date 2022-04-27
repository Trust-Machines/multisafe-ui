import {atom} from 'jotai';
import BigNumber from 'bignumber.js';
import {FTAsset} from './assets';

export interface SafeTransaction {
    id: number,
    executor: string,
    confirmations: string[],
    confirmed: boolean,
    paramP: string,
    paramU: number
}

export interface SafeFtBalance {
    asset: FTAsset,
    balance: string
}

export interface SafeNFtBalance {
    asset: FTAsset,
    balance: string,
    ids: number[]
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
    ftBalances: SafeFtBalance[]
    nftBalances: SafeNFtBalance[],
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
    ftBalances: [],
    nftBalances: [],
    transactions: [],
    init: false
}

export const safeAtom = atom<SafeState>(initial);
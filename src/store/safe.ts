import {atom} from 'jotai';
import BigNumber from 'bignumber.js';
import {FTAsset, NFTAsset} from '../types';

export interface SafeTransaction {
    id: number,
    executor: string,
    threshold: number,
    confirmations: string[],
    confirmed: boolean,
    paramFt: string,
    paramNft: string,
    paramP: string,
    paramU: number,
    paramB: string,
}

export interface SafeFtBalance {
    asset: FTAsset,
    balance: string
}

export interface SafeNFtBalance {
    asset: NFTAsset,
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
    threshold: number,
    nonce: number,
    balance: BigNumber,
    ftBalances: SafeFtBalance[]
    nftBalances: SafeNFtBalance[],
    transactions: SafeTransaction[],
    totalPages: number,
    page: number,
    init: boolean
}

export const initial: SafeState = {
    loading: false,
    address: "",
    name: "",
    fullAddress: "",
    version: "",
    owners: [],
    threshold: 0,
    nonce: -1,
    balance: new BigNumber("0"),
    ftBalances: [],
    nftBalances: [],
    transactions: [],
    totalPages: 1,
    page: 1,
    init: false
}

export const safeAtom = atom<SafeState>(initial);
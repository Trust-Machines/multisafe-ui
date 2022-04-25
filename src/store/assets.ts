import {atom} from 'jotai';


export interface FTAsset {
    address: string,
    name: string
    symbol: string,
    decimals: number,
    type: "ft"
}

export interface NFTAsset {
    address: string,
    name: string,
    type: "nft"
}

export interface AssetsState {
    loading: boolean,
    list: (FTAsset | NFTAsset)[],
    init: boolean
}

export const assetsAtom = atom<AssetsState>({loading: false, list: [], init: false});
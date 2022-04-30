import {atom} from 'jotai';

import {FTAsset, NFTAsset} from '../types';

export interface FTListItem extends FTAsset {
    type: "ft"
}

export interface NFTListItem extends NFTAsset {
    type: "nft"
}

export type ListItem = FTListItem | NFTListItem;

export interface AssetsState {
    loading: boolean,
    list: ListItem[],
    init: boolean
}

export const assetsAtom = atom<AssetsState>({loading: false, list: [], init: false});
export interface FTAsset {
    address: string,
    name: string,
    symbol: string,
    decimals: number,
    ref: string
}

export interface NFTAsset {
    address: string,
    name: string,
}

export type TransactionType =
    'add-owner'
    | 'remove-owner'
    | 'set-threshold'
    | 'transfer-stx'
    | 'transfer-sip-009'
    | 'transfer-sip-010'
    | null;
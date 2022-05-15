import {atom} from 'jotai';

export interface PendingTxWithId {
    txHash: string,
    fn: 'confirm' | 'revoke',
    txId: number
}

export interface PendingTxSubmit {
    txHash: string,
    fn: 'submit',
    executor: string,
}

export type  PendingTx = PendingTxWithId | PendingTxSubmit;

export type PendingTxsState = PendingTx[];

export const pendingTxsAtom = atom<PendingTxsState>([]);
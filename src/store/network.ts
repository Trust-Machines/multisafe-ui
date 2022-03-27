import {atom} from "jotai";

export type Network = "mainnet" | "testnet";

export const networkAtom = atom<Network>("mainnet");
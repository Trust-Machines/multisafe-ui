import {NETWORK} from '@trustmachines/multisafe-contracts';
import {DATA_BACKENDS} from '../constants';

// TODO: Use backend api for all (possible) data read operations
// TODO: Refactor SafeB to Safe

export type Status = 'mempool' | 'microblock' | 'anchor' | 'failed';

export interface SafeB {
  address: string,
  sender: string,
  tx_hash: string,
  threshold: number,
  version: string,
  nonce: number,
  owners: string[],
  time: number,
  status: Status,
  balance: string
}

export const getSafes = (network: NETWORK, owner: string): Promise<SafeB[]> => {
  return fetch(`${DATA_BACKENDS[network]}/safes/by_owner/${owner}`).then(r => r.json());
}

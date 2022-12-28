import {NETWORK} from '@trustmachines/multisafe-contracts';
import {DATA_BACKENDS} from '../constants';

// TODO: Use backend api for all (possible) data read operations

export type Status = 'mempool' | 'microblock' | 'anchor' | 'failed';

export const getSafes = (network: NETWORK, owner: string): Promise<{
  address: string,
  sender: string,
  tx_hash: string,
  threshold: number,
  version: string,
  nonce: number,
  owners: string[],
  time: number,
  status: Status,
}> => {
  return fetch(`${DATA_BACKENDS[network]}/safes/by_owner/${owner}`).then(r => r.json());
}

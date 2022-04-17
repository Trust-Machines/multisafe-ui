import {useAtom} from 'jotai';

import {safeAtom} from '../store';
import {SafeState} from '../store/safe';

import useNetwork from './use-network';
import useSenderAddress from './use-sender-address';

import * as api from '../api';

const useSafes = (): [SafeState | null, (safe: string) => void] => {
    const [safe, setSafe] = useAtom(safeAtom);
    const [, stacksNetwork] = useNetwork();
    const sender = useSenderAddress();

    const fetchSafeData = (address: string) => {
        const promises: [Promise<number>, Promise<string>, Promise<string[]>, Promise<number>, Promise<api.AddressBalance>] = [
            api.getSafeNonce(stacksNetwork, address, sender),
            api.getSafeVersion(stacksNetwork, address, sender),
            api.getSafeOwners(stacksNetwork, address, sender),
            api.getSafeMinConfirmation(stacksNetwork, address, sender),
            api.getContractBalances(stacksNetwork, address)
        ]

        setSafe({...safe, loading: true});
        Promise.all(promises).then(resp => {
            const [nonce, version, owners, minConfirmation, balances] = resp;
            setSafe({...safe, nonce, version, owners, minConfirmation, stxBalance: balances.stx.balance})
            return api.getSafeTransactions(stacksNetwork, address, nonce, sender)
        }).then(r => {
            console.log(r)
        })
    }

    return [safe, fetchSafeData]
}

export default useSafes;
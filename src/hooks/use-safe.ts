import {useAtom} from 'jotai';

import {safeAtom,} from '../store';
import {SafeState, initial} from '../store/safe';

import useNetwork from './use-network';
import useSenderAddress from './use-sender-address';

import * as api from '../api';

const useSafes = (): [SafeState, (safeAddress: string) => void] => {
    const [safe, setSafe] = useAtom(safeAtom);
    const [, stacksNetwork] = useNetwork();
    const sender = useSenderAddress();

    const fetchSafeData = async (safeAddress: string) => {
        const promises: [Promise<number>, Promise<string>, Promise<string[]>, Promise<number>, Promise<api.AddressBalance>] = [
            api.getSafeNonce(stacksNetwork, safeAddress, sender),
            api.getSafeVersion(stacksNetwork, safeAddress, sender),
            api.getSafeOwners(stacksNetwork, safeAddress, sender),
            api.getSafeMinConfirmation(stacksNetwork, safeAddress, sender),
            api.getContractBalances(stacksNetwork, safeAddress)
        ];

        const [address, name] = safeAddress.split('.');
        setSafe({...safe, loading: true, address, name, fullAddress: safeAddress, init: true});

        const resp = await Promise.all(promises);
        const [nonce, version, owners, minConfirmation, balances] = resp;
        const transactions = await api.getSafeTransactions(stacksNetwork, safeAddress, nonce, sender);

        setSafe({
            loading: false,
            address,
            name,
            fullAddress: safeAddress,
            nonce,
            version,
            owners,
            minConfirmation,
            balance: balances.stx.balance,
            transactions,
            init: true,
        });

    }

    return [safe, fetchSafeData]
}

export default useSafes;
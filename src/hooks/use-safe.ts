import {useAtom} from 'jotai';
import BigNumber from 'bignumber.js';

import {safeAtom,} from '../store';
import {SafeFtBalance, SafeNFtBalance, SafeState} from '../store/safe';

import useNetwork from './use-network';
import useSenderAddress from './use-sender-address';

import * as api from '../api';
import useAssets from './use-assets';

const useSafes = (): [SafeState, (safeAddress: string) => void] => {
    const [safe, setSafe] = useAtom(safeAtom);
    const [, stacksNetwork] = useNetwork();
    const [, , , getFtAssets] = useAssets();
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

        let ftBalances: SafeFtBalance[] = [
            {
                asset: {
                    address: 'STX',
                    name: 'STX',
                    symbol: 'STX',
                    decimals: 6,
                    type: 'ft'
                },
                balance: balances.stx.balance
            }
        ];

        ftBalances.push(...getFtAssets().map(a => ({
            asset: a,
            balance: '0'
        })));

        const nftBalances: SafeNFtBalance[] = getFtAssets().map(a => ({
            asset: a,
            balance: '0',
            ids: []
        }));

        setSafe({
            loading: false,
            address,
            name,
            fullAddress: safeAddress,
            nonce,
            version,
            owners,
            minConfirmation,
            balance: new BigNumber(balances.stx.balance),
            ftBalances,
            nftBalances,
            transactions,
            init: true,
        });

    }

    return [safe, fetchSafeData]
}

export default useSafes;
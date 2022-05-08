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
        let promises: [Promise<api.SafeInfo>, Promise<api.AddressBalance>] = [
            api.getSafeInfo(stacksNetwork, safeAddress, sender),
            api.getContractBalances(stacksNetwork, safeAddress)
        ];

        const [address, name] = safeAddress.split('.');
        setSafe({...safe, loading: true, address, name, fullAddress: safeAddress, init: true});

        const resp = await Promise.all(promises);
        const [safeInfo, balances] = resp;
        const {nonce, version, owners, threshold} = safeInfo;
        const transactions = await api.getSafeTransactions(stacksNetwork, safeAddress, nonce, sender);

        // build fungible token balances
        let ftBalances: SafeFtBalance[] = [
            {
                asset: {
                    address: 'STX',
                    name: 'STX',
                    symbol: 'STX',
                    decimals: 6,
                },
                balance: balances.stx.balance
            }
        ];

        const ftKeys = Object.keys(balances.fungible_tokens);

        await Promise.all(
            ftKeys.map(f => api.getFTInfo(stacksNetwork, f.split(':')[0], sender))
        ).then(resp => {
            return resp.map((r, i): SafeFtBalance => ({
                asset: {
                    address: r.address,
                    name: r.name,
                    symbol: r.symbol,
                    decimals: r.decimals,
                },
                balance: balances.fungible_tokens[ftKeys.find(x => x.startsWith(r.address))!].balance
            }))
        }).then(r => {
            ftBalances = [...ftBalances, ...r];
        })

        ftBalances = [
            ...ftBalances,
            ...getFtAssets()
                .filter(x => ftBalances.find(y => y.asset.address === x.address) === undefined)
                .map(x => ({asset: x, balance: "0"}))
        ]

        // build non-fungible token balances
        let nftBalances: SafeNFtBalance[] = getFtAssets().map(a => ({
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
            threshold,
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
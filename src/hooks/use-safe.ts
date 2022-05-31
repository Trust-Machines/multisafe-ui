import {useAtom} from 'jotai';
import BigNumber from 'bignumber.js';

import {safeAtom,} from '../store';
import {SafeFtBalance, SafeNFtBalance, SafeState} from '../store/safe';

import useNetwork from './use-network';
import useSenderAddress from './use-sender-address';

import * as api from '../api';
import useAssets from './use-assets';

import ftList from '../constants/ft-list';
import nftList from '../constants/nft-list';
import {TX_PER_PAGE} from '../constants';
import {getNfTInfo} from '../api';

const useSafes = (): [SafeState, (safeAddress: string) => void, (nonce: number) => void] => {
    const [safe, setSafe] = useAtom(safeAtom);
    const [network, stacksNetwork] = useNetwork();
    const [, , , getFtAssets, getNFTAssets] = useAssets();
    const sender = useSenderAddress();

    const fetchSafeData = async (safeAddress: string) => {
        const [address, name] = safeAddress.split('.');
        setSafe({...safe, loading: true, address, name, fullAddress: safeAddress, init: true});

        let [safeInfo, balances] = await Promise.all([
            api.getSafeInfo(stacksNetwork, safeAddress, sender),
            api.getContractBalances(stacksNetwork, safeAddress)
        ]);

        const {nonce, version, owners, threshold} = safeInfo;

        const transactions = await api.getSafeTransactions(stacksNetwork, safeAddress, nonce, sender);

        // Build fungible token balances
        // Start with STX
        const stxBalance: SafeFtBalance = {
            asset: {
                address: 'STX',
                name: 'STX',
                symbol: 'STX',
                decimals: 6,
                ref: 'STX'
            },
            balance: balances.stx.balance
        };

        // Collect all fungible token balances from api response
        const ftKeys = Object.keys(balances.fungible_tokens);
        const ftBalancesApi: SafeFtBalance[] = await Promise.all(
            ftKeys.map(f => api.getFTInfo(stacksNetwork, f.split(':')[0]))
        ).then(resp => {
            return resp.map((r, i): SafeFtBalance => ({
                asset: {
                    address: r.address,
                    name: r.name,
                    symbol: r.symbol,
                    decimals: r.decimals,
                    ref: r.ref
                },
                balance: balances.fungible_tokens[ftKeys.find(x => x.startsWith(r.address))!].balance
            }))
        });

        // User defined fungible tokens
        const ftBalancesCustom: SafeFtBalance[] = getFtAssets()
            .filter(x => ftBalancesApi.find(y => y.asset.address === x.address) === undefined)
            .map(x => ({asset: x, balance: '0'}))

        // Merge all fungible tokens. Append default token list in the end.
        const ftBalances: SafeFtBalance[] = [
            stxBalance,
            ...ftBalancesApi,
            ...ftBalancesCustom,
            ...ftList[network]
                .filter(x =>
                    ftBalancesApi.find(y => y.asset.address === x.address) === undefined &&
                    ftBalancesCustom.find(y => y.asset.address === x.address) === undefined
                )
                .map(x => ({asset: x, balance: '0'}))
        ];

        // Collect all non fungible token balances from api response
        const nftKeys = Object.keys(balances.non_fungible_tokens);
        const nftBalancesApi: SafeNFtBalance[] = await Promise.all(
            nftKeys.map(f => api.getNfTInfo(stacksNetwork, f.split(':')[0]))
        ).then(resp => {
            return resp.map((r, i): SafeNFtBalance => ({
                asset: {
                    address: r.address,
                    name: r.name,
                    ref: r.ref
                },
                balance: balances.non_fungible_tokens[ftKeys.find(x => x.startsWith(r.address))!].count,
                ids: []
            }))
        });
        console.log(nftBalancesApi)

        // build non-fungible token balances
        let nftBalancesCustom: SafeNFtBalance[] = getNFTAssets()
            .filter(x => nftBalancesApi.find(y => y.asset.address === x.address) === undefined)
            .map(a => ({
                asset: a,
                balance: '0',
                ids: []
            }));

        const nftBalances: SafeNFtBalance[] = [
            ...nftBalancesCustom,
            ...nftList[network]
                .filter(x =>
                    nftBalancesApi.find(y => y.asset.address === x.address) === undefined &&
                    nftBalancesCustom.find(y => y.asset.address === x.address) === undefined
                )
                .map(x => ({asset: x, balance: '0', ids: []}))
        ];

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
            totalPages: Math.ceil(nonce / TX_PER_PAGE) || 1,
            page: 1,
            init: true,
        });
    }

    const scrollTransactions = async (page: number) => {
        const nonce = (safe.nonce - (TX_PER_PAGE * page)) + TX_PER_PAGE;
        const transactions = await api.getSafeTransactions(stacksNetwork, safe.fullAddress, nonce, sender);
        setSafe({...safe, transactions, page});
    }

    return [safe, fetchSafeData, scrollTransactions]
}

export default useSafes;
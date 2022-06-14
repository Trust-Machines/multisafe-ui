import {useAtom} from 'jotai';

import useAddress from './use-address';
import useNetwork from './use-network';
import useSafe from './use-safe';
import {getAccountMemPool} from '../api';
import {pendingTxsAtom} from '../store';
import {PendingTxsState, PendingTx} from '../store/pending-txs';

const usePendingTxs = (): [PendingTxsState, () => void] => {
    const [pendingTxs, setPendingTxsAtom] = useAtom(pendingTxsAtom);
    const address = useAddress();
    const [, stacksNetwork] = useNetwork();
    const [safe] = useSafe();

    const syncTxs = async () => {
        if (!address) {
            setPendingTxsAtom([]);
            return;
        }

        const txs = await getAccountMemPool(stacksNetwork, address)
            .then(txs => txs.filter(t => t.contract_call?.contract_id === safe.fullAddress))
            .then(txs => {
                return txs.map((t): PendingTx | null => {
                    const {tx_id: chainTxId} = t;
                    const {function_name: fn, function_args: args} = t.contract_call!;

                    switch (fn) {
                        case 'confirm':
                        case 'revoke':
                            const safeTxId = Number(args.find((x: any) => x.name === 'tx-id')!.repr.replace('u', ''));
                            return {
                                txHash: chainTxId,
                                fn,
                                txId: safeTxId,

                            }
                        case 'submit':
                            const executor = args.find((x: any) => x.name === 'executor')!.repr;
                            return {
                                txHash: chainTxId,
                                fn,
                                executor
                            }
                        default:
                            return null;
                    }
                }).filter((i): i is any => {
                    return i !== null;
                });
            });

        setPendingTxsAtom(txs);
    }

    return [pendingTxs, syncTxs]
}

export default usePendingTxs;

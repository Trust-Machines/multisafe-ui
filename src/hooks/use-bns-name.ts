import {useEffect} from 'react';
import {useAtom} from 'jotai';

import useAddress from './use-address';
import useNetwork from './use-network';
import {getBnsName} from '../api';

import {bnsNameAtom} from '../store';

const useBnsName = (): string | null => {
    const [bns, setBns] = useAtom(bnsNameAtom);
    const address = useAddress();
    const [network, stacksNetwork] = useNetwork()

    useEffect(() => {
        if (!address) {
            setBns(null);
            return;
        }

        getBnsName(stacksNetwork, address).then((r) => {
            if (r) {
                setBns(r);
            } else {
                setBns(null);
            }
        }).catch(()=>{
            setBns(null);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, network, stacksNetwork]);

    return bns;
}

export default useBnsName;
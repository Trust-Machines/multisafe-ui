import {useAtom} from 'jotai';

import useAddress from './use-address';
import useNetwork from './use-network';
import {safesAtom} from '../store';
import {SafesState} from '../store/safes';
import {getSafes} from '../api/backend';

const useSafes = (): [SafesState, () => void] => {
    const address = useAddress();
    const [safes, setSafes] = useAtom(safesAtom);
    const [network] = useNetwork();

    const fetchSafes = () => {
        setSafes({...safes, loading: !!address, list: []});
        if (address) {
            getSafes(network, address).then(safes => {
                setSafes({loading: false, list: safes, init: true});
            });
        } else {
            setSafes({...safes, list:[], init: true});
        }
    }

    return [safes, fetchSafes];
}

export default useSafes;

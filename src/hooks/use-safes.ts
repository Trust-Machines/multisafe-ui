import {useAtom} from 'jotai';

import useAddress from './use-address';
import useStorage from './use-storage';
import useNetwork from './use-network';
import {safesAtom} from '../store';
import {SafesState} from '../store/safes';

const useSafes = (): [SafesState, () => void, (safe: string) => Promise<any>] => {
    const address = useAddress();
    const [safes, setSafes] = useAtom(safesAtom);
    const [getFile, putFile] = useStorage();
    const [network] = useNetwork();

    const fetchSafes = () => {
        setSafes({...safes, loading: !!address, list: []});
        if (address) {
            getSafeList().then(safes => {
                setSafes({loading: false, list: safes, init: true});
            });
        } else {
            setSafes({...safes, list:[], init: true});
        }
    }

    const getSafeList = async (): Promise<string[]> => {
        return getFile(`safes_${network}_1`).then(r => {
            return r.split('\n').filter(x => x.trim());
        });
    }

    const upsertSafe = async (safe: string): Promise<any> => {
        return getSafeList().then((r) => {
            const newSafes = [safe, ...r.filter(x => x !== safe)];
            return putFile(`safes_${network}_1`, newSafes.join('\n')).then(() => {
                setSafes({...safes, list: newSafes});
            })
        })
    }

    return [safes, fetchSafes, upsertSafe];
}

export default useSafes;

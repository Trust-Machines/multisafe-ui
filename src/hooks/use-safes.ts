import {useAtom} from 'jotai';

import {safesAtom} from '../store';
import {SafesState} from '../store/safes';

import useAddress from './use-address';
import useUserSession from './use-user-session';
import useStorage from './use-storage';
import useNetwork from './use-network';


const useSafes = (): [SafesState, () => void, (safe: string) => Promise<any>] => {
    const address = useAddress();
    const [userSession] = useUserSession();
    const [safes, setSafes] = useAtom(safesAtom);
    const [getFile, putFile] = useStorage(userSession);
    const [network] = useNetwork();

    const fetchSafes = () => {
        setSafes({loading: !!address, list: []});
        if (address) {
            getSafeList().then(safes => {
                setSafes({loading: false, list: safes});
            });
        }
    }

    const getSafeList = async (): Promise<string[]> => {
        return getFile(`safes_${network}`).then(r => {
            return r.split("\n").filter(x => x.trim());
        });
    }

    const upsertSafe = async (safe: string): Promise<any> => {
        return getSafeList().then((r) => {
            const newSafes = [safe, ...r.filter(x => x !== safe)];
            return putFile(`safes_${network}`, newSafes.join("\n")).then(() => {
                setSafes({...safes, list: newSafes});
            })
        })
    }

    return [safes, fetchSafes, upsertSafe];
}

export default useSafes;
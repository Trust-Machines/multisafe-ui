import {useEffect} from 'react';
import {useAtom} from 'jotai';

import {safesAtom} from '../store';
import useAddress from './use-address';
import useUserSession from './use-user-session';
import useStorage from './use-storage';
import useNetwork from './use-network';

import {SafesState} from '../store/safes';

const useSafes = (): [SafesState, (safe: string) => Promise<any>] => {
    const address = useAddress();
    const [userSession] = useUserSession();
    const [safes, setSafes] = useAtom(safesAtom);
    const [getFile, putFile] = useStorage(userSession);
    const [network] = useNetwork();

    useEffect(() => {
        setSafes({loading: !!address, list: []});
        if (address) {
            getSafeList().then(safes => {
                setSafes({loading: false, list: safes});
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, network]);

    const getSafeList = async (): Promise<string[]> => {
        return getFile(`safes_${network}`).then(r => {
            return r.split("\n").filter(x => x.trim());
        });
    }

    const addNewSafe = async (safe: string): Promise<any> => {
        return getSafeList().then((r) => {
            if (r.includes(safe)) {
                throw Error('The safe is already in the list!');
            }
            const newSafes = [...r, safe];
            return putFile(`safes_${network}`, newSafes.join("\n")).then(() => {
                setSafes({...safes, list: newSafes});
            })
        })
    }

    return [safes, addNewSafe];
}

export default useSafes;
import {useEffect} from 'react';
import {useAtom} from 'jotai';

import {safesAtom} from '../store';
import useAddress from './use-address';
import useUserSession from './use-user-session';
import useStorage from './use-storage';

import {SafesState} from '../store/safes';

const useSafes = (): [SafesState, () => Promise<string[]>, (safeList: string) => Promise<any>] => {
    const address = useAddress();
    const [userSession] = useUserSession();
    const [safes, setSafes] = useAtom(safesAtom);
    const [getFile, putFile] = useStorage(userSession);

    useEffect(() => {
        setSafes({loading: !!address, safes: []});
        if (address) {
            getSafeList().then(r => {
                setSafes({loading: false, safes: r.map((x) => ({name: x}))});
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    const getSafeList = async (): Promise<string[]> => {
        return getFile('safes').then(r => {
            return r.split("\n");
        });
    }

    const addNewSafe = async (safe: string): Promise<any> => {
        return getSafeList().then((r) => {
            if (r.includes(safe)) {
                throw Error('The safe is already in the list!');
            }
            return putFile('safes', [...r, safe].join("\n"));
        })
    }

    return [safes, getSafeList, addNewSafe];
}

export default useSafes;
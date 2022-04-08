import {useEffect, useMemo} from 'react';
import {useAtom} from 'jotai';
import {Storage} from '@stacks/storage';

import {safesAtom} from '../store';
import useAddress from './use-address';
import useUserSession from './use-user-session';
import useStorage from './use-storage';

import {SafesState} from '../store/safes';

const useSafes = (): [SafesState, () => Promise<string[]>, (safeList: string) => Promise<any>, () => Promise<boolean>] => {
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
    }, [address])

    /*
    //const storage = new Storage({ userSession });


    const fetchSafes = async (): Promise<boolean> => {
        if (!storage) {
            return false;
        }


        storage.getFile('safes.txt').then(r => {
            //  console.log(r)
        }).catch((e: Error) => {
            console.log(e.name === 'DoesNotExist')
        })


        return true
    } */

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

    const deleteSafe = async (): Promise<boolean> => {
        return true
    }

    return [safes, getSafeList, addNewSafe, deleteSafe];
}

export default useSafes;
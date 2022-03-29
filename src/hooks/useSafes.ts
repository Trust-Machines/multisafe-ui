import {useEffect, useMemo} from 'react';
import {useAtom} from 'jotai';
import {Storage} from '@stacks/storage';

import {safesAtom} from '../store';
import useAddress from './useAddress';
import useUserSession from './useUserSession';
import {SafesState} from '../store/safes';

const useSafes = (): [SafesState, () => Promise<boolean>, () => Promise<boolean>, () => Promise<boolean>] => {
    const address = useAddress();
    const [userSession] = useUserSession();
    const [safes, setSafes] = useAtom(safesAtom);
    const storage = useMemo(() => {
        return userSession ? new Storage({userSession}) : null
    }, [userSession]);
    //const storage = new Storage({ userSession });
    useEffect(() => {
        setSafes({loading: false, safes: []});
        if (address) {
            fetchSafes().then();
        }
    }, [address, setSafes])

    const fetchSafes = async (): Promise<boolean> => {
        if (!storage) {
            return false;
        }

        

        storage.getFile('safes.txt').then(r => {
            console.log(r)
        }).catch((e: Error) => {
            console.log(e.name === 'DoesNotExist')
        })

        /*


         */
        return true
    }

    const addSafe = async (): Promise<boolean> => {
        return true
    }

    const deleteSafe = async (): Promise<boolean> => {
        return true
    }


    return [safes, fetchSafes, addSafe, deleteSafe];
}

export default useSafes;
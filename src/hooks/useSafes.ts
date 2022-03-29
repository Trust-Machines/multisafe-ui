import {useEffect} from "react";
import {useAtom} from 'jotai';
import {safesAtom} from "../store";
import useAddress from './useAddress';

import {SafesState} from "../store/safes";

const useSafes = (): [SafesState, () => Promise<boolean>, () => Promise<boolean>, () => Promise<boolean>] => {
    const address = useAddress();
    const [safes, setSafes] = useAtom(safesAtom);

    useEffect(() => {
        setSafes({loading: false, safes: []});
        if (address) {
            fetchSafes().then();
        }
    }, [address, setSafes])

    const fetchSafes = async (): Promise<boolean> => {
        console.log("here")
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
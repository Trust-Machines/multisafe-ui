import React, {useEffect} from 'react';
import {RouteComponentProps, useParams} from '@reach/router';

import useSafes from '../../hooks/use-safes';
import useSafe from '../../hooks/use-safe';

import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import AppMenu from '../../layout/app-menu';


const Safe = (_: RouteComponentProps) => {
    const params = useParams();
    const [safes] = useSafes();
    const [safe, fetchSafeData] = useSafe();
    // console.log(safes.list.includes(params.safeId))

    useEffect(() => {
        fetchSafeData(params.safeId)
    }, [])

    console.log(safe)

    if (!safe.init) {
        return null;
    }


    return <>
        <Navbar/>
        <AppContent sx={{p: 0, flexDirection: 'row'}}>
            <AppMenu>
                Menu
            </AppMenu>
        </AppContent>
    </>
}

export default Safe;
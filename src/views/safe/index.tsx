import React, {useEffect} from 'react';
import {RouteComponentProps, useParams} from '@reach/router';

import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import useSafes from '../../hooks/use-safes';
import useSafe from '../../hooks/use-safe';


const Safe = (_: RouteComponentProps) => {
    const params = useParams();
    const [safes] = useSafes();
    const [safe, fetchSafeData] = useSafe();
    // console.log(safes.list.includes(params.safeId))

    useEffect(() => {
        fetchSafeData(params.safeId)
    }, [])

    console.log(safe)

    return <>
        <Navbar/>
        <AppContent>

        </AppContent>
    </>
}

export default Safe;
import React from 'react';
import {RouteComponentProps, useParams} from '@reach/router';

import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import useSafes from '../../hooks/use-safes';


const Safe = (_: RouteComponentProps) => {
    const params = useParams();
    const [safes] = useSafes();
    // console.log(safes.list.includes(params.safeId))


    return <>
        <Navbar/>
        <AppContent>

        </AppContent>
    </>
}

export default Safe;
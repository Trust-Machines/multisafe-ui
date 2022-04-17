import React from 'react';
import {RouteComponentProps, useParams} from '@reach/router';

import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';


const Safe = (_: RouteComponentProps) => {
    const params = useParams();

    return <>
        <Navbar/>
        <AppContent>

        </AppContent>
    </>
}

export default Safe;
import React from 'react';
import {RouteComponentProps} from '@reach/router';

import AppContent from '../../layout/AppContent';
import AppMenu from '../../layout/AppMenu';

import useAuth from '../../hooks/useAuth';


const Create = (_: RouteComponentProps) => {
    const [userData, openAuth, signOut] = useAuth();

    return <>
        <AppMenu/>
        <AppContent>
           Create
        </AppContent>
    </>
}

export default Create;
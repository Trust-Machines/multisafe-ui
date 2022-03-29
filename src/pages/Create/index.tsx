import React from 'react';
import {RouteComponentProps} from '@reach/router';

import AppContent from '../../layout/AppContent';
import AppMenu from '../../layout/AppMenu';

import useUserSession from '../../hooks/useUserSession';


const Create = (_: RouteComponentProps) => {
    const [, userData, openAuth, signOut] = useUserSession();

    return <>
        <AppMenu/>
        <AppContent>
           Create
        </AppContent>
    </>
}

export default Create;
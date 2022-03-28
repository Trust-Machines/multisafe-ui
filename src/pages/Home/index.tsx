import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Typography} from '@mui/material';

import useAuth from '../../hooks/useAuth';

import AppContent from '../../layout/AppContent';
import AppMenu from '../../layout/AppMenu';

const Home = (_: RouteComponentProps) => {
    const [userData, openAuth, signOut] = useAuth();

    return <>
        <AppMenu/>
        <AppContent>
            <Typography variant='h4' gutterBottom>Welcome to MultiSafe</Typography>
            <Typography variant='h6' mb='40px'>MultiSafe is the most secure platform for storing your STX digital
                assets.</Typography>
        </AppContent>
    </>
}

export default Home;
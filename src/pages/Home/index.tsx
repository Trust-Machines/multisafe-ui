import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Box, Typography, Button} from '@mui/material';
import {grey} from '@mui/material/colors';
import useAuth from '../../hooks/useAuth';

import AppContent from '../../layout/AppContent';
import AppMenu from '../../layout/AppMenu';

import useMainBreakPoint from "../../hooks/useMainBreakPoint";


const LandingBox = (props: { title: string, subtitle: string, btnLabel: string }) => {
    const [isMd] = useMainBreakPoint();

    const [, openAuth, ] = useAuth();

    const boxStyles = {
        bgcolor: grey[300],
        padding: '20px',
        flexShrink: 0,
        width: isMd ? '260px' : 'auto',
        marginBottom: isMd ? '0' : '20px'
    }
    return <Box sx={boxStyles}>
        <Typography variant='h6' gutterBottom>{props.title}</Typography>
        <Typography mb='40px'>{props.subtitle}{' '}</Typography>
        <Button variant='contained' onClick={openAuth}>{props.btnLabel}</Button>
    </Box>;
}

const Landing = () => {
    const [isMd] = useMainBreakPoint();
    const boxStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: isMd ? '640px' : 'auto',
        flexDirection: isMd ? 'row' : 'column',
        marginTop: isMd ? '100px' : '40px'
    }
    return <>
        <Typography variant='h4' mt='40px' gutterBottom>Welcome to MultiSafe</Typography>
        <Typography variant='h6'>MultiSafe is the most secure platform for storing your STX digital assets.</Typography>
        <Box sx={boxStyles}>
            <LandingBox title='Create Safe' subtitle='Create a safe with multiple owners' btnLabel='Create Safe'/>
            <LandingBox title='Load Existing Safe' subtitle='Import a safe to your storage'
                        btnLabel='Load Existing Safe'/>
        </Box>
    </>
}

const Home = (_: RouteComponentProps) => {
    const [userData, openAuth, signOut] = useAuth();

    return <>
        <AppMenu/>
        <AppContent>
            {!userData && <Landing/> }
        </AppContent>
    </>
}

export default Home;
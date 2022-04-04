import React from 'react';
import {RouteComponentProps, Link} from '@reach/router';
import {Box, Typography, Button, TextField, Autocomplete, useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';

import AppContent from '../../layout/AppContent';
import AppMenu from '../../layout/AppMenu';

import useUserSession from '../../hooks/useUserSession';
import useMediaBreakPoint from '../../hooks/useMediaBreakPoint';
import useTranslation from '../../hooks/useTranslation';
import useAppTheme from '../../hooks/useAppTheme';
import useSafes from '../../hooks/useSafes';

const LandingBox = (props: { title: string, subtitle: string, btnLabel: string }) => {
    const [,isMd] = useMediaBreakPoint();
    const [appTheme] = useAppTheme();
    const theme = useTheme()

    const [, , openAuth,] = useUserSession();

    const boxStyles = {
        bgcolor: appTheme === 'light' ? '#fff' : grey[800],
        padding: '20px',
        flexShrink: 0,
        width: isMd ? '260px' : 'auto',
        marginBottom: isMd ? '0' : '20px',
        borderRadius: '6px',

        boxShadow: `${theme.palette.divider} 1px 2px 10px 0px`
    }
    return <Box sx={boxStyles}>
        <Typography variant='h6' gutterBottom>{props.title}</Typography>
        <Typography mb='40px'>{props.subtitle}{' '}</Typography>
        <Button variant='contained' onClick={openAuth}>{props.btnLabel}</Button>
    </Box>;
}

const Landing = () => {
    const [t] = useTranslation();
    const [,isMd] = useMediaBreakPoint();
    const boxStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: isMd ? '640px' : 'auto',
        flexDirection: isMd ? 'row' : 'column',
        marginTop: '40px',
    }
    return <>
        <Typography variant='h4' fontWeight="700" mt='10px' gutterBottom>{t('Welcome to MultiSafe')}</Typography>
        <Typography variant='h6'
                    fontWeight="500">{t('MultiSafe is the most secure platform for storing your STX digital assets.')}</Typography>
        <Box sx={{marginTop: '40px'}}>
            <Typography variant='h6' fontWeight="400" gutterBottom>Load Existing Safe</Typography>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={[{label: 'The Shawshank Redemption', year: 1994}]}
                sx={{width: 640}}
                renderInput={(params) => <TextField {...params} label="Movie"/>}
            />
            <Button>Load</Button>
        </Box>
        <Box sx={boxStyles}>

            <LandingBox title={t("Don't have a safe?")} subtitle={t('Create a safe with multiple owners')}
                        btnLabel={t('Create Safe')}/>

        </Box>
    </>
}

const SafeList = () => {
    const [safes] = useSafes();

    return <span>List</span>
}

const Home = (_: RouteComponentProps) => {
    const [, userData, openAuth, signOut] = useUserSession();

    return <>
        <AppContent>
            <Landing/>
        </AppContent>
    </>
}

export default Home;
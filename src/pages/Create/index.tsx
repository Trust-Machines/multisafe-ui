import React from 'react';
import {RouteComponentProps} from '@reach/router';

import AppContent from '../../layout/AppContent';
import AppMenu from '../../layout/AppMenu';

import useUserSession from '../../hooks/useUserSession';
import Typography from '@mui/material/Typography';
import useTranslation from '../../hooks/useTranslation';


const Create = (_: RouteComponentProps) => {
    const [, userData, openAuth, signOut] = useUserSession();
    const [t] = useTranslation();
    return <>
        <AppContent>
            <Typography variant='h4' fontWeight='700' mt='10px' gutterBottom>{t('Create Safe')}</Typography>
            <Typography variant='h6' fontWeight='500'>{t('Create a safe with multiple owners.')}</Typography>
        </AppContent>
    </>
}

export default Create;
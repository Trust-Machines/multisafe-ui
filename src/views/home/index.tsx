import React from 'react';
import {RouteComponentProps, useNavigate} from '@reach/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import useMediaBreakPoint from '../../hooks/useMediaBreakPoint';
import useTranslation from '../../hooks/useTranslation';
import ThemedBox from '../../components/themed-box';

import AppContent from '../../layout/app-content';


const Home = (_: RouteComponentProps) => {
    const [isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const navigate = useNavigate();

    return <>
        <AppContent>
            <Typography variant='h4' fontWeight='700' mt='10px' gutterBottom>{t('Welcome to MultiSafe')}</Typography>
            <Typography variant='h6'
                        fontWeight='500'>{t('MultiSafe is the most secure platform for storing your STX digital assets.')}</Typography>
            <Box sx={{marginTop: '40px'}}>
                <Typography variant='h6' fontWeight='400' gutterBottom>{t('Load Existing Safe')}</Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <TextField sx={{
                        width: isMd ? '640px' : '100%',
                        marginRight: '6px'
                    }} label={t('Safe Address')} placeholder={t('Enter safe address or select and press enter')}/>
                </Box>
            </Box>
            <Box sx={{marginTop: '40px'}}>
                <ThemedBox sx={{padding: '20px', width: isMd ? '260px' : 'auto',}}>
                    <Typography variant='h6' gutterBottom>{t('Don\'t have a safe?')}</Typography>
                    <Typography mb='40px'>{t('Create a safe with multiple owners')}{' '}</Typography>
                    <Button variant='contained' onClick={()=>{
                        navigate('/create').then();
                    }}>{t('Create')}</Button>
                </ThemedBox>
            </Box>
        </AppContent>
    </>
}

export default Home;
import React from 'react';
import {RouteComponentProps} from '@reach/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Load from './components/load';
import Create from './components/create';
import Recent from './components/recent';
import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import useTranslation from '../../hooks/use-translation';

const Home = (_: RouteComponentProps) => {
    const [isSm, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();

    return <>
        <Navbar/>
        <AppContent>
            <Box sx={{width: isMd ? '700px' : '100%'}}>
                <Typography variant='h4' fontWeight='700' mt='10px'
                            gutterBottom>{t('Welcome to MultiSafe')}</Typography>
                <Typography variant='h6'
                            fontWeight='500'>{t('MultiSafe is the most secure platform for storing your STX digital assets.')}</Typography>
                <Box sx={{marginTop: '40px'}}>
                    <Load/>
                </Box>
                <Box sx={{
                    marginTop: '30px',
                    display: 'flex',
                    flexDirection: isSm ? 'row' : 'column',
                    justifyContent: 'space-between'
                }}>
                    <Create/>
                    <Recent/>
                </Box>
            </Box>
        </AppContent>
    </>
}

export default Home;

import React from 'react';
import {RouteComponentProps} from '@reach/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Load from './components/load';
import Create from './components/create';
import SafeList from './components/safe-list';
import ThemedBox from '../../components/themed-box';
import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import useTranslation from '../../hooks/use-translation';
import useAddress from '../../hooks/use-address';
import useSafes from '../../hooks/use-safes';


const Home = (_: RouteComponentProps) => {
    const [, isMd] = useMediaBreakPoint();
    const address = useAddress();
    const [t] = useTranslation();
    const [safes,] = useSafes();

    return <>
        <Navbar/>
        <AppContent>
            <Box sx={{width: isMd ? '800px' : '100%'}}>
                <Typography variant='h4' fontWeight='700' mt='10px'
                            gutterBottom>{t('Welcome to MultiSafe')}</Typography>
                <Typography variant='h6'
                            fontWeight='500'>{t('MultiSafe is the most secure platform for storing your STX digital assets.')}</Typography>
                <Box sx={{
                    marginTop: '40px',
                    display: 'flex',
                    flexDirection: isMd ? 'row' : 'column',
                    justifyContent: 'space-between'
                }}>
                    {(() => {
                        if (address && safes.list.length > 0) {
                            return <>
                                <ThemedBox sx={{
                                    padding: '20px',
                                    width: isMd ? '80%' : null
                                }}>
                                    <SafeList/>
                                </ThemedBox>
                            </>
                        }

                        return <>
                            <ThemedBox sx={{
                                padding: '20px',
                                width: isMd ? '380px' : null,
                                mb: isMd ? null : '20px',
                                mr: isMd ? '20px' : null
                            }}>
                                <Create/>
                            </ThemedBox>
                            <ThemedBox sx={{
                                padding: '20px',
                                width: isMd ? '380px' : null
                            }}>
                                <Load/>
                            </ThemedBox>
                        </>
                    })()}
                </Box>
            </Box>
        </AppContent>
    </>
}

export default Home;

import React, {useEffect} from 'react';
import {RouteComponentProps, useParams} from '@reach/router';
import {useNavigate} from '@reach/router';

import useSafes from '../../hooks/use-safes';
import useSafe from '../../hooks/use-safe';

import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import SafeMenu from './components/safe-menu';
import {Box} from '@mui/material';

const Safe = (_: RouteComponentProps) => {
    const params = useParams();
    const [safes] = useSafes();
    const [safe, fetchSafeData] = useSafe();
    const navigate = useNavigate();
    // console.log()

    useEffect(() => {
        if (safes.list.includes(params.safeId)) {
            fetchSafeData(params.safeId)
        } else {
            navigate('/').then();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!safe.init) {
        return null;
    }

    return <>
        <Navbar/>
        <AppContent sx={{p: 0, flexDirection: 'row'}}>
            <SafeMenu section=""/>

            <Box sx={{p: '20px', zIndex:1}}>ewfwefew</Box>
        </AppContent>
    </>
}

export default Safe;
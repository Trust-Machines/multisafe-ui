import React, {useEffect} from 'react';
import {RouteComponentProps, useParams} from '@reach/router';
import {Box} from '@mui/material';

import useSafes from '../../hooks/use-safes';
import useSafe from '../../hooks/use-safe';

import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import AppMenu from '../../layout/app-menu';
import WalletIcon from '../../components/wallet-icon';

const {createIcon} = require('@download/blockies');
const Safe = (_: RouteComponentProps) => {
    const params = useParams();
    const [safes] = useSafes();
    const [safe, fetchSafeData] = useSafe();
    // console.log(safes.list.includes(params.safeId))

    useEffect(() => {
        fetchSafeData(params.safeId)
    }, [])

    console.log(safe)

    if (!safe.init) {
        return null;
    }


    return <>
        <Navbar/>
        <AppContent sx={{p: 0, flexDirection: 'row'}}>
            <AppMenu>
                <Box sx={{
                    background: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '3px',
                    fontSize: '90%'
                }}>
                    {safe.name}
                </Box>

                <WalletIcon address={params.safeId}/>

            </AppMenu>
        </AppContent>
    </>
}

export default Safe;
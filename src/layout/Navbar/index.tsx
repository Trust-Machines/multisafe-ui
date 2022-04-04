import React from 'react';

import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import useAppTheme from '../../hooks/useAppTheme';

import Brand from './components/Brand';
import Wallet from './components/Wallet';
import NetworkSwitch from './components/NetworkSwitch';


const Navbar = () => {
    const theme = useTheme()
    const [appTheme] = useAppTheme();

    return (
        <Box sx={{
            height: '54px',
            display: 'flex',
            padding: '0 18px',
            position: 'relative',
            zIndex: 2,
            boxShadow: `${theme.palette.divider} 0 2px 4px 0`,
            background: appTheme === 'light' ? '#fff' : grey[900],
            userSelect: 'none'
        }}>
            <Brand/>
            <div className="flex-grow"/>
            <Wallet/>
            <NetworkSwitch/>
        </Box>
    );
}

export default Navbar;
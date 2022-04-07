import React from 'react';

import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import Brand from './Components/Brand';
import Wallet from './Components/Wallet';
import NetworkSwitch from './Components/NetworkSwitch';


const Navbar = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            height: '54px',
            display: 'flex',
            padding: '0 18px',
            position: 'relative',
            zIndex: 2,
            boxShadow: `${theme.palette.divider} 0 2px 4px 0`,
            background: theme.palette.mode === 'light' ? '#fff' : grey[900],
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
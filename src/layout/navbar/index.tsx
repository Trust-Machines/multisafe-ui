import React from 'react';

import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import useMediaBreakPoint from '../../hooks/use-media-break-point';

import Brand from './components/Brand';
import Wallet from './components/Wallet';
import NetworkSwitch from './components/NetworkSwitch';


const Navbar = () => {
    const theme = useTheme();
    const [isSm] = useMediaBreakPoint();

    return (
        <Box sx={{
            height: isSm ? '54px' : null,
            display: 'flex',
            flexDirection: isSm ? 'row' : 'column',
            flexShrink: 0,
            flexGrow: 0,
            padding: '0 18px',
            position: 'relative',
            zIndex: 2,
            boxShadow: `${theme.palette.divider} 0 2px 4px 0`,
            background: theme.palette.mode === 'light' ? '#fff' : grey[900],
            userSelect: 'none'
        }}>
            <Brand/>
            <div className="flex-grow"/>
            <Box sx={{
                display: 'flex',
                justifyContent: isSm ? null : 'center',
                height:isSm ? null: '40px'
            }}>
                <Wallet/>
                <NetworkSwitch/>
            </Box>
        </Box>
    );
}

export default Navbar;
import React from 'react';
import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import useMediaBreakPoint from '../../../hooks/use-media-break-point';


const Brand = () => {
    const theme = useTheme();
    const [isSm] = useMediaBreakPoint();

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            flexGrow: 0,
            cursor: 'pointer'
        }} onClick={()=>{
            window.location.href = '/';
        }}>
            <Box sx={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginRight: '8px',
                'img': {
                    width: '100%',
                    height: '100%'
                }
            }}>
                <img src="/logo.jpg" alt='Logo'/>
            </Box>
            <Box sx={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: theme.palette.mode === 'light' ? grey[900] : grey[50],
                display: isSm ? 'block' : 'none'
            }}>MultiSafe</Box>
        </Box>
    );
}

export default Brand;
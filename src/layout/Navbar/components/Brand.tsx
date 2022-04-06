import React from 'react';
import {useNavigate} from '@reach/router';
import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import useMediaBreakPoint from '../../../hooks/useMediaBreakPoint';



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
                marginRight: '8px'
            }}>
                <img src="/logo.jpg" alt="Logo" style={{
                    width: '100%',
                    height: '100%'
                }}/>
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
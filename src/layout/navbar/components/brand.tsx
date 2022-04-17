import React from 'react';
import {useNavigate} from '@reach/router';
import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import useMediaBreakPoint from '../../../hooks/use-media-break-point';


const Brand = () => {
    const theme = useTheme();
    const [isSm] = useMediaBreakPoint();
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            flexGrow: isSm ? 0 : 1,
            cursor: 'pointer',
            justifyContent: isSm ? null : 'center',
            mb: isSm ? null : '10px',
            height: isSm ? null : '52px'
        }} onClick={()=>{
            navigate('/').then();
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
            }}>MultiSafe</Box>
        </Box>
    );
}

export default Brand;
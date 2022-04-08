import React from 'react';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

const AppContent = (props: { children: React.ReactNode }) => {
    const theme = useTheme();

    const boxStyles = {
        bgcolor: theme.palette.mode === 'light' ? grey[50] : grey[900],
        color: theme.palette.mode === 'light' ? grey[900] : grey[300],
        height: 'calc(100% - 40px)',
        flexGrow: 1,
        padding: '20px',
        overflow: 'auto'
    }

    return <Box sx={boxStyles}>{props.children}</Box>
}

export default AppContent;
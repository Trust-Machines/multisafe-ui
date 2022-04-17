import React from 'react';
import {Box, useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';

const AppWrapper = (props: { children: React.ReactNode }) => {
    const theme = useTheme();

    const boxStyles = {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.mode === 'light' ? grey[900] : grey[300],
    }

    return <Box sx={boxStyles}>{props.children}</Box>
}

export default AppWrapper;
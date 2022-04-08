import React from 'react';
import {Box} from '@mui/material';

const AppWrapper = (props: { children: React.ReactNode }) => {
    const boxStyles = {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }

    return <Box sx={boxStyles}>{props.children}</Box>
}

export default AppWrapper;
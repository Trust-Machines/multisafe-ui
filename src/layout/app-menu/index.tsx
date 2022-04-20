import React from 'react';
import {Box, useTheme} from '@mui/material';

const AppMenu = (props: { children?: React.ReactNode }) => {

    const theme = useTheme();

    return <Box sx={{
        width: '200px',
        flexGrow: 0,
        flexShrink: 0,
        boxShadow: `${theme.palette.divider} 1px 2px 10px 0px`,
        zIndex: 1
    }}>{props.children}</Box>
}

export default AppMenu;
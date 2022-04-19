import React from 'react';
import {Box, useTheme} from '@mui/material';
import useMediaBreakPoint from '../../hooks/use-media-break-point';

const AppMenu = (props: { children?: React.ReactNode }) => {
    const [,isMd] = useMediaBreakPoint();
    const theme = useTheme();

    return <Box sx={{
        width: isMd ? '200px' : '100%',
        flexGrow: 0,
        flexShrink: 0,
        boxShadow: `${theme.palette.divider} 1px 2px 10px 0px`,
        zIndex: 1
    }}>{props.children}</Box>
}

export default AppMenu;
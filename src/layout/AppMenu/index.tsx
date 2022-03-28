import React from 'react';
import {Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const AppMenu = (props: { children?: React.ReactNode }) => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));

    const boxStyles = {
        width: isMd ? '200px' : '100%',
        flexGrow: 0,
        flexShrink: 0
    }

    return <Box sx={boxStyles}>{props.children}</Box>
}

export default AppMenu;
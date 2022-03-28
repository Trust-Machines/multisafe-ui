import React from 'react';
import {Box} from '@mui/material';
import useMainBreakPoint from "../../hooks/useMainBreakPoint";

const AppMenu = (props: { children?: React.ReactNode }) => {

    const [isMd] = useMainBreakPoint();

    const boxStyles = {
        width: isMd ? '200px' : '100%',
        flexGrow: 0,
        flexShrink: 0
    }

    return <Box sx={boxStyles}>{props.children}</Box>
}

export default AppMenu;
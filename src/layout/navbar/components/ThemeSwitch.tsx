import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import useAppTheme from '../../../hooks/use-app-theme';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';


const ThemeSwitch = () => {
    const [appTheme, toggleAppTheme] = useAppTheme();
    const [isSm] = useMediaBreakPoint();

    return (<Box sx={{
            flexShrink: 0,
            display: isSm ? 'flex' : 'none',
            alignItems: 'center',
            marginLeft: '10px',
        }}>
            <IconButton onClick={toggleAppTheme}>
                {appTheme === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
            </IconButton>
        </Box>);
}

export default ThemeSwitch;
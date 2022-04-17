import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useTheme} from '@mui/material';

import useAppTheme from '../../../hooks/use-app-theme';

const ThemeSwitch = () => {
    const [appTheme, toggleAppTheme] = useAppTheme();
    const theme = useTheme();

    return (<Box sx={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        borderRight: `2px solid ${theme.palette.divider}`,
    }}>
        <IconButton onClick={toggleAppTheme}>
            {appTheme === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
        </IconButton>
    </Box>);
}

export default ThemeSwitch;
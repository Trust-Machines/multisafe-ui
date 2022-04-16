import React from 'react';
import {ThemeProvider as MThemeProvider, createTheme, ThemeOptions} from '@mui/material';

import useAppTheme from '../hooks/use-app-theme';

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light'
    }
}

const themes = {
    'light': createTheme({
        ...themeOptions
    }),
    'dark': createTheme({
        ...themeOptions,
        palette: {
            mode: 'dark',
        }
    })
}

const ThemeProvider: React.FC = ({children}) => {
    const [appTheme,] = useAppTheme();

    return <MThemeProvider theme={themes[appTheme]}>{children}</MThemeProvider>;
}

export default ThemeProvider;
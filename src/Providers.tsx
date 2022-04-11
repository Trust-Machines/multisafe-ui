import React from 'react'
import {Provider} from 'jotai';
import {useAtomDevtools} from 'jotai/devtools'
import {ThemeProvider as MThemeProvider, createTheme, ThemeOptions} from '@mui/material';
import {Connect} from '@stacks/connect-react';

import {networkAtom, appThemeAtom} from './store';
import useAppTheme from './hooks/use-app-theme';

import {baseAuthOptions} from './constants';

const StoreDevToolsProvider: React.FC = ({children}) => {
    useAtomDevtools(networkAtom, 'Network');
    useAtomDevtools(appThemeAtom, 'App Theme');
    return <>{children}</>;
}


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

const Providers: React.FC = ({children}) => {
    return (
        <Provider>
            <Connect authOptions={baseAuthOptions}>
                <StoreDevToolsProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </StoreDevToolsProvider>
            </Connect>
        </Provider>
    )
}

export default Providers;

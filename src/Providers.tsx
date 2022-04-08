import React from 'react'
import {Provider} from 'jotai';
import {useAtomDevtools} from 'jotai/devtools'
import {ThemeProvider as MThemeProvider, createTheme, ThemeOptions} from '@mui/material';

import {networkAtom, appThemeAtom} from './store';
import useAppTheme from './hooks/use-app-theme';

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
            <StoreDevToolsProvider>
                <ThemeProvider>{children}</ThemeProvider>
            </StoreDevToolsProvider>
        </Provider>
    )
}

export default Providers;

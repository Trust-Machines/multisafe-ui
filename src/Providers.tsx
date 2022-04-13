import React from 'react'
import {Provider} from 'jotai';
import {useAtomDevtools} from 'jotai/devtools'
import {ThemeProvider as MThemeProvider, createTheme, ThemeOptions} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {Connect} from '@stacks/connect-react';

import {networkAtom, appThemeAtom} from './store';
import useAppTheme from './hooks/use-app-theme';
import useToast from './hooks/use-toast';

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

const ToastProvider: React.FC = ({children}) => {
    const [toast, , hideMessage] = useToast();
    return <>
        {children}
        {(toast.message && toast.type) && (
            <Snackbar open onClose={hideMessage} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={hideMessage} severity={toast.type} sx={{width: '100%'}}>{toast.message}</Alert>
            </Snackbar>
        )}
    </>;
}

const Providers: React.FC = ({children}) => {
    return (
        <Provider>
            <Connect authOptions={baseAuthOptions}>
                <StoreDevToolsProvider>
                    <ThemeProvider>
                        <ToastProvider>{children}</ToastProvider>
                    </ThemeProvider>
                </StoreDevToolsProvider>
            </Connect>
        </Provider>
    )
}

export default Providers;

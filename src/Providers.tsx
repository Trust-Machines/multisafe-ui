import React, {useCallback, useEffect} from 'react'
import {Provider} from 'jotai';
import {useAtomDevtools} from 'jotai/devtools'
import {ThemeProvider as MThemeProvider, createTheme, ThemeOptions} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {Connect} from '@stacks/connect-react';

import {networkAtom, uiAtom} from './store';
import useAppTheme from './hooks/use-app-theme';
import useToast from './hooks/use-toast';

import {baseAuthOptions} from './constants';
import useSafes from './hooks/use-safes';
import useAddress from './hooks/use-address';
import useNetwork from './hooks/use-network';

const StoreDevToolsProvider: React.FC = ({children}) => {
    useAtomDevtools(networkAtom, 'Network');
    useAtomDevtools(uiAtom, 'UI');
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

const SafesProvider: React.FC = ({children}) => {
    const [, fetchSafes] = useSafes();
    const address = useAddress();
    const [network] = useNetwork();

    useEffect(() => {
        fetchSafes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, network]);

    return <>{children}</>;
}

const Providers: React.FC = ({children}) => {
    return (
        <Provider>
            <Connect authOptions={baseAuthOptions}>
                <StoreDevToolsProvider>
                    <ThemeProvider>
                        <ToastProvider> <SafesProvider>{children} </SafesProvider> </ToastProvider>
                    </ThemeProvider>
                </StoreDevToolsProvider>
            </Connect>
        </Provider>
    )
}

export default Providers;

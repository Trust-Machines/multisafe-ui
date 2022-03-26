import React from 'react'
import {Provider} from 'jotai';
import {useAtomDevtools} from 'jotai/devtools'
import {networkAtom} from "./store";

import {ThemeProvider, createTheme} from "@mui/material";

const AtomsDevtools: React.FC = ({children}) => {
    useAtomDevtools(networkAtom, 'Network');

    return <>{children}</>
}

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Providers: React.FC = ({children}) => {
    return (
        <Provider>
            <AtomsDevtools>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AtomsDevtools>
        </Provider>
    )
}

export default Providers;

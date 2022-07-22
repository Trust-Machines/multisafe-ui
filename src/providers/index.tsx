import React from 'react'
import {Provider} from 'jotai';
import {ClientProvider} from '@micro-stacks/react';

import DevToolsProvider from './dev-tools';
import ThemeProvider from './theme';
import ModalProvider from './modal';
import ToastProvider from './toast';
import UserDataProvider from './user-data';

import {baseAuthOptions} from '../constants';

const Providers: React.FC = ({children}) => {
    return (
        <ClientProvider appName={baseAuthOptions.appDetails.name} appIconUrl={baseAuthOptions.appDetails.icon}>
            <Provider>
                <DevToolsProvider>
                    <ThemeProvider>
                        <ModalProvider>
                            <ToastProvider>
                                <UserDataProvider>{children}</UserDataProvider>
                            </ToastProvider>
                        </ModalProvider>
                    </ThemeProvider>
                </DevToolsProvider>
            </Provider>
        </ClientProvider>
    )
}

export default Providers;

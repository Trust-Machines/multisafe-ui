import React from 'react'
import {ClientProvider} from '@micro-stacks/react';

import DevToolsProvider from './dev-tools';
import ThemeProvider from './theme';
import ModalProvider from './modal';
import ToastProvider from './toast';
import UserDataProvider from './user-data';

import useModal from '../hooks/use-modal';
import {InstallWalletDialog} from '../components/no-wallet-modal';
import {baseAuthOptions} from '../constants';

const Providers: React.FC = ({children}) => {
    const [, showModal] = useModal()
    return (
        <ClientProvider appName={baseAuthOptions.appDetails.name}
                        appIconUrl={baseAuthOptions.appDetails.icon}
                        onNoWalletFound={() => {
                            showModal({
                                body: <InstallWalletDialog/>
                            })
                        }}>
            <DevToolsProvider>
                <ThemeProvider>
                    <ModalProvider>
                        <ToastProvider>
                            <InstallWalletDialog/>
                            <UserDataProvider>{children}</UserDataProvider>
                        </ToastProvider>
                    </ModalProvider>
                </ThemeProvider>
            </DevToolsProvider>
        </ClientProvider>
    )
}

export default Providers;

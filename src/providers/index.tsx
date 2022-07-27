import React from 'react'
import {useAtom} from 'jotai';
import {ClientProvider} from '@micro-stacks/react';

import DevToolsProvider from './dev-tools';
import ThemeProvider from './theme';
import ModalProvider from './modal';
import ToastProvider from './toast';
import UserDataProvider from './user-data';

import {baseAuthOptions} from '../constants';
import {InstallWalletDialog} from '../components/no-wallet-modal';
import {showNoWalletAtom} from '../store/ui';


const Providers: React.FC = ({children}) => {
    const [, setIsOpen] = useAtom(showNoWalletAtom)
    return (
        <ClientProvider appName={baseAuthOptions.appDetails.name}
                        appIconUrl={baseAuthOptions.appDetails.icon}
                        onNoWalletFound={() => {
                            setIsOpen(true)
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

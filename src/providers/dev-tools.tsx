import React from 'react';
import {useAtomDevtools} from 'jotai/devtools';
import {networkAtom, uiAtom} from '../store';

const DevToolsProvider: React.FC = ({children}) => {
    useAtomDevtools(networkAtom, 'Network');
    useAtomDevtools(uiAtom, 'UI');
    return <>{children}</>;
}

export default DevToolsProvider;
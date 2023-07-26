import React from 'react';
// import {useAtomDevtools} from 'jotai/devtools';
// import {networkAtom} from '../store';

const DevToolsProvider: React.FC = ({children}) => {
    // useAtomDevtools(networkAtom, 'Network');
    return <>{children}</>;
}

export default DevToolsProvider;

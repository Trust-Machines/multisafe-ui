import React from 'react'
import {Provider} from 'jotai';
import {useAtomDevtools} from 'jotai/devtools'
import {themeAtom, todosAtom} from "./atoms";

const AtomsDevtools: React.FC = ({children}) => {
    useAtomDevtools(todosAtom, 'Lolo')
    useAtomDevtools(themeAtom, 'Lolo2');

    return <>{children}</>
}

const Providers: React.FC = ({children}) => {
    return (
        <Provider>
            <AtomsDevtools>{children}</AtomsDevtools>
        </Provider>
    )
}

export default Providers

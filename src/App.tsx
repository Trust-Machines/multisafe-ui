import React from 'react';
import {Router} from '@reach/router';

import useMediaBreakPoint from './hooks/useMediaBreakPoint';

import AppWrapper from './layout/app-wrapper'
import Navbar from './layout/navbar';
import Home from './views/home';
import Create from './views/create';
import Import from './views/import';

function App() {
    const [,isMd] = useMediaBreakPoint();

    return (
        <AppWrapper>
            <Navbar/>
            <Router style={{flexGrow: 1, display: 'flex', flexDirection: isMd ? 'row' : 'column'}}>
                <Home path='/'/>
                <Create path='/create'/>
                <Import path='/import'/>
            </Router>
        </AppWrapper>
    );
}

export default App;

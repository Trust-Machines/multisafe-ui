import React from 'react';
import {Router} from '@reach/router';

import useMediaBreakPoint from './hooks/useMediaBreakPoint';

import AppWrapper from './layout/AppWrapper'
import Navbar from './layout/Navbar';
import Home from './views/Home';
import Create from './views/Create';
import Import from './views/Import';

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

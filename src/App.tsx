import React from 'react';
import {Router} from '@reach/router';

import AppWrapper from './layout/app-wrapper'
import Home from './views/home';
import Create from './views/create';
import Safe from './views/safe';

function App() {
    return (
        <AppWrapper>
            <Router style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                <Home path='/'/>
                <Create path='/create'/>
                <Safe path='/safe/:safeId'/>
                <Safe path='/safe/:safeId/nft'/>
                <Safe path='/safe/:safeId/transactions'/>
                <Safe path='/safe/:safeId/owners'/>
                <Safe path='/safe/:safeId/policy'/>
            </Router>
        </AppWrapper>
    );
}

export default App;

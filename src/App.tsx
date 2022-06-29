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
                {['nft', 'transactions', 'owners', 'policy', 'btc-bridge'].map((a) => <Safe key={a} path={`/safe/:safeId/${a}`}/>)}
            </Router>
        </AppWrapper>
    );
}

export default App;

import React from 'react';
import {Router} from '@reach/router';
import {Container} from '@mui/material';

import Home from './pages/Home';
import Navbar from './layout/Navbar';
import AppWrapper from './layout/AppWrapper';
import useMediaBreakPoint from './hooks/useMediaBreakPoint';

function App() {
    const [isMd] = useMediaBreakPoint();

    return (
        <AppWrapper>
            <Navbar/>
            <Container maxWidth='lg' sx={{flexGrow: 1, display: 'flex'}}>
                <Router style={{flexGrow: 1, display: 'flex', flexDirection: isMd ? 'row' : 'column'}}>
                    <Home path='/'/>
                </Router>
            </Container>
        </AppWrapper>
    );
}

export default App;

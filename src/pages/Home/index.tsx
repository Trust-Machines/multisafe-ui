import React from 'react';
import {RouteComponentProps} from '@reach/router'

import Container from '@mui/material/Container';

import Navbar from '../../layout/Navbar';
import useAuth from "../../hooks/useAuth";

const Home = (_: RouteComponentProps) => {

    const [userData, openAuth, signOut] = useAuth();

    console.log(userData)
    return <>
        <Navbar/>
        <Container maxWidth='lg'>
            ddd
        </Container>
    </>
}

export default Home;
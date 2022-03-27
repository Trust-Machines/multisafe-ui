import React, {useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';

import {Network} from '../../store/network';

import useAppTheme from '../../hooks/useAppTheme';
import useAuth from '../../hooks/useAuth';
import useNetwork from '../../hooks/useNetwork';

import NetworkDialog from '../../components/NetworkDialog';

import {truncateMiddle} from '../../util';


const Navbar = () => {
    const [appTheme, toggleAppTheme] = useAppTheme();
    const [userData, openAuth, signOut] = useAuth();
    const [network, setNetwork] = useNetwork();
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
    const [networkDialog, setNetworkDialog] = useState(false);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const openNetworkDialog = () => {
        setNetworkDialog(true);
    }

    const handleCloseNetworkDialog = (selected: Network) => {
        setNetworkDialog(false);

        if (selected !== network) {
            setNetwork(selected);
        }
    }

    return (
        <>
            <AppBar position='static'>
                <Container maxWidth='lg'>
                    <Toolbar>
                        <Typography variant='h5' component='div' sx={{flexGrow: 1}}>
                            MultiSafe
                        </Typography>
                        <Toolbar>
                            {userData &&
                            <Button variant='outlined' style={{background: appTheme === 'light' ? 'white' : 'inherit'}}
                                    onClick={handleOpenMenu}>{truncateMiddle(userData.profile.stxAddress[network], 4)}</Button>}
                            {!userData && <Button color='inherit' onClick={openAuth}>Connect Wallet</Button>}
                        </Toolbar>
                        <IconButton onClick={toggleAppTheme}>
                            {appTheme === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
                        </IconButton>
                    </Toolbar>
                    <Menu
                        sx={{mt: '45px', minWidth: '400px'}}
                        id='menu-appbar'
                        anchorEl={anchorElMenu}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElMenu)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={() => {
                            openNetworkDialog();
                            handleCloseMenu();
                        }}>
                            Network <Chip size='small' label={network} sx={{ml: '60px'}}/>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            openAuth();
                            handleCloseMenu();
                        }}>
                            Switch Account
                        </MenuItem>
                        <MenuItem onClick={() => {
                            signOut();
                            handleCloseMenu();
                        }}>
                            Sign Out
                        </MenuItem>
                    </Menu>
                </Container>
            </AppBar>
            <NetworkDialog selectedValue={network} open={networkDialog} onClose={handleCloseNetworkDialog}/>
        </>
    );
}

export default Navbar;
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
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {Network} from '../../store/network';

import useAppTheme from '../../hooks/useAppTheme';
import useAuth from '../../hooks/useAuth';
import useNetwork from '../../hooks/useNetwork';
import useBnsName from '../../hooks/useBnsName';
import useAddress from '../../hooks/useAddress';
import useTranslation from '../../hooks/useTranslation';

import NetworkDialog from '../../components/NetworkDialog';

import {truncateMiddle} from '../../util';


const Navbar = () => {
    const [appTheme, toggleAppTheme] = useAppTheme();
    const [, openAuth, signOut] = useAuth();
    const address = useAddress();
    const bnsName = useBnsName();
    const [network, ,setNetwork] = useNetwork();
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
    const [networkDialog, setNetworkDialog] = useState(false);
    const [t] = useTranslation();
    
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
        <div style={{flexGrow: 0, zIndex: 1}}>
            <AppBar position='static'>
                <Container maxWidth='lg'>
                    <Toolbar>
                        <Typography variant='h5' component='div' sx={{flexGrow: 1}}>
                            MultiSafe
                        </Typography>
                        <Stack direction='row' spacing={2}>
                            {address &&
                            <Button variant='outlined' style={{background: appTheme === 'light' ? 'white' : 'inherit'}}
                                    onClick={handleOpenMenu}>{bnsName || truncateMiddle(address, 4)} <ArrowDropDownIcon /></Button>}
                            {!address && <Button color='inherit' onClick={openAuth}>{t('Connect Wallet')}</Button>}
                            <IconButton onClick={toggleAppTheme}>
                                {appTheme === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
                            </IconButton>
                        </Stack>
                    </Toolbar>
                    <Menu
                        sx={{mt: '45px', minWidth: '400px'}}
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
                            {t('Network')} <Chip size='small' label={network} sx={{ml: '60px'}}/>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            openAuth();
                            handleCloseMenu();
                        }}>
                            {t('Switch Account')}
                        </MenuItem>
                        <MenuItem onClick={() => {
                            signOut();
                            handleCloseMenu();
                        }}>
                            {t('Sign Out')}
                        </MenuItem>
                    </Menu>
                </Container>
            </AppBar>
            <NetworkDialog selectedValue={network} open={networkDialog} onClose={handleCloseNetworkDialog}/>
        </div>
    );
}

export default Navbar;
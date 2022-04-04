import React, {useState} from 'react';
import styled from 'styled-components';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {useTheme} from '@mui/material';
import Box from '@mui/material/Box';
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
import {grey} from '@mui/material/colors';
import {Network} from '../../store/network';

import Brand from './components/Brand';
import Wallet from './components/Wallet';
import ThemeSwitch from './components/ThemeSwitch';

import useAppTheme from '../../hooks/useAppTheme';
import useUserSession from '../../hooks/useUserSession';
import useNetwork from '../../hooks/useNetwork';
import useBnsName from '../../hooks/useBnsName';
import useAddress from '../../hooks/useAddress';
import useTranslation from '../../hooks/useTranslation';

import NetworkDialog from '../../components/NetworkDialog';

import {truncateMiddle} from '../../util';
import useMediaBreakPoint from '../../hooks/useMediaBreakPoint';


const Navbar = () => {
    const theme = useTheme()
    const [appTheme, toggleAppTheme] = useAppTheme();
    const [, , openAuth, signOut] = useUserSession();
    const address = useAddress();
    const bnsName = useBnsName();
    const [network, , setNetwork] = useNetwork();
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
    const [networkDialog, setNetworkDialog] = useState(false);
    const [t] = useTranslation();
    const [isSm] = useMediaBreakPoint();

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
        <Box sx={{
            height: '54px',
            display: 'flex',
            padding: '0 18px',
            position: 'relative',
            zIndex: 1,
            boxShadow: `${theme.palette.divider} 0 2px 4px 0`,
            background: appTheme === 'light' ? '#fff' : grey[900],
            userSelect: 'none'
        }}>
            <Brand/>
            <div className="flex-grow"/>
            <Wallet/>
            <ThemeSwitch/>
        </Box>
    );
}

export default Navbar;
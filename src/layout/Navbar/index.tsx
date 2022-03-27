import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Container from '@mui/material/Container';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import useAppTheme from "../../hooks/useAppTheme";
import useAuth from "../../hooks/useAuth";


const truncateMiddle = (s: string, cut: number): string => {
    const l = s.length;
    return s.substring(0, cut) + "..." + s.substring(l - cut, l);
}


const Navbar = () => {
    const [appTheme, toggleAppTheme] = useAppTheme();
    const [userData, openAuth, signOut] = useAuth();
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        MultiSafe
                    </Typography>
                    <Toolbar>
                        {userData &&
                        <Button variant="outlined" style={{background: "#fff"}}
                                onClick={handleOpenMenu}>{truncateMiddle(userData.profile.stxAddress.mainnet, 4)}</Button>}
                        {!userData && <Button color="inherit" onClick={openAuth}>Connect Wallet</Button>}
                    </Toolbar>
                    <IconButton onClick={toggleAppTheme}>
                        {appTheme === "light" ? <DarkModeIcon/> : <LightModeIcon/>}
                    </IconButton>
                </Toolbar>
                <Menu
                    sx={{mt: '45px', minWidth: '400px'}}
                    id="menu-appbar"
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
                        handleCloseMenu();
                    }}>
                        <Typography>Network <Chip size="small" label="Mainnet" sx={{ml: '60px'}} /></Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        openAuth();
                        handleCloseMenu();
                    }}>
                        <Typography>Switch Account</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        signOut();
                        handleCloseMenu();
                    }}>
                        <Typography>Sign Out</Typography>
                    </MenuItem>
                </Menu>
            </Container>
        </AppBar>
    );
}

export default Navbar;
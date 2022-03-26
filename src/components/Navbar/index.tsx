import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import useAppTheme from "../../hooks/useAppTheme";

const Navbar = () => {
    const [appTheme, toggleAppTheme] = useAppTheme();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        MultiSafe
                    </Typography>
                    <Button color="inherit">Connect Wallet</Button>
                    <IconButton onClick={toggleAppTheme}>
                        {appTheme === "light" ? <DarkModeIcon/> : <LightModeIcon/>}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
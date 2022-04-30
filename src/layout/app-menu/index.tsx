import React, {useState} from 'react';
import {Box, useTheme} from '@mui/material';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import MenuIcon from '@mui/icons-material/Menu';
import {grey} from '@mui/material/colors';

const AppMenu = (props: { children?: React.ReactNode }) => {
    const [, isMd] = useMediaBreakPoint();
    const theme = useTheme();
    const [menu, setMenu] = useState(false)

    const smMenuTrigger = <Box onClick={() => {
        setMenu(!menu)
    }
    } sx={{
        display: isMd ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        left: '6px',
        bottom: '0',
        top: '7px',
        zIndex: 3,
        width: '40px',
        height: '40px',
        borderRadius: '12px'
    }}>
        <MenuIcon fontSize="large" color={menu ? 'inherit' : 'action'}/>
    </Box>

    return <>{smMenuTrigger}
        <Box sx={{
            width: '200px',
            position: isMd ? null : 'absolute',
            bottom: '0',
            top: '0',
            left: menu ? '0' : '-210px',
            zIndex: 2,
            flexGrow: 0,
            flexShrink: 0,
            boxShadow: `${theme.palette.divider} 1px 2px 10px 0px`,
            bgcolor: theme.palette.mode === 'light' ? '#fff' : grey[900]
        }}>{props.children}</Box>
    </>
}

export default AppMenu;
import React from 'react';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import {Helmet} from 'react-helmet';

const AppContent = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const theme = useTheme();
    const bgcolor = theme.palette.mode === 'light' ? grey[50] : grey[900];
    const head = <Helmet><meta name="theme-color" content={bgcolor}/></Helmet>;

    return <Box sx={{
        bgcolor,
        height: 'calc(100% - 40px)',
        p: '20px',
        flexDirection: 'column',
        flexGrow: 1,
        display: 'flex',
        position: 'relative',
        ...props.sx
    }}>{head}{props.children}</Box>
}

export default AppContent;

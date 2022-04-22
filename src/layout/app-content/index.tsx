import React from 'react';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

const AppContent = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const theme = useTheme();

    return <Box sx={{
        bgcolor: theme.palette.mode === 'light' ? grey[50] : grey[900],
        height: 'calc(100% - 40px)',
        p: '20px',
        flexDirection:'column',
        flexGrow: 1,
        overflow: 'auto',
        display: 'flex',
        position: 'relative',
        ...props.sx
    }
    }>{props.children}</Box>
}

export default AppContent;
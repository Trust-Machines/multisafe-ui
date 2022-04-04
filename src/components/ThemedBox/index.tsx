import React from 'react';

import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

import useAppTheme from '../../hooks/useAppTheme';

const ThemedBox = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const [appTheme] = useAppTheme();
    const theme = useTheme();

    return <Box sx={
        {
            ...{
                bgcolor: appTheme === 'light' ? '#fff' : grey[800],
                padding: '10px',
                borderRadius: '6px',
                boxShadow: `${theme.palette.divider} 1px 2px 10px 0px`
            },
            ...props.sx
        }
    }>{props.children}</Box>
}

export default ThemedBox
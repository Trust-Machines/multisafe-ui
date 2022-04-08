import React from 'react';

import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

const BoxFooter = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const theme = useTheme();

    return <Box sx={
        {
            ...{
                padding: '26px 0',
                borderTop: `2px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            ...props.sx
        }
    }>{props.children}</Box>
}

export default BoxFooter
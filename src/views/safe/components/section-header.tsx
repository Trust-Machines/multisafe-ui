import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';

const SectionHeader = (props: { title: string, icon: JSX.Element, children?: React.ReactNode }) => {
    const theme = useTheme();
    const icon = React.cloneElement(props.icon, {
        sx: {
            marginRight: '4px',
            color: theme.palette.primary.main
        }
    })
    return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: '20px'
    }}>
        <Typography variant="h6" sx={{display: 'flex', alignItems: 'center',}}>
            {icon} {props.title}
        </Typography>
        {props.children}
    </Box>
}

export default SectionHeader;
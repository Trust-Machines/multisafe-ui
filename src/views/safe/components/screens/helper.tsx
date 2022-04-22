import React from 'react';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material';

const ScreenHeader = (props: { title: string, icon: JSX.Element }) => {
    const theme = useTheme();
    const icon = React.cloneElement(props.icon, {
        sx: {
            marginRight: '4px',
            color: theme.palette.primary.main
        }
    })
    return <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', mb: '20px'}}>
        {icon} {props.title}
    </Typography>
}

export default ScreenHeader;
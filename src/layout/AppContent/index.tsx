import React from 'react';
import {Box} from '@mui/material';
import {grey} from "@mui/material/colors";

const AppContent = (props: { children: React.ReactNode }) => {
    const boxStyles = {
        bgcolor: grey[100],
        height: 'calc(100% - 40px)',
        flexGrow: 1,
        padding: '20px',
        overflow: 'auto'
    }

    return <Box sx={boxStyles}>{props.children}</Box>
}

export default AppContent;
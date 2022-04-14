import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useTranslation from '../../../hooks/use-translation';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import useSafes from '../../../hooks/use-safes';

const Load = () => {
    const [isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const [safes] = useSafes();
    console.log(safes);

    return <>
        <Typography variant='h6' fontWeight='400' gutterBottom>{t('Load Existing Safe')}</Typography>
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <TextField sx={{
                width: isMd ? '640px' : '100%',
                marginRight: '6px'
            }} label={t('Safe Address')} placeholder={t('Enter safe address or select and press enter')}/>
        </Box>
    </>
}

export default Load;
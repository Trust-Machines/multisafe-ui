import React from 'react';
import {useNavigate} from '@reach/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';

import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import useTranslation from '../../../hooks/use-translation';
import useSafes from '../../../hooks/use-safes';

import ThemedBox from '../../../components/themed-box';


const Recent = () => {
    const [, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [safes, , upsertSafe] = useSafes();
    const theme = useTheme();

    if (safes.list.length === 0) {
        return null;
    }

    return <ThemedBox sx={{
        padding: '20px',
        width: isMd ? '400px' : null
    }}>
        <Typography variant='h6' gutterBottom>{t('Recently used')}</Typography>
        {safes.list.map((i, n) => {
            const [address, name] = i.split(".");
            return <Box key={i} sx={{
                cursor: 'pointer',
                padding: '6px',
                marginBottom: n === safes.list.length - 1 ? null : '6px',
                borderRadius: '4px',
                bgcolor: theme.palette.mode === 'light' ? grey[50] : grey[900],
                ':hover': {
                    bgcolor: 'transparent'
                }
            }} onClick={() => {
                upsertSafe(i).then();
                navigate(`/safe/${i}`).then();
            }}>
                <Box sx={{fontWeight: 'bold'}}>{name}</Box>
                <Box sx={{fontSize: '90%', overflowWrap: 'break-word'}}>{address}</Box>
            </Box>
        })}
    </ThemedBox>
}

export default Recent
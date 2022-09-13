import React from 'react';
import {useNavigate} from '@reach/router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import useTranslation from '../../../hooks/use-translation';
import useSafes from '../../../hooks/use-safes';

import ThemedBox from '../../../components/themed-box';


const Create = () => {
    const [isSm, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [safes,] = useSafes();

    if (safes.list.length > 0) {
        return null;
    }

    return <ThemedBox sx={{padding: '20px', width: isMd ? '260px' : (isSm ? '236px' : null)}}>
        <Typography variant='h6' gutterBottom>{t('Don\'t have a safe?')}</Typography>
        <Typography mb='40px'>{t('Create a safe with multiple owners')}{' '}</Typography>
        <Button variant='contained' onClick={() => {
            navigate('/create').then();
        }}>{t('Create New Safe')}</Button>
    </ThemedBox>
}

export default Create

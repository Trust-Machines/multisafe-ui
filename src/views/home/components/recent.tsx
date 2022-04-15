import React from 'react';
import {useNavigate} from '@reach/router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import useTranslation from '../../../hooks/use-translation';
import useSafes from '../../../hooks/use-safes';

import ThemedBox from '../../../components/themed-box';


const Recent = () => {
    const [isSm, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [safes,] = useSafes();

    if (safes.list.length === 0) {
        return null;
    }

    return <ThemedBox sx={{
        padding: '20px',
        width: isMd ? '400px' : null
    }}>
        <Typography variant='h6' gutterBottom>{t('Recently used')}</Typography>
        <p>qedeqd</p>
        <p>qedeqd</p>
    </ThemedBox>
}

export default Recent
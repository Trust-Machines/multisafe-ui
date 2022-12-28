import React from 'react';
import {useNavigate} from '@reach/router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import LoadSafe from './dialogs/load-safe';
import useTranslation from '../../../hooks/use-translation';
import useModal from '../../../hooks/use-modal';

const Load = () => {
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [, showModal] = useModal();

    const load = () => {
        showModal({
            body: <LoadSafe onResolve={(safe) => {
                navigate(`/safe/${safe}`).then();
            }}/>
        })
    }

    return <>
        <Typography variant='h6' gutterBottom>{t('Load Existing Safe')}</Typography>
        <Typography sx={{mb: '12px'}}>{t('Easily load your Safe using your Safe address')}</Typography>
        <Box>
            <Button sx={{width: '200px'}} variant='outlined' onClick={load}>
                <RotateRightIcon fontSize="small" sx={{mr: '8px'}}/>
                {t('Load')}
            </Button>
        </Box>
    </>
}

export default Load

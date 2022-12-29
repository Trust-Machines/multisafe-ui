import React from 'react';
import {useNavigate} from '@reach/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {grey} from '@mui/material/colors';
import {useTheme} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RotateRightIcon from '@mui/icons-material/RotateRight';

import LoadSafe from './dialogs/load-safe';
import useTranslation from '../../../hooks/use-translation';
import useSafes from '../../../hooks/use-safes';
import useModal from '../../../hooks/use-modal';

const SafeList = () => {
    const [t] = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();
    const [safes,] = useSafes();
    const [, showModal] = useModal();

    const create = () => {
        navigate('/create').then();
    }

    const load = () => {
        showModal({
            body: <LoadSafe onResolve={(safe) => {
                navigate(`/safe/${safe}`).then();
            }}/>
        })
    }

    return <>
        <Typography variant='h6'>{t('Your Safes')}</Typography>
        <Typography fontSize='small' sx={{mb: '20px', color: grey[600]}}>
            {t('List of Safes created by you or have you as one of its owners.')}
        </Typography>
        {safes.list.map((s, n) => {
            const [address, name] = s.address.split('.');
            return <Box key={s.address} sx={{
                cursor: 'pointer',
                padding: '6px',
                marginBottom: n === safes.list.length - 1 ? null : '6px',
                borderRadius: '4px',
                bgcolor: theme.palette.mode === 'light' ? grey[50] : grey[900],
                ':hover': {
                    bgcolor: 'transparent'
                }
            }} onClick={() => {
                navigate(`/safe/${s.address}`).then();
            }}>
                <Box sx={{fontWeight: 'bold'}}>{name}</Box>
                <Box sx={{fontSize: '90%', overflowWrap: 'break-word'}}>{address}</Box>
            </Box>
        })}
        <Box sx={{marginTop: '22px'}}>
            <Button variant='outlined' size='small' sx={{mr: '12px'}} onClick={create}>
                <AddIcon fontSize="small" sx={{mr: '8px'}}/> {t('Create new Safe')}
            </Button>
            <Button variant='outlined' size='small' onClick={load}>
                <RotateRightIcon fontSize="small" sx={{mr: '8px'}}/> {t('Load another safe ')}
            </Button>
        </Box>
    </>
}

export default SafeList;

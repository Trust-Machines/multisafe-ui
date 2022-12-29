import React from 'react';
import {useNavigate} from '@reach/router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import useTranslation from '../../../hooks/use-translation';


const Create = () => {
    const [t] = useTranslation();
    const navigate = useNavigate();

    return <>
        <Typography variant='h6' gutterBottom>{t('Don\'t have a safe?')}</Typography>
        <Typography sx={{mb: '12px'}}>{t('Create a safe with multiple owners')}</Typography>
        <Box>
            <Button sx={{width: '200px'}} variant='contained' onClick={() => {
                navigate('/create').then();
            }}><AddIcon fontSize="small" sx={{mr: '8px'}}/> {t('Create New Safe')}</Button>
        </Box>
    </>
}

export default Create

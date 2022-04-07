import useTranslation from '../../../hooks/useTranslation';
import {Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import BoxFooter from '../../../components/BoxFooter';
import React from 'react';

const SafeName = (props: { onSubmit: (name: string) => void }) => {
    const [t] = useTranslation();

    return <Box sx={{marginBottom: '30px'}}>
        <Typography sx={{
            mb: '20px',
            fontSize: '90%',
            color: 'text.secondary'
        }}>{'First, let\'s give your new safe a name. Your new safe will be created with this name and it will be stored on blockchain. Therefore, only alphanumeric characters and hyphens accepted.'}</Typography>
        <TextField sx={{width: '100%'}} label={'Safe name'} placeholder={'my-new-safe'} autoFocus={true}/>
        <BoxFooter>
            <Button variant="contained" onClick={() => {

                props.onSubmit("ss");
            }}>{t('Continue')}</Button>
        </BoxFooter>
    </Box>
}

export default SafeName;
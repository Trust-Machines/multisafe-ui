import React, {ChangeEvent, useState} from 'react';
import {RouteComponentProps} from '@reach/router';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import AppContent from '../../layout/AppContent';
import AppMenu from '../../layout/AppMenu';

import useUserSession from '../../hooks/useUserSession';

import useTranslation from '../../hooks/useTranslation';
import ThemedBox from '../../components/ThemedBox';
import {Box, Button} from '@mui/material';
import BoxFooter from '../../components/BoxFooter';
import WalletField from '../../components/WalletField';

const helpTextStyles = {
    mb: '20px',
    fontSize: '90%',
    color: 'text.secondary'
}

const SafeName = (props: { onSubmit: (name: string) => void }) => {
    return <Box sx={{marginBottom: '30px'}}>
        <Typography
            sx={helpTextStyles}>{'First, let\'s give your new safe a name. Your new safe will be created with this name and it will be stored on blockchain. Therefore, only alphanumeric characters and hyphens accepted.'}</Typography>
        <TextField sx={{width: '100%'}} label={'Safe name'} placeholder={'my-new-safe'} autoFocus={true}/>
    </Box>
}

const SafeOwners = (props: { onBack: () => void, onSubmit: (owners: string[]) => void }) => {
    const [owners, setOwners] = useState<string[]>([""]);
    const [t] = useTranslation();

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {
        const nOwners = owners.map((o, j) => {
            if (j === i) {
                return e.target.value;
            }

            return o;
        });

        setOwners([...nOwners]);
    }

    const addOwner = () => {
        setOwners([...owners, '']);
    }

    const deleteOwner = (i: number) => {
        setOwners([...owners.filter((a, b) => b !== i)]);
    }

    return <Box>
        <Typography
            sx={helpTextStyles}>{'Your Safe will have one or more owners. Add additional owners and specify how many of them have to confirm a transaction before it gets executed. In general, the more confirmations required, the more secure your Safe is.'}</Typography>

        {owners.map((x, i) => {
            return <Box key={i} sx={{mb: '26px', display: 'flex'}}>
                <WalletField sx={{flexGrow: 1}} label={t('Owner address')} autoFocus={i > 0} value={owners[i]}
                           onChange={(e) => {
                               console.log("change2")
                               handleInputChange(e, i);
                           }}/>
                <Box sx={{width: '40px', p: '0 10px', display: 'flex', alignItems: 'center'}}>
                    {i > 0 ? <IconButton onClick={() => {
                        deleteOwner(i);
                    }}>
                        <DeleteIcon/>
                    </IconButton> : ''}
                </Box>
            </Box>
        })}

        <Box sx={{m: '20px', textAlign: 'center'}}>
            <Button onClick={addOwner}><AddIcon/> {t('Add another owner')}</Button>
        </Box>

        <BoxFooter>
            <Button sx={{mr: '10px'}} onClick={props.onBack}>{t('Back')}</Button>
            <Button variant="contained" onClick={() => {
                props.onSubmit(owners);
            }}>{t('Continue')}</Button>
        </BoxFooter>
    </Box>
}

const Create = (_: RouteComponentProps) => {
    const [, userData, openAuth, signOut] = useUserSession();
    const [t] = useTranslation();
    return <>
        <AppContent>
            <Typography variant='h4' fontWeight='700' mt='10px' gutterBottom>{t('Create Safe')}</Typography>
            <Typography variant='h6' fontWeight='500'>{t('Create a safe with multiple owners.')}</Typography>
            <ThemedBox sx={{maxWidth: '640px', mt: '40px', pb: 0, p: '20px'}}>

                <SafeOwners onBack={() => {
                }}
                            onSubmit={(owners) => {
                            }}
                />


            </ThemedBox>
        </AppContent>
    </>
}

export default Create;
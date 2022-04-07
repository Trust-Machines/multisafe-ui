import React, {ChangeEvent, useMemo, useState} from 'react';
import {RouteComponentProps} from '@reach/router';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stepper from '@mui/material/Stepper';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {validateStacksAddress} from '@stacks/transactions';
import AppContent from '../../layout/AppContent';

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
    const [t] = useTranslation();

    return <Box sx={{marginBottom: '30px'}}>
        <Typography
            sx={helpTextStyles}>{'First, let\'s give your new safe a name. Your new safe will be created with this name and it will be stored on blockchain. Therefore, only alphanumeric characters and hyphens accepted.'}</Typography>
        <TextField sx={{width: '100%'}} label={'Safe name'} placeholder={'my-new-safe'} autoFocus={true}/>
        <BoxFooter>
            <Button variant="contained" onClick={() => {

                props.onSubmit("ss");
            }}>{t('Continue')}</Button>
        </BoxFooter>
    </Box>
}


const SafeOwnerInput = (props: {
    owner: string,
    deletable: boolean,
    dirty: boolean,
    onChange: (value: string) => void,
    onDelete: () => void,
    hasDuplicate: boolean
}) => {
    const [t] = useTranslation();
    const isValid = useMemo(() => validateStacksAddress(props.owner), [props.owner]);
    const showError = props.dirty && !isValid;
    const hasDuplicate = isValid && props.hasDuplicate;

    return <Box sx={{mb: '26px', display: 'flex'}}>
        <WalletField
            inputProps={{
                value: props.owner,
                label: t('Owner address'),
                autoFocus: true,
                onChange: (e) => {
                    props.onChange(e.target.value)
                },
                error: showError || hasDuplicate,
                helperText: showError || hasDuplicate ? (hasDuplicate ? t('Address already added') : t('Enter a valid Stacks wallet address')) : ''
            }}
            onBnsResolve={(name) => {
                props.onChange(name);
            }}
            isValid={isValid}
        />
        <Box sx={{width: '40px', p: '0 10px', display: 'flex', alignItems: 'center'}}>
            {props.deletable ? <IconButton onClick={() => {
                props.onDelete();
            }}>
                <DeleteIcon/>
            </IconButton> : ''}
        </Box>
    </Box>
}


const SafeOwners = (props: { onBack: () => void, onSubmit: (owners: string[]) => void }) => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [owners, setOwners] = useState<string[]>([""]);
    const [t] = useTranslation();

    const updateOwner = (i: number, value: string) => {
        const nOwners = owners.map((o, j) => j === i ? value : o);
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
            return <SafeOwnerInput key={i} owner={owners[i]} deletable={i > 0} dirty={submitted}
                                   hasDuplicate={owners.filter(x => x === owners[i]).length > 1}
                                   onChange={(value) => {
                                       updateOwner(i, value);
                                   }}
                                   onDelete={() => {
                                       deleteOwner(i);
                                   }}/>
        })}
        <Box sx={{m: '20px', textAlign: 'center'}}>
            <Button onClick={addOwner}><AddIcon/> {t('Add another owner')}</Button>
        </Box>
        <BoxFooter>
            <Button sx={{mr: '10px'}} onClick={props.onBack}>{t('Back')}</Button>
            <Button variant="contained" onClick={() => {
                setSubmitted(true);
                const canSubmit = owners.map(x => validateStacksAddress(x)).filter(x => x).length === owners.length // all addresses are valid
                    && [...new Set(owners)].length === owners.length // and no duplicates;

                if (canSubmit) {
                    props.onSubmit(owners);
                }
            }}>{t('Continue')}</Button>
        </BoxFooter>
    </Box>
}


const Create = (_: RouteComponentProps) => {
    const [, userData, openAuth, signOut] = useUserSession();
    const [t] = useTranslation();
    const [step, setStep] = useState(0);

    return <>
        <AppContent>
            <Typography variant='h4' fontWeight='700' mt='10px' gutterBottom>{t('Create Safe')}</Typography>
            <Typography variant='h6' fontWeight='500'>{t('Create a safe with multiple owners.')}</Typography>
            <ThemedBox sx={{maxWidth: '640px', mt: '40px', p: '20px'}}>
                <Stepper activeStep={step} orientation="vertical">
                    <Step key={0}>
                        <StepLabel>Safe Name</StepLabel>
                        <StepContent>
                            <SafeName onSubmit={() => {
                                setStep(step + 1);
                            }}/>
                        </StepContent>
                    </Step>
                    <Step key={1}>
                        <StepLabel>Owners</StepLabel>
                        <StepContent>
                            <SafeOwners
                                onBack={() => {
                                    setStep(step - 1);
                                }}
                                onSubmit={() => {
                                    setStep(step + 1);
                                }}/>
                        </StepContent>
                    </Step>
                    <Step key={3}>
                        <StepLabel>Confirmation</StepLabel>
                        <StepContent>
                            <SafeOwners
                                onBack={() => {
                                    setStep(step - 1);
                                }}
                                onSubmit={() => {
                                    setStep(step + 1);
                                }}/>
                        </StepContent>
                    </Step>

                    <Step key={4}>
                        <StepLabel>Review</StepLabel>
                        <StepContent>

                        </StepContent>
                    </Step>
                </Stepper>
            </ThemedBox>
        </AppContent>
    </>
}

export default Create;
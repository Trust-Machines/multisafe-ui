import React, {useState} from 'react';
import {RouteComponentProps} from '@reach/router';

import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import useUserSession from '../../hooks/use-user-session';
import useTranslation from '../../hooks/use-translation';

import AppContent from '../../layout/app-content';
import ThemedBox from '../../components/themed-box';
import SafeName from './components/safe-name';
import SafeOwners from './components/safe-owners';
import SafeConfirmations from './components/safe-confirmations';

const Create = (_: RouteComponentProps) => {
    const [, userData, openAuth, signOut] = useUserSession();
    const [t] = useTranslation();

    const [step, setStep] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [owners, setOwners] = useState<string[]>([""]);
    const [confirmations, setConfirmations] = useState<number>(1);

    return <>
        <AppContent>
            <Typography variant='h4' fontWeight='700' mt='10px' gutterBottom>{t('Create Safe')}</Typography>
            <Typography variant='h6' fontWeight='500'>{t('Create a safe with multiple owners.')}</Typography>
            <ThemedBox sx={{maxWidth: '640px', mt: '40px', p: '20px'}}>
                <Stepper activeStep={step} orientation="vertical">
                    <Step key={0}>
                        <StepLabel>{t('Safe Name')}</StepLabel>
                        <StepContent>
                            <SafeName name={name} onSubmit={(name) => {
                                setName(name)
                                setStep(step + 1);
                            }}/>
                        </StepContent>
                    </Step>
                    <Step key={1}>
                        <StepLabel>{t('Owners')}</StepLabel>
                        <StepContent>
                            <SafeOwners
                                owners={owners}
                                onBack={() => {
                                    setStep(step - 1);
                                }}
                                onSubmit={(owners) => {
                                    setOwners(owners);
                                    setStep(step + 1);
                                }}/>
                        </StepContent>
                    </Step>
                    <Step key={3}>
                        <StepLabel>Confirmation</StepLabel>
                        <StepContent>
                            <SafeConfirmations
                                max={owners.length}
                                value={confirmations}
                                onBack={() => {
                                    setStep(step - 1);
                                }}
                                onSubmit={(value) => {
                                    setConfirmations(value);
                                    setStep(step + 1);
                                }}
                            />
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
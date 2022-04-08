import React, {useState} from 'react';
import {RouteComponentProps} from '@reach/router';

import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import useUserSession from '../../hooks/useUserSession';
import useTranslation from '../../hooks/useTranslation';

import AppContent from '../../layout/app-content';
import ThemedBox from '../../components/themed-box';
import SafeName from './components/SafeName';
import SafeOwners from './components/SafeOwners';

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
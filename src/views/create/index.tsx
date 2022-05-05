import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from '@reach/router';

import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import {useConnect} from '@stacks/connect-react';
import {makeSafeContract, NETWORK} from '@trustmachines/multisafe-contracts';
import safe from '@trustmachines/multisafe-contracts/contracts/safe.clar';

import useUserSession from '../../hooks/use-user-session';
import useTranslation from '../../hooks/use-translation';
import useNetwork from '../../hooks/use-network';
import useToast from '../../hooks/use-toast';

import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import ThemedBox from '../../components/themed-box';
import SafeName from './components/safe-name';
import SafeOwners from './components/safe-owners';
import SafeConfirmations from './components/safe-confirmations';
import SafeReview from './components/safe-review';
import SafeSuccess from './components/safe-success';

import {makeTxUrl} from '../../api/helper';

const Create = (_: RouteComponentProps) => {
    const [, userData, openAuth] = useUserSession();
    const [network, stacksNetwork] = useNetwork();
    const [t] = useTranslation();

    const [step, setStep] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [owners, setOwners] = useState<string[]>(['']);
    const [confirmations, setConfirmations] = useState<number>(1);
    const [deployedNetwork, setDeployedNetwork] = useState<NETWORK>(network);
    const [txUrl, setTxUrl] = useState<string>('');
    const {doContractDeploy} = useConnect();
    const boxSx = {maxWidth: '690px', p: '20px'};
    const [, showToast] = useToast();

    useEffect(() => {
        if (owners.length < confirmations) {
            setConfirmations(owners.length);
        }
    }, [owners, confirmations]);

    return <>
        <Navbar/>
        <AppContent>
            <Typography variant='h4' fontWeight='700' mt='10px' gutterBottom>{t('Create Safe')}</Typography>
            <Typography variant='h6' fontWeight='500'>{t('Create a safe with multiple owners.')}</Typography>
            <Stepper activeStep={step} orientation='vertical' sx={{mt: '40px'}}>
                <Step key={0}>
                    <StepLabel>{t('Safe Name')}</StepLabel>
                    <StepContent>
                        <ThemedBox sx={boxSx}>
                            <SafeName name={name} onSubmit={(name) => {
                                setName(name)
                                setStep(step + 1);
                            }}/>
                        </ThemedBox>
                    </StepContent>
                </Step>
                <Step key={1}>
                    <StepLabel>{t('Owners')}</StepLabel>
                    <StepContent>
                        <ThemedBox sx={boxSx}>
                            <SafeOwners
                                owners={owners}
                                onBack={(owners) => {
                                    setOwners(owners);
                                    setStep(step - 1);
                                }}
                                onSubmit={(owners) => {
                                    setOwners(owners);
                                    setStep(step + 1);
                                }}
                            />
                        </ThemedBox>
                    </StepContent>
                </Step>
                <Step key={2}>
                    <StepLabel>{t('Confirmation Threshold')}</StepLabel>
                    <StepContent>
                        <ThemedBox sx={boxSx}>
                            <SafeConfirmations
                                max={owners.length}
                                value={confirmations}
                                onBack={() => {
                                    setStep(step - 1);
                                }}
                                onNext={() => {
                                    setStep(step + 1);
                                }}
                                onChange={(value) => {
                                    setConfirmations(value);
                                }}
                            />
                        </ThemedBox>
                    </StepContent>
                </Step>
                <Step key={3}>
                    <StepLabel>{t('Review')}</StepLabel>
                    <StepContent>
                        <ThemedBox sx={boxSx}>
                            <SafeReview
                                name={name}
                                owners={owners}
                                confirmations={confirmations}
                                onBack={() => {
                                    setStep(step - 1);
                                }}
                                onNext={() => {
                                    if (!userData) {
                                        openAuth();
                                        return;
                                    }

                                    const code = makeSafeContract(
                                        safe,
                                        owners,
                                        confirmations,
                                        network
                                    );

                                    doContractDeploy({
                                        network: stacksNetwork,
                                        contractName: name,
                                        codeBody: code,
                                        onFinish: data => {
                                            setStep(step + 1);
                                            setTxUrl(makeTxUrl(data.txId, network))
                                            setDeployedNetwork(network);
                                        },
                                    }).then();
                                }}
                                onConflict={() => {
                                    showToast(t('This safe name is already in use. Please enter another name.'), 'error');
                                    setStep(0);
                                }}/>
                        </ThemedBox>
                    </StepContent>
                </Step>
                <Step key={4}>
                    <StepLabel>{t('Done')}</StepLabel>
                    <StepContent>
                        <ThemedBox sx={boxSx}>
                            <SafeSuccess txUrl={txUrl} network={deployedNetwork}/>
                        </ThemedBox>
                    </StepContent>
                </Step>
            </Stepper>
        </AppContent>
    </>
}

export default Create;
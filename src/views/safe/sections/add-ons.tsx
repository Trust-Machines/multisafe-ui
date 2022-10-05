import React, {useState} from 'react';
import ExtensionIcon from '@mui/icons-material/Extension';
import Box from '@mui/material/Box';
import {useNavigate, useParams} from '@reach/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {bufferCVFromString, contractPrincipalCV, noneCV, someCV, uintCV} from 'micro-stacks/clarity';
import {DEPLOYER} from '@trustmachines/multisafe-contracts';
import addOns from '../../../constants/add-ons';
import useSafe from '../../../hooks/use-safe';
import useSafeCalls from '../../../hooks/use-safe-call';
import SectionHeader from '../components/section-header';
import CommonTxFeedbackDialog from '../components/dialogs/common-feedback';
import useTranslation from '../../../hooks/use-translation';
import ThemedBox from '../../../components/themed-box';
import useNetwork from '../../../hooks/use-network';
import useToast from '../../../hooks/use-toast';
import {AddOn} from '../../../constants/add-ons';
import useModal from '../../../hooks/use-modal';
import {principleFromString} from '../../../helper';
import useAddress from '../../../hooks/use-address';


const AddOnForm = (props: { readOnly: boolean, addOn: AddOn }) => {
    const {addOn, readOnly} = props;
    const {params} = addOn;
    const [network] = useNetwork();
    const {safe} = useSafe();
    const [t] = useTranslation();
    const [, showMessage] = useToast();
    const {doSafeCall} = useSafeCalls();
    const [, showModal] = useModal();
    const address = useAddress();

    const [paramP,] = useState('');
    const [paramU, setParamU] = useState('');
    const [paramB,] = useState('');

    const handleSubmit = () => {
        if (!address) {
            showMessage('Login first!', 'error');
            return;
        }

        if (readOnly) {
            showMessage('Only safe owners can submit transactions!', 'error');
            return;
        }

        if (params.paramU) {
            if (parseInt(paramU).toString() !== paramU) {
                showMessage(`${params.paramU}: Invalid number`, 'error');
                return;
            }
        }

        doSafeCall('submit', [
            contractPrincipalCV(addOn.executors[network]!.active),
            contractPrincipalCV(safe.address, safe.name),
            contractPrincipalCV(DEPLOYER[network], 'ft-none'),
            contractPrincipalCV(DEPLOYER[network], 'nft-none'),
            paramP ? someCV(principleFromString(paramP)) : noneCV(),
            paramU ? someCV(uintCV(paramU)) : noneCV(),
            paramB ? someCV(bufferCVFromString(paramB)) : noneCV()
        ]).then(data => {
            showModal({
                body: <CommonTxFeedbackDialog
                    txId={data.txId}
                    title={addOn.name}
                    description={t('Your transaction has been submitted.')}
                    requiresConfirmation={true}
                />
            });
        })
    }

    return <>
        <Box sx={{maxWidth: '500px'}}>
            {params.paramU && (<Box sx={{mb: '20px'}}>
                    <TextField fullWidth
                               label={params.paramU}
                               value={paramU}
                               inputProps={{
                                   type: 'number',
                                   step: '1',
                                   pattern: '^[-\\d]\\d*$'
                               }}
                               onChange={(e) => {
                                   setParamU(e.target.value);
                               }}
                    />
                </Box>
            )}
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    </>
}

const AddOnsList = (props: { readOnly: boolean }) => {
    const [t] = useTranslation();
    const {safe} = useSafe();
    const [network] = useNetwork();
    const [, showMessage] = useToast();
    const navigate = useNavigate();

    return <>
        <SectionHeader title={t('Add-ons')} icon={<ExtensionIcon/>}/>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            <Box sx={{
                p: '20px 20px 0 20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                maxWidth: '660px',
                gap: '20px'
            }}>
                {addOns.map(a => {
                    return <Box key={a.id}
                                sx={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    if (a.executors[network] === null) {
                                        showMessage(`"${a.name}" is not available on ${network}`, 'error');
                                        return;
                                    }

                                    navigate(`/safe/${safe.fullAddress}/add-ons-${a.id}`).then();
                                }}>
                        <ThemedBox sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <Box component="img" src={a.logo} sx={{width: '120px', height: '120px', mb: '12px'}}></Box>
                            <Box sx={{}}>{a.name}</Box>
                        </ThemedBox>
                    </Box>
                })}
            </Box>
        </Box>
    </>
}

const AddOnDetail = (props: { readOnly: boolean, addOn: AddOn }) => {
    const {addOn} = props;
    const icon = <img alt={addOn.name} src={addOn.logo} style={{width: '28px', height: '28px', marginRight: '12px'}}/>
    return <>
        <SectionHeader title={addOn.name} icon={icon}/>
        <AddOnForm {...props} />
    </>
}

const AddOns = (props: { readOnly: boolean }) => {
    const params = useParams();

    if (params.section === 'add-ons') {
        return <AddOnsList {...props}/>
    }

    const addOn = addOns.find(a => a.id === params.section.replace('add-ons-', ''));
    if (addOn) {
        return <AddOnDetail {...props} addOn={addOn}/>;
    }

    return null;
}

export default AddOns;

import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {bufferCVFromString, contractPrincipalCV, noneCV, someCV, uintCV} from 'micro-stacks/clarity';
import {DEPLOYER} from '@trustmachines/multisafe-contracts';

import CommonTxFeedbackDialog from './dialogs/common-feedback';
import useNetwork from '../../../hooks/use-network';
import useSafe from '../../../hooks/use-safe';
import useTranslation from '../../../hooks/use-translation';
import useToast from '../../../hooks/use-toast';
import useSafeCalls from '../../../hooks/use-safe-call';
import useModal from '../../../hooks/use-modal';
import useAddress from '../../../hooks/use-address';
import {principleFromString} from '../../../helper';
import {AddOn} from '../../../constants/add-ons';


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


export default AddOnForm;

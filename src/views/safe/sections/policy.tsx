import React, {useState} from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {DEPLOYER} from '@trustmachines/multisafe-contracts';
import {useConnect} from '@stacks/connect-react';
import {contractPrincipalCV, noneCV, someCV, uintCV} from '@stacks/transactions';

import useTranslation from '../../../hooks/use-translation';
import useNetwork from '../../../hooks/use-network';
import useSafe from '../../../hooks/use-safe';
import useModal from '../../../hooks/use-modal';
import SectionHeader from '../components/section-header';
import CommonTxFeedbackDialog from '../components/dialogs/common-feedback';

const Policy = (props: { readOnly: boolean }) => {
    const {readOnly} = props;

    const [safe,] = useSafe();
    const [t] = useTranslation();
    const [network, stacksNetwork] = useNetwork();
    const [, showModal] = useModal()
    const {doContractCall} = useConnect();
    const [threshold, setThreshold] = useState<number>(safe.threshold);

    const handleChange = (event: SelectChangeEvent) => {
        setThreshold(Number(event.target.value));
    };

    const handleSubmit = () => {
        doContractCall({
            network: stacksNetwork,
            contractAddress: safe.address,
            contractName: safe.name,
            functionName: 'submit',
            functionArgs: [
                contractPrincipalCV(DEPLOYER[network], 'set-threshold'),
                contractPrincipalCV(safe.address, safe.name),
                contractPrincipalCV(DEPLOYER[network], 'ft-none'),
                contractPrincipalCV(DEPLOYER[network], 'nft-none'),
                noneCV(),
                someCV(uintCV(threshold)),
                noneCV(),
            ],
            onFinish: (data) => {
                showModal(<CommonTxFeedbackDialog
                    txId={data.txId}
                    title={t('Confirmation Threshold')}
                    description={t('A new transaction submitted to update confirmation threshold.')}
                    requiresConfirmation
                />);
            }
        }).then()
    }

    const options = [...Array(safe.owners.length).keys()].map(x => x + 1);

    return <>
        <SectionHeader title={t('Policy')} icon={<FactCheckIcon/>}/>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            <Typography sx={{mb: '20px'}}>Confirmation Threshold</Typography>
            <Box sx={{mb: '20px'}}>
                <Select
                    value={threshold.toString()}
                    onChange={handleChange}
                    sx={{width: '120px'}}
                    disabled={readOnly}
                >
                    {options.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
                </Select>
            </Box>
            {!readOnly && <Button variant="contained" disabled={safe.threshold === threshold}
                                  onClick={handleSubmit}>{t('Update')}</Button>}
        </Box>
    </>
}

export default Policy;
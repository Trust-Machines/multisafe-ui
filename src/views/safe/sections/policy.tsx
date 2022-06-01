import React, {useState} from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

import useTranslation from '../../../hooks/use-translation';
import useSafe from '../../../hooks/use-safe';
import useModal from '../../../hooks/use-modal';
import useSafeCalls from '../../../hooks/use-safe-call';
import usePendingTxs from '../../../hooks/use-pending-txs';
import SectionHeader from '../components/section-header';
import CommonTxFeedbackDialog from '../components/dialogs/common-feedback';
import {detectTransactionType} from '../../../helper';

const Policy = (props: { readOnly: boolean }) => {
    const {readOnly} = props;

    const [safe,] = useSafe();
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const {safeSetThresholdCall} = useSafeCalls();
    const [pendingTxs] = usePendingTxs();
    const [threshold, setThreshold] = useState<number>(safe.threshold);

    const handleChange = (event: SelectChangeEvent) => {
        setThreshold(Number(event.target.value));
    };

    const handleSubmit = () => {
        safeSetThresholdCall(threshold).then(data => {
            showModal({
                body: <CommonTxFeedbackDialog
                    txId={data.txId}
                    title={t('Confirmation Threshold')}
                    description={t('A new transaction submitted to update confirmation threshold.')}
                    requiresConfirmation
                />
            });
        });
    }

    const options = [...Array(safe.owners.length).keys()].map(x => x + 1);
    const pendingTx = pendingTxs.find(x => x.fn === 'submit' && detectTransactionType(x.executor) === 'set-threshold') !== undefined;

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
            {!readOnly && (
                <Button variant="contained" disabled={safe.threshold === threshold || pendingTx}
                        onClick={handleSubmit}>
                    {pendingTx && <CircularProgress size={16} color="info" sx={{mr: '8px'}}/>}
                    {t('Update')}
                </Button>
            )}
        </Box>
    </>
}

export default Policy;
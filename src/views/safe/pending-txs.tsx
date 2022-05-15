import useAddress from '../../hooks/use-address';
import {useEffect} from 'react';
import usePendingTxs from '../../hooks/use-pending-txs';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import useTranslation from '../../hooks/use-translation';
import {PendingTx} from '../../store/pending-txs';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {makeTxUrl} from '../../api/helper';
import useNetwork from '../../hooks/use-network';
import {detectTransactionType} from '../../helper';

const PendingTxRow = (props: { tx: PendingTx }) => {
    const {tx} = props;
    const [t] = useTranslation();
    const [network] = useNetwork();

    let msg = '';

    switch (tx.fn) {
        case 'revoke':
            msg = t('Revoke #{{t}}', {t: tx.txId});
            break;
        case 'confirm':
            msg = t('Confirm #{{t}}', {t: tx.txId});
            break;
        case 'submit':
            const txType = detectTransactionType(tx.executor);
            switch (txType) {
                case 'add-owner':
                    msg = t('Add new owner');
                    break;
                case 'remove-owner':
                    msg = t('Remove owner');
                    break;
                case 'set-threshold':
                    msg = t('Update confirmation threshold');
                    break;
                case 'transfer-stx':
                    msg = t('Transfer STX');
                    break;
                case 'transfer-sip-009':
                    msg = t('Transfer NFT');
                    break;
                case 'transfer-sip-010':
                    msg = t('Transfer Token');
                    break;
            }
            break;
    }

    return <Box sx={{
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
    }}>
        <>{msg}</>
        <Box component="a"
             sx={{
                 color: grey[200],
                 ml: '6px',
                 display: 'inline-flex',
                 alignItems: 'center',
                 ':hover': {
                     color: grey[400],
                 }
             }} target="_blank" rel="noreferrer"
             href={makeTxUrl(tx.txHash, network)}>
            <OpenInNewIcon sx={{fontSize: '14px'}}/>
        </Box>
    </Box>;
}

const PendingTxs = () => {
    const address = useAddress();

    const [txs, syncTxs] = usePendingTxs();
    const [t] = useTranslation();

    useEffect(() => {
        syncTxs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (!address || txs.length === 0) {
        return null;
    }

    const msg = txs.length === 1 ? t('1 pending blockchain interaction') : t('{{n}} pending blockchain interactions', {n: txs.length});

    return <Box sx={{
        position: 'absolute',
        width: '260px',
        height: '30px',
        color: grey[200],
        bottom: '10px',
        right: '10px',
        zIndex: '2',
        userSelect: 'none'
    }}>
        <Box sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '36px',
            background: grey[800],
            borderRadius: '6px',
            p: '0 6px',
        }}>
            {txs.map(t => <PendingTxRow tx={t} key={t.txHash}/>)}
        </Box>
        <Box sx={{
            fontSize: '90%',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            height: '100%',
            p: '0 6px',
            borderRadius: '6px',
            background: grey[800],
            ':hover': {
                background: grey[700],
            }
        }}>
            <CircularProgress size={16} color="info" sx={{mr: '8px'}}/> {msg}
        </Box>
    </Box>;
}


export default PendingTxs;
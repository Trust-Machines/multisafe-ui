import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import {SxProps} from '@mui/system';
import {grey} from '@mui/material/colors';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CircularProgress from '@mui/material/CircularProgress';
import {useTheme} from '@mui/material';

import useAddress from '../../../hooks/use-address';
import usePendingTxs from '../../../hooks/use-pending-txs';
import useNetwork from '../../../hooks/use-network';
import useTranslation from '../../../hooks/use-translation';
import {PendingTx, PendingTxsState} from '../../../store/pending-txs';
import {makeTxUrl} from '../../../api/helper';
import {detectTransactionType} from '../../../helper';


const PendingTxRow = (props: { tx: PendingTx, sx?: SxProps }) => {
    const {tx} = props;
    const [t] = useTranslation();
    const theme = useTheme();
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
        ...props.sx
    }}>
        <>{msg}</>
        <Box component="a"
             sx={{
                 color: theme.palette.mode === 'light' ? grey[200] : grey[600],
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
    const theme = useTheme();
    const [detail, setDetail] = useState<boolean>(false);

    const txsRef = useRef<PendingTxsState>([]);
    useEffect(() => {
        txsRef.current = txs;
    }, [txs]);

    useEffect(() => {
        syncTxs();

        const int = setInterval(() => {
            if (txsRef.current.length > 0) {
                syncTxs();
            }
        }, 5000);

        return () => clearInterval(int);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (!address || txs.length === 0) {
        return null;
    }

    const msg = txs.length === 1 ? t('1 pending blockchain interaction') : t('{{n}} pending blockchain interactions', {n: txs.length});

    return <Box sx={{
        position: 'fixed',
        width: '270px',
        height: '30px',
        color: theme.palette.mode === 'light' ? grey[200] : grey[700],
        bottom: '10px',
        right: '10px',
        zIndex: '2',
        userSelect: 'none'
    }}>
        {detail && (
            <Box sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '36px',
                background: theme.palette.mode === 'light' ? grey[800] : grey[200],
                borderRadius: '6px',
                p: '0 6px',
            }}>
                {txs.map((t, i) => <PendingTxRow tx={t} key={t.txHash} sx={{
                    borderBottom: i !== txs.length - 1 ? `1px dotted ${grey[400]}` : null,
                }}/>)}
            </Box>
        )}
        <Box
            onClick={() => {
                setDetail(!detail);
            }}
            sx={{
                fontSize: '90%',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                height: '100%',
                p: '0 6px',
                borderRadius: '6px',
                background: theme.palette.mode === 'light' ? grey[800] : grey[200],
                ':hover': {
                    background: theme.palette.mode === 'light' ? grey[700] : grey[400]
                }
            }}>
            <CircularProgress size={16} color="info" sx={{mr: '8px'}}/> {msg}
        </Box>
    </Box>;
}


export default PendingTxs;
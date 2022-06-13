import {Button} from '@mui/material';
import useSafeCalls from '../../../hooks/use-safe-call';

const DepositBtc = () => {
    const {safeEnableMagicBridgeCall} = useSafeCalls();
    return <>
        <Button variant="contained" sx={{ml: '6px'}} onClick={safeEnableMagicBridgeCall}>Enable Magic Bridge</Button>
    </>
}

export default DepositBtc;

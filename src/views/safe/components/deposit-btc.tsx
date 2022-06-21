import {Button} from '@mui/material';
import useSafeCalls from '../../../hooks/use-safe-call';

const DepositBtc = () => {
    const {safeMagicBridgeEnableCall} = useSafeCalls();
    return <>
        <Button variant="contained" sx={{ml: '6px'}} onClick={safeMagicBridgeEnableCall}>Enable Magic Bridge</Button>
    </>
}

export default DepositBtc;

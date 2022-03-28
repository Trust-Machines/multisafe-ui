import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useMainBreakPoint = (): [boolean] => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    return [isMd];
}

export default useMainBreakPoint;
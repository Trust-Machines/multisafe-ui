import {useAtom} from 'jotai';
import {appThemeAtom} from '../store';
import {PaletteMode} from '@mui/material';

const useAppTheme = (): [PaletteMode, () => void] => {
    const [appTheme, setAppTheme] = useAtom(appThemeAtom);

    const toggleAppTheme = () => {
        setAppTheme(appTheme === 'dark' ? 'light' : 'dark');
    }

    return [appTheme, toggleAppTheme];
}

export default useAppTheme;
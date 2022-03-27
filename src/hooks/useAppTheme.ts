import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {appThemeAtom} from '../store';
import {PaletteMode} from '@mui/material';

const useAppTheme = (): [PaletteMode, () => void] => {
    const [appTheme, setAppTheme] = useAtom(appThemeAtom);

    useEffect(() => {
        document.body.style.background = appTheme === 'dark' ? '#3b3b3b' : '#ffffff';
    }, [appTheme]);

    const toggleAppTheme = () => {
        const t = appTheme === 'dark' ? 'light' : 'dark';
        setAppTheme(t);
        localStorage.setItem('app_theme', t)
    }

    return [appTheme, toggleAppTheme];
}

export default useAppTheme;
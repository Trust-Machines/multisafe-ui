import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {uiAtom} from '../store';
import {PaletteMode} from '@mui/material';

const useAppTheme = (): [PaletteMode, () => void] => {
    const [ui, setUi] = useAtom(uiAtom);

    useEffect(() => {
        document.body.style.background = ui.theme === 'dark' ? '#3b3b3b' : '#ffffff';
    }, [ui.theme]);

    const toggleAppTheme = () => {
        const theme = ui.theme === 'dark' ? 'light' : 'dark';
        setUi({...ui, theme});
        localStorage.setItem('app_theme', theme)
    }

    return [ui.theme, toggleAppTheme];
}

export default useAppTheme;
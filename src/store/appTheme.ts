import {atom} from 'jotai';
import {PaletteMode} from '@mui/material';


const initial = (): PaletteMode => {
    const s = localStorage.getItem('app_theme');
    if (s && ['dark', 'ligth'].includes(s)) {
        return s as PaletteMode
    }
    return 'light'
}

export const appThemeAtom = atom<PaletteMode>(initial());

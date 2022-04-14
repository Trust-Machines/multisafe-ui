import {atom} from 'jotai';
import {PaletteMode} from '@mui/material';

export type ToastType = null | 'error' | 'warning' | 'info' | 'success';

export interface Toast {
    message: null | string,
    type: ToastType
}

export interface UIState {
    theme: PaletteMode
    toast: Toast
}

const initialTheme = (): PaletteMode => {
    const s = localStorage.getItem('app_theme');
    if (s && ['dark', 'ligth'].includes(s)) {
        return s as PaletteMode
    }
    return 'light'
}

export const uiAtom = atom<UIState>({
    theme: initialTheme(),
    toast: {
        message: null,
        type: null
    }
});
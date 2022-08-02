import {atom} from 'jotai';
import {PaletteMode} from '@mui/material';

export type ToastType = null | 'error' | 'warning' | 'info' | 'success';

export interface Toast {
    message: null | string,
    type: ToastType
}

export type Modal = {body: JSX.Element, fullScreen?: boolean} | null;

const initialTheme = (): PaletteMode => {
    const s = localStorage.getItem('app_theme');
    if (s && ['dark', 'ligth'].includes(s)) {
        return s as PaletteMode
    }
    return 'light'
}

export const themeAtom = atom<PaletteMode>(initialTheme());
export const toastAtom = atom<Toast>({message: null, type: null});
export const modalAtom = atom<Modal>(null);

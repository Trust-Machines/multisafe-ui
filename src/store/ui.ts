import {atom} from 'jotai';

export type ToastType = null | 'error' | 'warning' | 'info' | 'success';

export interface Toast {
    message: null | string,
    type: null | 'error' | 'warning' | 'info' | 'success'
}

export interface UIState {
    toast: Toast
}

export const uiAtom = atom<UIState>({
    toast: {
        message: null,
        type: null
    }
});
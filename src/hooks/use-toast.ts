import {useRef} from 'react';
import {useAtom} from 'jotai';
import {uiAtom} from '../store';
import {Toast, ToastType} from '../store/ui';

const useToast = (): [Toast, (message: string, type: ToastType, timeout?: number) => void, () => void] => {
    const [ui, setUi] = useAtom(uiAtom);
    let timer = useRef<any>();

    const hideMessage = () => {
        setUi({...ui, toast: {message: null, type: null}});
    }

    const showMessage = (message: string, type: ToastType, timeout: number = 5000) => {
        clearTimeout(timer.current);

        setUi({...ui, toast: {message, type}});

        timer.current = setTimeout(() => {
            hideMessage();
        }, timeout);
    };

    return [ui.toast, showMessage, hideMessage]
}

export default useToast;
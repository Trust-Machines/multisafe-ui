import {useAtom} from 'jotai';
import {uiAtom} from '../store';
import {Modal} from '../store/ui';

const useModal = (): [Modal, (modal: Modal) => void] => {
    const [ui, setUi] = useAtom(uiAtom);

    const showModal = (modal: Modal) => {
        setUi({...ui, modal});
    }

    return [ui.modal, showModal];
}

export default useModal;
import {useAtom} from 'jotai';
import {modalAtom} from '../store';
import {Modal} from '../store/ui';

const useModal = (): [Modal, (modal: Modal) => void] => {
    const [modal, setModal] = useAtom(modalAtom);

    const showModal = (modal: Modal) => {
        setModal(modal);
    }

    return [modal, showModal];
}

export default useModal;
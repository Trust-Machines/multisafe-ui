import {_t} from '../i18n';

const useTranslation = (): [(k: string, args?: {}) => string] => {
    const t = (k: string, args = {}) => {
        return _t(k, args);
    }
    return [t];
}

export default useTranslation;
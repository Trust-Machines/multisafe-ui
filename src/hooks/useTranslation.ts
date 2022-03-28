const useTranslation = (): [(k: string) => string] => {

    const t = (k: string) => {
        return k;
    }
    return [t];
}

export default useTranslation;
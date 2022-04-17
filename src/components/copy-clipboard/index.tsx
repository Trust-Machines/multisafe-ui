import React, {useMemo, useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import useTranslation from '../../hooks/use-translation';

const CopyToClipboard = (props: { children: JSX.Element, copy: string }) => {
    const [message, setMessage] = useState(false)
    const [t] = useTranslation();

    const clicked = async () => {
        await navigator.clipboard?.writeText(props.copy).then();
        setMessage(true);
        setTimeout(() => {
            setMessage(false);
        }, 1000);
    }

    const clonedChildren = useMemo(() => {
        return React.cloneElement(props.children, {
            onClick: clicked,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children])

    if (message) {
        return <Tooltip title={t('Copied')}>{clonedChildren}</Tooltip>;
    }

    return clonedChildren;
}

export default CopyToClipboard;
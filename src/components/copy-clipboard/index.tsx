import React, {useMemo, useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import useTranslation from '../../hooks/use-translation';

const CopyToClipboard = (props: { children: JSX.Element, copy: string }) => {
    const [open, setOpen] = useState(false)
    const [t] = useTranslation();

    const clicked = async () => {
        await navigator.clipboard?.writeText(props.copy).then();
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    }

    const clonedChildren = useMemo(() => {
        return React.cloneElement(props.children, {
            onClick: clicked,
            style: {cursor: 'pointer'}
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children])

    return <Tooltip
        PopperProps={{
            disablePortal: true,
        }}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={t('Copied')}
    >{clonedChildren}</Tooltip>;
}

export default CopyToClipboard;
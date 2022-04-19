import React, {useMemo} from 'react';

const {createIcon} = require('@download/blockies');

const WalletIcon = (props: { address: string }) => {
    const icon = useMemo(() => {
        return createIcon({
            seed: props.address,
            color: '#1f2123',
            bgcolor: '#ebab40',
            spotcolor: '#5240f4',
            size: 10,
        }).toDataURL()
    }, [props.address]);

    return <img style={{borderRadius: '50%'}} src={icon} alt={props.address}/>;
}

export default WalletIcon;
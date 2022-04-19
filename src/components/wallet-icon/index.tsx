import React, {useMemo} from 'react';

const {createIcon} = require('@download/blockies');

const WalletIcon = (props: { address: string }) => {
    const icon = useMemo(() => {
        return createIcon({
            seed: props.address,
            color: '#000',
            bgcolor: '#aaa',
            size: 10
        }).toDataURL()
    }, [props.address]);

    return <img style={{borderRadius: '50%'}} src={icon} alt={props.address}/>;
}

export default WalletIcon;
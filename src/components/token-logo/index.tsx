import {useRef} from 'react';
import Box from '@mui/material/Box';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

const TokenLogo = (props: { address: string, sx?: SxProps<Theme> }) => {
    const imgRef = useRef<HTMLImageElement>();

    return <Box ref={imgRef} component="img" src={`/tokens/${props.address}.svg`} sx={{
        width: '24px',
        height: '24px',
        ...props.sx
    }} onError={() => {
        imgRef.current!.src = '/tokens/unknown.svg';
    }}/>
}

export default TokenLogo;
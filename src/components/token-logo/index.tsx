import {useRef} from 'react';
import Box from '@mui/material/Box';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

const TokenLogo = (props: { address: string, extension?: string, sx?: SxProps<Theme> }) => {
    const imgRef = useRef<HTMLImageElement>();

    return <Box ref={imgRef} component="img" src={`/tokens/${props.address}.${props.extension || 'svg'}`} sx={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        ...props.sx
    }} onError={() => {
        imgRef.current!.src = '/tokens/unknown.svg';
    }}/>
}

export default TokenLogo;
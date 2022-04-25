import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import tokens from "../../../constants/tokens.json";
import {Box} from '@mui/material';

const options = tokens.map(x => ({label: x.symbol, ...{x}}));

const TokenSelect = () => {


    return <Autocomplete
        disablePortal
        options={options}
        sx={{width: 300}}
        renderInput={(params) => {
            return <TextField {...params} label="Movie" InputProps={{
                ...params.InputProps,
                disabled: true,
                startAdornment: <InputAdornment position="start">
                    <Box component="img" src="/tokens/STX.svg" sx={{width: '20px', height: '20px'}} />
                </InputAdornment>,
            }}/>
        }}
    />
}

export default TokenSelect;
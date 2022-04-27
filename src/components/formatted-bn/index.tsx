import BigNumber from 'bignumber.js';
import {formatUnits} from '../../helper';

const FormattedBN = (props: { bn: BigNumber | string, decimals: number }) => {
    const formatted = formatUnits(props.bn, props.decimals);

    return <span>{formatted.toFormat().toString()}</span>;
}

export default FormattedBN;
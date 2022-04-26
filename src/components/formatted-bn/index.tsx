import BigNumber from 'bignumber.js';

const FormattedBN = (props: { bn: BigNumber | string, decimals: number }) => {
    const bn = typeof props.bn === 'string' ? new BigNumber(props.bn) : props.bn;
    const formatted = bn.dividedBy(10 ** props.decimals);

    return <span>{formatted.toFormat().toString()}</span>;
}

export default FormattedBN;
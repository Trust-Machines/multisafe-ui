import BigNumber from 'bignumber.js';

const FormattedBN = (props: { bn:BigNumber, decimals: number }) => {
    const formatted = props.bn.dividedBy(10 ** props.decimals);

    return <span>{formatted.toFormat().toString()}</span>;
}

export default FormattedBN;
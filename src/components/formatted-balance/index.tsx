import BigNumber from 'bignumber.js';

const FormattedBalance = (props: { value: string | number, decimals: number }) => {
    const bn = new BigNumber(props.value);
    const formatted = bn.dividedBy(10 ** props.decimals);

    return <span>{formatted.toString()}</span>;
}

export default FormattedBalance;
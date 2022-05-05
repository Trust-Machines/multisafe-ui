import {formatUnits, parseUnits, checkDecimalAmount, checkAmount} from './';


test('1 parseUnits', () => {
    expect(parseUnits("1.256", 6)).toMatchSnapshot();
    expect(parseUnits("120000", 6)).toMatchSnapshot();
    expect(parseUnits("1.256", 8)).toMatchSnapshot();
    expect(parseUnits("11", 0)).toMatchSnapshot();
});

test('2 formatUnits', () => {
    expect(formatUnits("1256000", 6)).toMatchSnapshot();
    expect(formatUnits("120000000000", 6)).toMatchSnapshot();
    expect(formatUnits("125600000", 8)).toMatchSnapshot();
    expect(formatUnits("11", 0)).toMatchSnapshot();
});

test('3 checkDecimalAmount', () => {
    expect(checkDecimalAmount(" ")).toMatchSnapshot();
    expect(checkDecimalAmount("0.1")).toMatchSnapshot();
    expect(checkDecimalAmount("43")).toMatchSnapshot();
    expect(checkDecimalAmount("100.23")).toMatchSnapshot();
    expect(checkDecimalAmount("100.123456")).toMatchSnapshot();
    expect(checkDecimalAmount("100.1234567")).toMatchSnapshot();
});

test('4 checkAmount', () => {
    expect(checkAmount("100")).toMatchSnapshot();
    expect(checkAmount("1.1")).toMatchSnapshot();
});
import {formatUnits, parseUnits} from './';



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


import {render} from '@testing-library/react';

import CurrencyField from './index';

test('1 No decimal', () => {
    const rendered = render(<CurrencyField fieldProps={{}} isDecimal={false} symbol="STX" onChange={()=>{}}/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Decimal', () => {
    const rendered = render(<CurrencyField fieldProps={{}} isDecimal={true} symbol="STX" onChange={()=>{}}/>);
    expect(rendered.container).toMatchSnapshot()
});

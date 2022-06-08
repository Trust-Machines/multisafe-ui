import {render} from '@testing-library/react';

import CurrencyField from './index';

test('1 No decimal', () => {
    const view = render(<CurrencyField fieldProps={{}} isDecimal={false} symbol="STX" onChange={()=>{}}/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Decimal', () => {
    const view = render(<CurrencyField fieldProps={{}} isDecimal={true} symbol="STX" onChange={()=>{}}/>);
    expect(view.container).toMatchSnapshot()
});

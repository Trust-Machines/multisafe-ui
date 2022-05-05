import {render} from '@testing-library/react';

import FormattedBN from './index';

test('1 Render with 6 decimals', () => {
    const rendered = render(<FormattedBN bn="1137100" decimals={6}/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Render with 8 decimals', () => {
    const rendered = render(<FormattedBN bn="1100090000" decimals={8}/>);
    expect(rendered.container).toMatchSnapshot()
});


import {render} from '@testing-library/react';

import NetworkLabel from './index';

test('1 Testnet', () => {
    const rendered = render(<NetworkLabel network="testnet"/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Mainnet', () => {
    const rendered = render(<NetworkLabel network="mainnet"/>);
    expect(rendered.container).toMatchSnapshot()
});


import {render} from '@testing-library/react';

import NetworkLabel from './index';

test('1 Testnet', () => {
    const view = render(<NetworkLabel network="testnet"/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Mainnet', () => {
    const view = render(<NetworkLabel network="mainnet"/>);
    expect(view.container).toMatchSnapshot()
});


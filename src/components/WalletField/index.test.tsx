import {render} from '@testing-library/react';

import WalletField from './index';

test('1 Default render', () => {
    const rendered = render(<WalletField inputProps={{label: 'Input label', value: 'Input value'}}/>);
    expect(rendered.container).toMatchSnapshot()
});
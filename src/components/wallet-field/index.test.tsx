import {render} from '@testing-library/react';

import WalletField from './index';

test('1 Default render', () => {
    const view = render(<WalletField inputProps={{label: 'Input label', value: 'Input value'}}/>);
    expect(view.container).toMatchSnapshot()
});
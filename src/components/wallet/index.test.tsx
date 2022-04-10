import {render} from '@testing-library/react';

import Wallet from './index';

test('1 Default render', () => {
    const rendered = render(<Wallet address="SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7" sx={{background: 'red'}}/>);
    expect(rendered.container).toMatchSnapshot()
});
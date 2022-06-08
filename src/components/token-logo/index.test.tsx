import {render} from '@testing-library/react';

import TokenLogo from './index';

test('1 Default render', () => {
    const view = render(<TokenLogo address="0x234234234234" />);
    expect(view.container).toMatchSnapshot()
});


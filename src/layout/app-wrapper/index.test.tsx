import {render} from '@testing-library/react';

import AppWrapper from './index';

test('1 Default render', () => {
    const view = render(<AppWrapper><span>children</span></AppWrapper>);
    expect(view.container).toMatchSnapshot()
});
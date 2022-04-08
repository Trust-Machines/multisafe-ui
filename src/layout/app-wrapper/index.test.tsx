import {render} from '@testing-library/react';

import AppWrapper from './index';

test('1 Default render', () => {
    const rendered = render(<AppWrapper><span>children</span></AppWrapper>);
    expect(rendered.container).toMatchSnapshot()
});
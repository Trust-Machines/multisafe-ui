import {render} from '@testing-library/react';

import Navbar from './index';

test('1 Default render', () => {
    const rendered = render(<Navbar/>);
    expect(rendered.container).toMatchSnapshot()
});


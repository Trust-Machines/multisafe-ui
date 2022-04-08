import {render} from '@testing-library/react';

import AppMenu from './index';

test('1 Default render', () => {
    const rendered = render(<AppMenu><span>children</span></AppMenu>);
    expect(rendered.container).toMatchSnapshot()
});
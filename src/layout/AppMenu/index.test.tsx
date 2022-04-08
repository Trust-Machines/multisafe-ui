import {render} from '@testing-library/react';

import AppMenu from './index';

test('render test', () => {
    const rendered = render(<AppMenu><span>children</span></AppMenu>);
    expect(rendered.container).toMatchSnapshot()
});
import {render} from '@testing-library/react';

import AppMenu from './index';

test('1 Default render', () => {
    const view = render(<AppMenu><span>children</span></AppMenu>);
    expect(view.container).toMatchSnapshot()
});
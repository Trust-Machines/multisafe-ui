import {render} from '@testing-library/react';

import AppContent from './index';

test('render test', () => {
    const rendered = render(<AppContent><span>children</span></AppContent>);
    expect(rendered.container).toMatchSnapshot();
});
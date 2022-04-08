import {render} from '@testing-library/react';

import AppContent from './index';

test('1 Default render', () => {
    const rendered = render(<AppContent><span>children</span></AppContent>);
    expect(rendered.container).toMatchSnapshot();
});
import {render} from '@testing-library/react';

import AppContent from './index';

test('1 Default render', () => {
    const view = render(<AppContent><span>children</span></AppContent>);
    expect(view.container).toMatchSnapshot();
});
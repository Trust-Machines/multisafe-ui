import {render} from '@testing-library/react';

import ThemedBox from './index';

test('1 Default render', () => {
    const view = render(<ThemedBox><span>children</span></ThemedBox>);
    expect(view.container).toMatchSnapshot()
});

test('2 Render with custom style', () => {
    const view = render(<ThemedBox sx={{background: 'red'}}><span>children</span></ThemedBox>);
    expect(view.container).toMatchSnapshot()
});


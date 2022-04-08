import {render} from '@testing-library/react';

import ThemedBox from './index';

test('1 Default render', () => {
    const rendered = render(<ThemedBox><span>children</span></ThemedBox>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Render with custom style', () => {
    const rendered = render(<ThemedBox sx={{background: 'red'}}><span>children</span></ThemedBox>);
    expect(rendered.container).toMatchSnapshot()
});


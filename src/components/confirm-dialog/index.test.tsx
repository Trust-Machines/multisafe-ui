import {render} from '@testing-library/react';

import ConfirmDialog from './index';

test('1 Default render', () => {
    const rendered = render(<ConfirmDialog onConfirm={()=>{}} />);
    expect(rendered.container).toMatchSnapshot()
});


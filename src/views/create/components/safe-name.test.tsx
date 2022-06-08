import {render} from '@testing-library/react';

import SafeName from './safe-name';

test('1 Default render', () => {
    const view = render(<SafeName name="my-safe-2" onSubmit={()=>{}}/>);
    expect(view.container).toMatchSnapshot()
});
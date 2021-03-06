import {renderWithRouter} from '../../../helper/test-helper';

import Create from './create';

import useSafes from '../../../hooks/use-safes';
jest.mock( '../../../hooks/use-safes');

test('1 Render with empty safe list', () => {
    (useSafes as jest.Mock).mockReturnValue([{loading: false, list: []}]);
    const view = renderWithRouter(<Create/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Render with not empty safe list', () => {
    (useSafes as jest.Mock).mockReturnValue([{loading: false, list: ['foo']}]);
    const view = renderWithRouter(<Create/>);
    expect(view.container).toMatchSnapshot()
});

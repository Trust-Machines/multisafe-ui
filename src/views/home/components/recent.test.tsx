import {renderWithRouter} from '../../../helper/test-helper';

import Recent from './recent';

import useSafes from '../../../hooks/use-safes';
jest.mock( '../../../hooks/use-safes');

test('1 Render with empty safe list', () => {
    (useSafes as jest.Mock).mockReturnValue([{loading: false, list: []}]);
    const rendered = renderWithRouter(<Recent/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Render with not empty safe list', () => {
    (useSafes as jest.Mock).mockReturnValue([{loading: false, list: ['foo']}]);
    const rendered = renderWithRouter(<Recent/>);
    expect(rendered.container).toMatchSnapshot()
});

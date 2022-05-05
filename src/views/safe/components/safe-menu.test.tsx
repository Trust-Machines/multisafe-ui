import SafeMenu  from './safe-menu';
import {renderWithRouter} from '../../../helper/test-helper';
import useSafe from '../../../hooks/use-safe';

jest.mock('../../../hooks/use-safe');

test('1 Render', () => {
    (useSafe as jest.Mock).mockReturnValue([{fullAddress: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7.my-safe'}])
    const rendered = renderWithRouter(<SafeMenu section="nft"/>);
    expect(rendered.container).toMatchSnapshot()
});


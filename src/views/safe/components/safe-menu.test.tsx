import SafeMenu from './safe-menu';
import {renderWithRouter} from '../../../helper/test-helper';
import useSafe from '../../../hooks/use-safe';
import useAddress from '../../../hooks/use-address';

jest.mock('../../../hooks/use-safe');
jest.mock('../../../hooks/use-address');

test('1 Render', () => {
    (useSafe as jest.Mock).mockReturnValue([{fullAddress: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7.my-safe'}])
    const rendered = renderWithRouter(<SafeMenu section="nft"/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Render with owner', () => {
    (useSafe as jest.Mock).mockReturnValue([{
        fullAddress: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7.my-safe',
        owners: [
            'SP2N7SK0W83NJSZHFH8HH31ZT3DXJG7NFE5VYT9SJ',
            'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN',
            'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7'
        ]
    }]);

    (useAddress as jest.Mock).mockReturnValue('SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN')

    const rendered = renderWithRouter(<SafeMenu section="nft"/>);
    expect(rendered.container).toMatchSnapshot()
});


import WithdrawNft from './withdraw-nft';
import {renderWithRouter} from '../../../../helper/test-helper';
import assets from '../../../../constants/nft-list';

test('1 Default Render', () => {
    const view = renderWithRouter(<WithdrawNft asset={assets['mainnet'][1]}/>);
    expect(view.container).toMatchSnapshot();
})

test('2 Render with nftId', () => {
    const view = renderWithRouter(<WithdrawNft asset={assets['mainnet'][1]} nftId="23"/>);
    expect(view.container).toMatchSnapshot();
})
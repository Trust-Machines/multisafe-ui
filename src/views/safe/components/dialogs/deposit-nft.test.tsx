import DepositNft from './deposit-nft';
import {renderWithRouter} from '../../../../helper/test-helper';
import assets from '../../../../constants/ft-list';

test('1 Default Render', () => {
    const view = renderWithRouter(<DepositNft asset={assets['mainnet'][0]}/>);
    expect(view.container).toMatchSnapshot();
})
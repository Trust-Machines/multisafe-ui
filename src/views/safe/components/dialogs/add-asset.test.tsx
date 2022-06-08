import AddAsset from './add-asset';
import {renderWithRouter} from '../../../../helper/test-helper';

test('1 Default Render', () => {
    const view = renderWithRouter(<AddAsset type="ft"/>);
    expect(view.container).toMatchSnapshot()
});

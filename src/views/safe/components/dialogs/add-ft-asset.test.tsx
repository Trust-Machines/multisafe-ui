import AddFtAsset from './add-ft-asset';
import {renderWithRouter} from '../../../../helper/test-helper';

test('1 Default Render', () => {
    const view = renderWithRouter(<AddFtAsset/>);
    expect(view.container).toMatchSnapshot()
});

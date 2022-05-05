import AddFtAsset from './add-ft-asset';
import {renderWithRouter} from '../../../../helper/test-helper';

test('1 Default Render', () => {
    const rendered = renderWithRouter(<AddFtAsset/>);
    expect(rendered.container).toMatchSnapshot()
});

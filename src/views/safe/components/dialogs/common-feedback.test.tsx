import CommonTxFeedbackDialog from './common-feedback';
import {renderWithRouter} from '../../../../helper/test-helper';

test('1 Default Render', () => {
    const view = renderWithRouter(<CommonTxFeedbackDialog txId="0x123" title="Dialog Title"
                                                    description="Dialog description"/>);
    expect(view.container).toMatchSnapshot();
});

test('2 Requires confirmation', () => {
    const view = renderWithRouter(<CommonTxFeedbackDialog txId="0x123" title="Dialog Title"
                                                    description="Dialog description" requiresConfirmation/>);
    expect(view.container).toMatchSnapshot();
});

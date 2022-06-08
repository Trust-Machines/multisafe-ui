import CommonTxFeedbackDialog from './common-feedback';
import {render} from '@testing-library/react';

test('1 Default Render', () => {
    const view = render(<CommonTxFeedbackDialog txId="0x123" title="Dialog Title"
                                                    description="Dialog description"/>);
    expect(view.container).toMatchSnapshot();
});

test('2 Requires confirmation', () => {
    const view = render(<CommonTxFeedbackDialog txId="0x123" title="Dialog Title"
                                                    description="Dialog description" requiresConfirmation/>);
    expect(view.container).toMatchSnapshot();
});
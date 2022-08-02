import {fireEvent, screen} from '@testing-library/react';
import SafeOwners from './safe-owners';
import {renderWithRouter} from '../../../helper/test-helper';

const defProps = {
    onBack: () => {

    },
    onSubmit: () => {

    }
}
test('1 Default render', () => {
    const view = renderWithRouter(<SafeOwners {...defProps}
                                        owners={['']}
        />
    );

    expect(view.container).toMatchSnapshot();
});


test('2 Render with owners', () => {
    const view = renderWithRouter(<SafeOwners {...defProps}
                                        owners={['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP3T23YN6MBF44YNV910FD8JNMN1NZYGKG3MMZ73X']}/>);
    expect(view.container).toMatchSnapshot();
});

test('3 Render with wrong address', () => {
    const view = renderWithRouter(<SafeOwners {...defProps}
                                        owners={['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'foo']}
        />
    );
    fireEvent.click(screen.getByText('Continue'));
    expect(view.container).toMatchSnapshot();
});


test('4 Render with duplicate address', () => {
    const view = renderWithRouter(<SafeOwners {...defProps}
                                        owners={['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7']}
        />
    );
    fireEvent.click(screen.getByText('Continue'));
    expect(view.container).toMatchSnapshot();
});

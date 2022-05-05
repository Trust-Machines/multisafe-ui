import {render} from '@testing-library/react';
import {createHistory, createMemorySource, LocationProvider} from '@reach/router';
import {Connect} from '@stacks/connect-react';
import {baseAuthOptions} from '../constants';

export const renderWithRouter = (
    ui: any,
    {route = '/', history = createHistory(createMemorySource(route))} = {},
) => {
    return {
        ...render(<LocationProvider history={history}>
            <Connect authOptions={baseAuthOptions}>{ui}</Connect>
        </LocationProvider>),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history,
    }
}
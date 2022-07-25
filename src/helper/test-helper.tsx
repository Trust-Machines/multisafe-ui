import {render} from '@testing-library/react';
import {createHistory, createMemorySource, LocationProvider} from '@reach/router';
import {baseAuthOptions} from '../constants';
import {ClientProvider} from "@micro-stacks/react";

export const renderWithRouter = (
    ui: any,
    {route = '/', history = createHistory(createMemorySource(route))} = {},
) => {
    return {
        ...render(<LocationProvider history={history}>
            <ClientProvider appName={baseAuthOptions.appDetails.name} appIconUrl={baseAuthOptions.appDetails.icon}>{ui}</ClientProvider>
        </LocationProvider>),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history,
    }
}

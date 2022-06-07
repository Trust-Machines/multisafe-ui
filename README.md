# MultiSafe UI

The UI app of [MultiSafe](https://github.com/Trust-Machines/multisafe), a shared crypto wallet for managing Stacks (STX) and Bitcoin (BTC).

## Installation

This application is dockerized so the easiest way to make it run is to follow the steps below and install it with Docker.

``` docker build -t msafe-ui . ```

``` docker run -p 3000:3000 msafe-ui ```

Once the installation ends the app should be accessible on http://localhost:3000

## Development

If you like to run the app in development mode;

Install node dependencies with `yarn` or `npm install`

And run `yarn start` or `npm start` to start the app

## Testing

`yarn test` or `npm test` command runs test scripts.

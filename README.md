# Simple Weather App

by Loc Tran

See the app in action: https://weather-lt-cbc.azurewebsites.net or scan below QR

![Preview QR](https://github.com/locsoul/react-weather/raw/master/screenshots/qr.png)

## Main Libraries
This project uses `create-react-app` boiler plate with the follwing main libraries:
- ReactJS
- Redux
- Bootstrap CSS
- OpenWeather API
- Jest test runner

## Prerequisites
It is assumed that the following software and packages are installed on development environment.
- Node latest https://nodejs.org/en/download/
- NPM latest (https://www.npmjs.com/get-npm) or Yarn latest (https://yarnpkg.com/en/docs/install)

## Install packages
- From console, change directory to this project
- Run `yarn install` or `npm install`

## Start the app (development mode)
- From console, run `yarn start` or `npm start`
- The script will open system default browser or visit http://localhost:3000/ in any browser to see the app UI.

## Test
This project includes some simple test cases.
- Run `yarn test` or `npm run test` to trigger tests

## Build
For production build
- Run `yarn build` or `npm run build`

## Manual UI test
- Click on "Refresh data" button to load new data from API, it will be disabled and changed to "Refreshing..." to indicate loading. 
- However, because free weather API doesn't provide frequent weather changes, users need to wait 10-15 minutes before seeing changes to data on the UI. Alternatively, check development console (network tab) to see async calls.

## Responsive UI
This app is optimized for devices of different screen sizes. Resize your browser window to see changes in UI. Or access the preview link on your mobile device.

## Location access flow
1. The app shows a message to ask for permission access.
2. If granted, the app automatically fetches weather data.
3. If not (denied or timeout), the app shows 2 buttons:
    - Get data of previously detected location (only shown if previously detected)
    - Get data of Toronto city

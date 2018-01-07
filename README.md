# DHIS2 Meta Navigator

## About

This is a simple DHIS2 Application allowing for easier presentation & navigation (read only) of all "meta" objects in DHIS2 (Org Unit, Data Element, etc).

It uses React and D2, the dhis2 javascript library to load some data, and was created both to fulfill me needs & allow me to explore those librairies.

## Development

To use the DHIS2 Play instance, you need to make sure it accepts calls from http://localhost:3000 - this can be set [here](https://play.dhis2.org/demo/dhis-web-settings/#/access).

Then:

    yarn start

This should show a very basic page then load data elements from the demo instance.

## Deploy

- yarn build
- zip the content of the build folder & upload to DHIS2

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
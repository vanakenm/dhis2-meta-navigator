# DHIS2 Meta Navigator

## About

This is a simple DHIS2 Application allowing for easier presentation, search & navigation (read only) of "meta" objects in DHIS2:

* Org Units
* Org Unit Levels
* Org Unit Groups
* Org Unit Group Sets
* Data Elements
* Data Element Groups
* Data Element Group Sets
* Data Sets
* Categories
* Category Combos
* Category Option Combos
* Category Option Groups
* Category Option Group Sets
* Attributes

A gif is better than a log explanation, so here is it:

![](https://raw.githubusercontent.com/vanakenm/dhis2-meta-navigator/master/demo.gif)

It uses React and D2, the dhis2 javascript library to load some data, and was created both to fulfill my needs & allow me to explore those librairies.

Tested on DHIS2 2.28, working on 2.26, other versions still to test (but I expect 2.27 & 2.29 to work)

## Development

To use the DHIS2 Play instance, you need to make sure it accepts calls from http://localhost:3000 - this can be set [here](https://play.dhis2.org/demo/dhis-web-settings/#/access).

Then:

    yarn install
    yarn start

This should show a very basic page then load data elements from the demo instance.

## Deploy

* yarn build
* zip the content of the build folder & upload to DHIS2

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

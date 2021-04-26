# Currency Converter

By Cassandra Copp

## Description

This webapp uses ExchangeRate-API to convert USD to other currency types.  First it takes an array of currency codes from the API and makes each element into a selector option.  When an amount is entered into the text field and the selector option is changed, another API is used to find the full name of the currency and the converted amount will be displayed.

## Technologies Used

* HTML
* CSS
* JavaScript
* Bootstrap
* JQuery

## Setup Instructions

To download project and run locally:
1. Clone the repository from GitHub
1. Navigate into the currency-converter directory in terminal
1. Add .env file to currency-converter directory using command 
```sh
$ touch .env
```
4. Obtain an API Key from [ExchangeRate-API.com](https://app.exchangerate-api.com/sign-up)
1. Enter your key in the .env file API_KEY=[your API key]
<br/>  Example: `API_KEY=1a2b3b4c5d6e7f8g`
1. Enter the following commands in terminal:

```sh
$ npm install
$ npm run start
```


## Known bugs

This webpage has no known bugs.

## Licence

[MIT](https://opensource.org/licenses/MIT)

Copywrite (c) Cassandra Copp 2021.

## Contact Information

[github.com/cass1618](http://github.com/cass1618)
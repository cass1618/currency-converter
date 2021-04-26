import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';
import Codes from './js/codes';

function getCurrencyInfo(response, amountUSD, currencyCode) {
  if (response.conversion_rates && response.time_last_update_utc) {
    if (eval("response.conversion_rates."+currencyCode)) {
      const exchangeRate = eval("response.conversion_rates."+currencyCode);
      const convertedCurrency = formatCurrency(amountUSD * exchangeRate, currencyCode);
      $("#display").html(`${convertedCurrency}`);
    } else {
      $("#errors").html(`Currency code not found.`);
    }
  } else if (response["error-type"]){
    $("#errors").html(`API responded with error-type ${response["error-type"]}`);
  } else {
    $("#errors").html(`${response}`);
  }
} 

function getCurrencyCodes(response) {
  if (response.conversion_rates && response.time_last_update_utc) {
    const codes = Object.keys(response.conversion_rates);
    codes.forEach(function (element) {
      $("#currencyTypeSelector").append(`<option value="${element}">${element}</option>`);
    });
    const lastUpdateArray = response.time_last_update_utc.split(' ');
    const lastUpdate = lastUpdateArray[0]+" "+lastUpdateArray[1]+" "+lastUpdateArray[2]+" "+lastUpdateArray[3]+" "+lastUpdateArray[4];
    $("#lastUpdate").html(`Exchange rates last updated ${lastUpdate} from ExchangeRate-API.com`);
  } else if (response["error-type"]){
    $("#errors").html(`API responded with error-type ${response["error-type"]}`);
  } else {
    $("#errors").html(`${response}`);
  }
} 

function getCurrencyName(response, currencyCode) {
  if (response.supported_codes) {
    let codeToNameArray = createCodeToNamesArray(response.supported_codes);
    const currencyName = codeToNameArray[1][codeToNameArray[0].indexOf(currencyCode)];
    $("#currencyName").html(currencyName);
  } else if (response["error-type"]){
    $("#errors").html(`API responded with error-type ${response["error-type"]}`);
  } else {
    $("#errors").html(`${response}`);
  }
}

function createCodeToNamesArray(codesNamesArray) {
  let codes = [];
  let names = [];
  codesNamesArray.forEach(function(element) {
    codes.push(element[0]);
    names.push(element[1]);
  });
  return ([codes,names]);
}

function formatCurrency(number, currencyCode) {
  let currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  });
  return currency.format(number);
}

$(document).ready(function () {
  Currency.getExchangeRates() 
    .then(function(response) {
      getCurrencyCodes(response);
    });

  $("#currencyTypeSelector").on('change',function() {
    const currencyCode = ($("#currencyTypeSelector").val());
    const amountUSD = parseFloat($("#amount").val());
    Codes.getCurrencyNames() 
      .then(function(response) {
        getCurrencyName(response, currencyCode);
      })
      .then(Currency.getExchangeRates() 
        .then(function(response) {
          getCurrencyInfo(response, amountUSD, currencyCode);
        })
      );
  });
});
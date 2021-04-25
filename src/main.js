import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';
import Codes from './js/codes';

function getCurrencyInfo(response, amountUSD, currencyCode) {
  if (response.conversion_rates && response.time_last_update_utc) {
    const exchangeRate = eval("response.conversion_rates."+currencyCode);
    const convertedCurrency = formatCurrency(amountUSD * exchangeRate, currencyCode);
    $("#display").html(`${convertedCurrency}`);
  } else {
    $("#errors").html(`Error loading currency info. API ERROR: ${response["error-type"]}`);
  }
} 

function getCurrencyCodes(response) {
  if (response.conversion_rates && response.time_last_update_utc) {
    const codes = Object.keys(response.conversion_rates);
    codes.forEach(function (element) {
      $("#currencyTypeSelector").append(`<option value="${element}">${element}</option>`);
    });
    const lastUpdate = response.time_last_update_utc;
    $("#lastUpdate").html(`Exchange rates last updated ${lastUpdate} - ExchangeRate-API.com`);
  } else {
    $("#errors").html(`Error loading currency types - API ERROR: ${response["error-type"]}`);
  }
} 

function getCurrencyName(response, currencyCode) {
  if (response.supported_codes) {
    let codeToNameArray = adjustArray(response.supported_codes);
    const currencyName = codeToNameArray[1][codeToNameArray[0].indexOf(currencyCode)];
    $("#currencyName").html(currencyName);
  } else {
    $("#errors").html(`Error loading currency names - API ERROR: ${response["error-type"]}`);
  }
}

function adjustArray(codesNamesArray) {
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
      }).then(Currency.getExchangeRates() 
        .then(function(response) {
          getCurrencyInfo(response, amountUSD, currencyCode);
        }));
  });
});

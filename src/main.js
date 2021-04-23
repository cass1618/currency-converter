import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';

function getCurrencyInfo(response, amountUSD) {
  const exchangeRate = response.conversion_rates.USD;
  console.log("exchangeRate: "+exchangeRate);
  console.log("amountUSD: "+amountUSD);
  let convertedCurrency;
  //console.log(amountUSD*exchangeRate);
  convertedCurrency = (amountUSD * exchangeRate);
  console.log("convertedCurrency: "+convertedCurrency);
  if (response.conversion_rates && response.time_last_update_utc) {
    $("#currencyName").text(`Amount in AED as of ${response.time_last_update_utc} is ${convertedCurrency}`);
  } else {
    $("#errors").text(`${response}`);
  }
} 

$(document).ready(function () {
  $("#main").submit(function (event) {
    event.preventDefault();
    $("#errors").html("");
    const amountUSD = $("#amount").val();
    console.log("amount USD collected is: "+amountUSD);
    //const currencyName = $("#currencyName").val();
    $("#currencyName").val("");
    $("#amount").val("");
    Currency.getExchangeRates() 
      .then(function (response) {
        getCurrencyInfo(response, amountUSD);
      });
  });
});
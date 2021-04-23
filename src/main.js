import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';

function getCurrencyInfo(response, amountUSD) {
  const exchangeRate = response.conversion_rates.EUR;
  const convertedCurrency = amountUSD * exchangeRate;
  if (response.conversion_rates && response.time_last_update_utc) {
    $("#currencyName").text(`Amount in AED as of ${response.time_last_update_utc} is ${convertedCurrency}`);
  } else {
    $("#errors").text(`${response}`);
  }
} 

// function formatCurrency(number) {
//   let currency = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//   });
//   return currency.format(number);
// }

$(document).ready(function () {
  $("#main").submit(function (event) {
    event.preventDefault();
    $("#errors").html("");
    let amountUSDString = $("#amount").val().split('.');
    let amountUSDWholeString = amountUSDString[0];
    let amountUSDDecimalString;
    if (amountUSDString[1]) {
      amountUSDDecimalString = amountUSDString[1];
    } else {
      amountUSDDecimalString = "00";
    }
    
    console.log("amountUSDWholeString "+amountUSDWholeString);
    console.log("amountUSDDecimalString "+amountUSDDecimalString);
    let amountUSD = 10;
    let amountUSDWholeSplit = amountUSDWholeString.split('');
    let amountUSDDecimalSplit = amountUSDDecimalString.split('');
    console.log("amountUSDWhole "+amountUSDWholeSplit);
    console.log("amountUSDDecimal "+amountUSDDecimalSplit);

    //console.log("amount USD collected is: "+amountUSD);
    //const currencyName = $("#currencyName").val();
    $("#currencyName").val("");
    $("#amount").val("");
    Currency.getExchangeRates() 
      .then(function (response) {
        getCurrencyInfo(response, amountUSD);
      });
  });
});
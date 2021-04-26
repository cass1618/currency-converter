export default class Utility {
  static createCodeToNamesArray(codesNamesArray) {
    let codes = [];
    let names = [];
    codesNamesArray.forEach(function(element) {
      codes.push(element[0]);
      names.push(element[1]);
    });
    return ([codes,names]);
  }

  static formatCurrency(number, currencyCode) {
    let currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
    });
    return currency.format(number);
  }
}

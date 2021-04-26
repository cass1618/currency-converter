export default class Currency {
  static async getExchangeRates() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
    if (!response.ok) {
      return response.statusText;
    }
    else {
      return response.json();
    }
  }
}
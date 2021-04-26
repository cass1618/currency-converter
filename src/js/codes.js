export default class Codes {
  static async getCurrencyNames() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
    if (!response.ok) {
      return response.statusText;
    }
    else {
      return response.json();
    }   
  }
}
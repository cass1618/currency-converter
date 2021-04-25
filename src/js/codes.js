export default class Codes {
  static async getCurrencyNames() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      else {
        return response.json();
      }
    } catch (error) {
      return Error(error);
    }
  }
}
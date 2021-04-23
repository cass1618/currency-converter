export default class Currency {
  static async getExchangeRates() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      console.log("response: " + JSON.stringify(response) + " response.json: " + response.json + " response.result: "+response.result);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      else {
        console.log("response: " + JSON.stringify(response) + " response.json: " + response.json);
        return response.json();
      }
    } catch (error) {
      return error;
    }
  }
}
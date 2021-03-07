import fetch from "node-fetch";
import { ExternalPriceProvider } from "../primitives/external_price";

export class OpenExchangePriceProvider implements ExternalPriceProvider {
  readonly BASE_URL = "https://openexchangerates.org/api/latest.json";

  constructor(private readonly apiKey: string) {}

  fetchRates(currencies: string, baseCurrency: string): Promise<Record<string, number>> {
    let reqUrl = this.formReqUrl(currencies, baseCurrency);
    return new Promise(async (resolve, reject) => {
      try {
        let data = await fetch(reqUrl);
        let response = await data.json();
        resolve(response.rates);
      } catch (err) {
        reject(String(err));
      }
    });
  }

  formReqUrl(currencies: string, baseCurrency: string): string {
    return (
      this.BASE_URL +
      "?base=" +
      baseCurrency +
      "&symbols=" +
      encodeURIComponent(currencies) +
      "&app_id=" +
      this.apiKey
    );
  }
}

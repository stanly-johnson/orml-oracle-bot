import fetch from "node-fetch";
import { ExternalPriceProvider } from "../primitives/external_price";

export class CoingeckoPriceProvider implements ExternalPriceProvider {
  readonly BASE_URL = "https://api.coingecko.com/api/v3/simple/price";

  constructor() {}

  fetchRates(currencies: string, baseCurrency: string): Promise<Record<string, number>> {
    let reqUrl = this.formReqUrl(currencies, baseCurrency);
    return new Promise(async (resolve, reject) => {
      try {
        let data = await fetch(reqUrl);
        let response = await data.json();
        resolve(this.transform(response, baseCurrency));
      } catch (err) {
        reject(String(err));
      }
    });
  }

  formReqUrl(currencies: string, baseCurrency: string): string {
    return (
      this.BASE_URL +
      "?vs_currencies=" +
      baseCurrency +
      "&ids=" +
      encodeURIComponent(currencies)
    );
  }

  transform(response : Record<string, Record<string, number>>, base : string) : Record<string, number> {
    let returnData : Record<string, number> = {};
    for (const [key, value] of Object.entries(response)) {
        returnData[key] = value[base.toLowerCase()]
      }
    return returnData;
  }
}

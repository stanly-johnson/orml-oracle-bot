//import { OpenExchangePriceProvider } from "./price-adapter/open_exchange";
import { TemplateOracleAdapter } from "./chain-adapter/node-template/template_adapter.js";
import dotenv from "dotenv";
import { CoingeckoPriceProvider } from "./price-adapter/coingecko.js";
dotenv.config();

async function main(time_inter_min: number) {
  while (true) {
    try {
      console.log("Price Feed Bot!");
      console.log("BASE CURRENCY : ", process.env.BASE_CURRENCY);
      console.log("QUOTE CURRENCIES : ", process.env.QUOTE_CURRENCY);
      console.log("Fetching prices..");
      let coingecko = new CoingeckoPriceProvider();
      let price = await coingecko.fetchRates("bitcoin", "USD");
      let node = new TemplateOracleAdapter(process.env.MNEMONIC!, process.env.NODE_RPC_URL!);
      let hash = await node.feedPrice(price);
      console.log(hash);
    } catch (error) {
      console.log(error);
      console.log("Skipping Execution!");
    } finally {
      // wakes up when its time to work again
      await new Promise((resolve) => setTimeout(resolve, time_inter_min * 60 * 1000));
    }
  }
}

main(parseFloat(process.env.TIME_INTERVAL_IN_MIN!));

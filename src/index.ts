import { OpenExchangePriceProvider } from "./price-adapter/open_exchange.js";
import { TemplateOracleAdapter } from "./chain-adapter/node-template/template_adapter.js";
import { VlnOracleAdapter } from "./chain-adapter/vln/vln_adapter.js";
import { ChainAdapter } from "./primitives/chain_adapter.js"
import dotenv from "dotenv";
//import { CoingeckoPriceProvider } from "./price-adapter/coingecko.js";
dotenv.config();

async function main(time_inter_min: number) {
  while (true) {
    try {
      console.log("Price Feed Bot!");
      console.log("BASE CURRENCY : ", process.env.BASE_CURRENCY);
      console.log("QUOTE CURRENCIES : ", process.env.QUOTE_CURRENCY);
      console.log("Fetching prices..");


      let openExchg = new OpenExchangePriceProvider(process.env.OPEN_EXCHG_RATE_API_KEY!);
      let price = await openExchg.fetchRates("VES", "USD");
      console.log({price});

      let tx_hash = await getSelectedNode().feedPrice(price);
      console.log({tx_hash});

    } catch (error) {
      console.log(error);
      console.log("Skipping Execution!");
    } finally {
      // wakes up when its time to work again
      await new Promise((resolve) => setTimeout(resolve, time_inter_min * 60 * 1000));
    }
  }
}

function getSelectedNode() : ChainAdapter {
  let selection = process.env.CHAIN_TYPE!;
  switch(selection){
    case 'TEMPLATE' : return new TemplateOracleAdapter(process.env.MNEMONIC!, process.env.NODE_RPC_URL!);
    case 'VLN' : return new VlnOracleAdapter(process.env.MNEMONIC!, process.env.NODE_RPC_URL!);
    default : return new TemplateOracleAdapter(process.env.MNEMONIC!, process.env.NODE_RPC_URL!);
  }
}

main(parseFloat(process.env.TIME_INTERVAL_IN_MIN!));

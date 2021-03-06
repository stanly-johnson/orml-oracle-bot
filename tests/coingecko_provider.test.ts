import { CoingeckoPriceProvider } from "../src/price-adapter/coingecko";
import { expect } from "chai";

describe("CoingeckoProvider works", function () {
  it("rates fetch correctly", async function () {
    let provider = new CoingeckoPriceProvider();
    let result = await provider.fetchRates("bitcoin", "USD");
    expect(result.bitcoin).to.be.an("number");
  });
});

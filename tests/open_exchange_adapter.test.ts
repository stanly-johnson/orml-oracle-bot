import { OpenExchangePriceProvider } from "../src/price-adapter/open_exchange";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

describe("OpenExchangeProvider works", function () {
  it("rates fetch correctly", async function () {
    this.timeout(3000);
    let provider = new OpenExchangePriceProvider(process.env.OPEN_EXCHG_RATE_API_KEY!);
    let result = await provider.fetchRates("USD", "USD");
    expect(result.USD).equal(1);

    let result2 = await provider.fetchRates("KHR,USD", "USD");
    expect(result2.KHR).to.be.an("number");
    expect(result2.USD).equal(1);
  });
});

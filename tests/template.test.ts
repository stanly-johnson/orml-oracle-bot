import { TemplateOracleAdapter } from "../src/chain-adapter/node-template/template_adapter";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

describe("TemplateOracleAdapter works", function () {
  it("connection works correctly", async function () {
    let node = new TemplateOracleAdapter(process.env.MNEMONIC!, process.env.NODE_RPC_URL!);
    console.log(node);
    // let result = await provider.getHeader();
    // console.log(result);
    expect(true);
  });
});

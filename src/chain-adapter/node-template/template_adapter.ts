import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { CUSTOM_TYPES } from "./types";
import { ChainAdapter } from "../../primitives/chain_adapter";
const keyring = new Keyring();

export class TemplateOracleAdapter implements ChainAdapter {
  constructor(readonly mnemonic: string, readonly rpcUrl: string) {}

  async feedPrice(prices: Record<string, number>): Promise<string> {
    try {
      const pair = keyring.addFromUri(this.mnemonic);
      let nodeProvider = await buildConnection(this.rpcUrl);
      let tx = nodeProvider.tx.oracle.feedValues(prices);
      let tx_hash = await tx.signAndSend(pair);
      return tx_hash.toHex();
    } catch (error) {
      //return String(error);
      return "error"
    }
  }

  async getHeader() : Promise<string> {
    let nodeProvider = await buildConnection(this.rpcUrl);
    let data = await nodeProvider.consts.system.version;
    return String(data);
  }
}

/**
 * Builds a new blockchain connection instance.
 *
 * @param host rpc url to node.
 * @returns A new blockchain connection instance.
 */
export async function buildConnection(host: string): Promise<ApiPromise> {
  const provider = new WsProvider(host);
  const api: ApiPromise = await ApiPromise.create({
    provider,
    types: CUSTOM_TYPES,
  });
  return api;
}

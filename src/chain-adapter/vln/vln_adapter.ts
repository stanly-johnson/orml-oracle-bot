import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { CUSTOM_TYPES } from "./types.js";
import { ChainAdapter } from "../../primitives/chain_adapter";
const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

export class VlnOracleAdapter implements ChainAdapter {
  constructor(readonly mnemonic: string, readonly rpcUrl: string) {}

  async feedPrice(prices: Record<string, number>): Promise<string> {
    try {
      let transformed_prices = this.transform(prices);
      const pair = await keyring.addFromUri(this.mnemonic);
      let nodeProvider = await buildConnection(this.rpcUrl);
      let tx = nodeProvider.tx.oracle.feedValues(transformed_prices);
      let tx_hash = await tx.signAndSend(pair);
      return tx_hash.toHex();
    } catch (error) {
      return String(error);
    }
  }

  async getHeader() : Promise<string> {
    let nodeProvider = await buildConnection(this.rpcUrl);
    let data = await nodeProvider.consts.system.version;
    return String(data);
  }

  transform(prices: Record<string, number>) : Array<[Asset, number]> {
    let returnData : Array<[Asset, number]> = [];
    for (const [key, value] of Object.entries(prices)) {
        returnData.push([this.getVlnAssetFromString(key), value]);
      }
    return returnData;
  }

  getVlnAssetFromString(currency : string) : Asset {
      switch(currency){
          case 'USDC' : return Asset.Usdv;
          case 'VES' : return Asset.Fiat.Vez;
          case 'COP' : return Asset.Fiat.Cop;
          case 'USDV' : return Asset.Usdv;
          default : return Asset.Usdv
      }
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

enum Collateral {
    "Usdc"
}

enum Fiat {
    "Cop",
    "Vez"
}

class Asset {
    static readonly Collateral = Collateral;
    static readonly Fiat = Fiat;
    static readonly Usdv = "Usdv";
}
/**
 *  ChainAdapter defines the interface your custom chain adapter must
 *  implement. To add support for a new chain, implement a custom chain
 *  adapter for it.
 */
export interface ChainAdapter {
  /**
   *  (Required) Function that calls the orml-oracle extrinsic to update
   *  onchain prices.
   *
   *  The function should also handle conversion to type required by the chain config
   *
   * @param prices    Dict of prices to write to chain
   * @return          hexString
   */
  feedPrice(prices: Record<string, number>): Promise<string>;
}

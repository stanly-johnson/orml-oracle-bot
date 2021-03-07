/**
 *  ExternalPriceProvider defines the interface your custom price adapter must
 *  implement.
 */
export interface ExternalPriceProvider {
  /**
   *  (Required) Function that returns the pair prices for currency/baseCurrency
   *
   *  For your given price provider you should be able to find an interface that provides
   *  the prices for the given pairs
   *
   * @param currencies    comma seperated string of currency code
   * @param baseCurrency  baseCurrency to convert against
   * @return          {Currency: Rate}
   */
  fetchRates(currencies: string, baseCurrency: string): Promise<Record<string, number>>;
}

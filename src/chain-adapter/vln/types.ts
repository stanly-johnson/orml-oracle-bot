import { RegistryTypes } from '@polkadot/types/types'
export const CUSTOM_TYPES: RegistryTypes = {
  "Asset": {
    "_enum": {
      "Collateral": "Collateral",
      "Fiat": "Fiat",
      "Usdv": null
    }
  },
  "Collateral": {
    "_enum": [
      "Usdc"
    ]
  },
  "Fiat": {
    "_enum": [
      "Cop",
      "Vez"
    ]
  },
  "CurrencyId": "Asset",
  "OracleKey": "Asset",
  "OracleValue": "FixedU128",
  "CurrencyIdOf": "Asset",
  "XCurrencyId": {
    "chain_id": "ChainId",
    "currency_id": "Asset"
  },
  "TimestampedValue": {
    "value": "OracleValue",
    "timestamp": "Moment"
  },
  "TimestampedValueOf" : "TimestampedValue",
  "OrderedSet": "Vec<AccountId>",
  "Share" : "Permill"
}
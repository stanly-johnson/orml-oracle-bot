import { RegistryTypes } from '@polkadot/types/types'
export const CUSTOM_TYPES: RegistryTypes = {
  "Address": "MultiAddress",
  "LookupSource": "MultiAddress",
  "BlockNumber": "u32",
  "Index": "u32",
  "Balance": "u64",
  "Asset": {
    "_enum": {
      "Collateral": "Collateral",
      "Fiat":"Fiat",
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
  "CurrencyIdOf": "Asset",
  "Share": "u32",
  "OracleKey": "Asset",
  "OracleValue": "u32",
  "Period": "u64",
  "Phase": "u64"
}

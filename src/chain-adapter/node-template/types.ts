import { RegistryTypes } from '@polkadot/types/types'
export const CUSTOM_TYPES: RegistryTypes = {
    Signature: 'MultiSignature',
    Address: 'MultiAddress',
    LookupSource: 'MultiAddress',
    BlockNumber: 'u64',
    Index: 'u64',
    RefCount: 'u32',
    OracleKey: "u32",
    OracleValue: "u32",
    OrderedSet: "Vec<AccountId>",
    TimestampedValueOf: "u32"
  }
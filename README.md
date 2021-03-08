# Oracle Price Feed Bot

Bot created to mock price feeds to the [orml-oracle](https://github.com/open-web3-stack/open-runtime-module-library/tree/master/oracle) pallet. This bot is created for testing with [Valiu Liquidity Network](https://github.com/valibre-org/vln-node), but can be extended to support new chains, if your chain implements orml-oracle pallet, you can add support for it by creating custom [ChainAdapter](./src/primitives/chain_adapter.ts).

### How to run

1. Duplicate `env.example` file and rename as `.env`. The default configuration is setup to fetch `VES/USD` value and feed to the oracle.

```
OPEN_EXCHG_RATE_API_KEY= //create free api key at https://openexchangerates.org
BASE_CURRENCY=USD 
QUOTE_CURRENCY=VES
CRYPTO_CURRENCY=BTC
NODE_RPC_URL=ws://127.0.0.1:9944
MNEMONIC=//Alice
TIME_INTERVAL_IN_MIN=1
CHAIN_TYPE=TEMPLATE
```

2. `npm install && npm start`

3. If all configs are set correctly you should see the following output on your terminal.
```
Price Feed Bot!
BASE CURRENCY :  USD
QUOTE CURRENCIES :  VES
Fetching prices..
{ price: { VES: 1879603.226415 } }
{
  tx_hash: '0x900127c34f31514a57406903190775c801cd2f5af0fac54a5a05aba63a8f26a2'
}
```

### Supported Chains

- [X] Valiu Liquidity Network
- [X]  Default Node Template (with orml-oracle integrated)


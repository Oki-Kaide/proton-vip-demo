# ProtonVIP Demo

This demo shows the practical usage and integration of the [Proton Web
Sdk](https://www.npmjs.com/package/@proton/web-sdk) with a simple web
application.

Please note that this is not a real web application. The only portions of this
app that work are the authentication and transactions with Proton Wallet. You
may view the live version of this demo (which uses ProtonChain Mainnet) on
[Proton VIP](https://vip.protonchain.com).

## To build and run locally

### npm

```
git clone https://github.com/ProtonProtocol/proton-vip-demo.git

npm install

npm start
```

After starting up the project locally, you'll need to join as a `Patron`, `VIP`,
or `Mega VIP` member of ProtonVIP. Note that you need Foobar tokens in order to
register. Visit the [Foobar Faucet](https://foobar.protonchain.com/) to receive
free test tokens.

## Chain and Endpoint Information

This demo includes a `PROTON_CHAIN` variable that declares the `chainId` and
`endpoints` needed to connected to the ProtonChain Mainnet. You can find the
variables in the **proton-chain.constant.ts** file.

```js
export const PROTON_CHAIN = {
  chainId: '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0',
  endpoints: ['https://proton.greymass.com'],
  appName: 'ProtonVIP',
  requestAccount: 'protonvip',
}
```

### ProtonChain Testnet

In order to switch to connect to ProtonChain Testnet, you would need to run the
project locally and change the `chainId` and `endpoints` to the values below.

- Chain ID: 71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd
- Endpoint: https://testnet.protonchain.com

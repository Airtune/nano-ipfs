# nano-ipfs
Library for converting between v0 IPFS CIDs and Nano addresses.

# Installation
To install it without `devDependencies` run:
```
npm install --only=production https://github.com/Airtune/nano-ipfs
```

`devDependencies` include things like mocha, nanocurrency, and bananojs used for tests.

## Examples
### Setup with nanocurrency
```
import { NanoIpfs } from 'Airtune/nano-ipfs';
import * as nanocurrency from 'nanocurrency';

const publicKeyToAccount = nanocurrency.deriveAddress;
const accountToPublicKey = nanocurrency.derivePublicKey;
const nanoIpfs = new NanoIpfs(publicKeyToAccount, accountToPublicKey);
```

### Setup with bananojs
```
import { NanoIpfs } from '../index';
import * as bananojs from '@bananocoin/bananojs';
const publicKeyToAccount = (publicKey) => {
  return bananojs.bananoUtil.getAccount(publicKey, 'ban_');
};
const accountToPublicKey = bananojs.bananoUtil.getAccountPublicKey;
const bananoIpfs = new NanoIpfs(publicKeyToAccount, accountToPublicKey);
```

### IPFS CID v0 to account
```
nanoIpfs.ifpsCidV0ToAccount("QmbzTMo42KADUbLwc43KR9Se6aV3N6wfKqFbSr2qN1gJqR");
// => "xrb_3kpq7d4kp9hd45jf8jh6zjztcewwfqaxafcr3b45whrxhce1sfinai3pk6w3"
bananoIpfs.ifpsCidV0ToAccount("QmbzTMo42KADUbLwc43KR9Se6aV3N6wfKqFbSr2qN1gJqR");
// => "ban_3kpq7d4kp9hd45jf8jh6zjztcewwfqaxafcr3b45whrxhce1sfinai3pk6w3"
```

### Account to IPFS CID v0
```
nanoIpfs.accountToIpfsCidV0("xrb_3kpq7d4kp9hd45jf8jh6zjztcewwfqaxafcr3b45whrxhce1sfinai3pk6w3");
// => "QmbzTMo42KADUbLwc43KR9Se6aV3N6wfKqFbSr2qN1gJqR"
bananoIpfs.accountToIpfsCidV0("ban_3kpq7d4kp9hd45jf8jh6zjztcewwfqaxafcr3b45whrxhce1sfinai3pk6w3");
// => "QmbzTMo42KADUbLwc43KR9Se6aV3N6wfKqFbSr2qN1gJqR"
```

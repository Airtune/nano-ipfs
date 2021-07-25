import { expect } from 'chai';
import { NanoIpfs } from '../index';
import * as nanocurrency from 'nanocurrency';

const validCid: string = 'QmbzTMo42KADUbLwc43KR9Se6aV3N6wfKqFbSr2qN1gJqR';
const invalidCid1: string = 'mbzTMo42KADUbLwc43KR9Se6aV3N6wfKqFbSr2qN1gJqR';
const invalidCid2: string = 'QmbzTMo42KADUbLwc43KR9Se6aV3';
const invalidAccount: string = 'na_1234err';

const publicKeyToAccount = nanocurrency.deriveAddress;
const accountToPublicKey = nanocurrency.derivePublicKey;
const nanoIpfs = new NanoIpfs(publicKeyToAccount, accountToPublicKey);

describe('nanoIpfs', () => {
  it('encodes and decodes without changing CID', async () => {
    const account: string = nanoIpfs.ifpsCidV0ToAccount(validCid);
    const decodedCid: string = nanoIpfs.accountToIpfsCidV0(account);
    expect(decodedCid).to.equal(validCid);
  });

  it('throws an error given an invalid CID', async () => {
    expect(() => nanoIpfs.ifpsCidV0ToAccount(invalidCid1)).to.throw();
    expect(() => nanoIpfs.ifpsCidV0ToAccount(invalidCid2)).to.throw();
  });

  it('throws an error given an invalid account', async () => {
    expect(() => nanoIpfs.accountToIpfsCidV0(invalidAccount)).to.throw();
  });
});

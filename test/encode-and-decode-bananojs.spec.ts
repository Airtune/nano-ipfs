import { expect } from 'chai';
import { NanoIpfs } from '../index';
const bananojs = require('@bananocoin/bananojs/index.js');

const validCid: string = 'QmbzTMo42KADUbLwc43KR9Se6aV3N6wfKqFbSr2qN1gJqR';
const invalidCid1: string = 'mbzTMo42KADUbLwc43KR9Se6aV3N6wfKqFbSr2qN1gJqR';
const invalidCid2: string = 'QmbzTMo42KADUbLwc43KR9Se6aV3';
const invalidAccount: string = 'ba_1234err';

// Initialize NanoIpfs with bananojs
const publicKeyToAccount = (publicKey) => {
  return bananojs.bananoUtil.getAccount(publicKey, 'ban_');
};
const accountToPublicKey = bananojs.bananoUtil.getAccountPublicKey;
const bananoIpfs = new NanoIpfs(publicKeyToAccount, accountToPublicKey);

describe('bananoIpfs', () => {
  it('encodes and decodes without changing CID', async () => {
    const account: string = bananoIpfs.ifpsCidV0ToAccount(validCid);
    const decodedCid: string = bananoIpfs.accountToIpfsCidV0(account);
    expect(decodedCid).to.equal(validCid);
  });

  it('throws an error given an invalid CID', async () => {
    expect(() => bananoIpfs.ifpsCidV0ToAccount(invalidCid1)).to.throw();
    expect(() => bananoIpfs.ifpsCidV0ToAccount(invalidCid2)).to.throw();
  });

  it('throws an error given an invalid account', async () => {
    expect(() => bananoIpfs.accountToIpfsCidV0(invalidAccount)).to.throw();
  });
});

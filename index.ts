import * as bs58 from 'bs58';

const cidV0B58Pattern: RegExp = new RegExp('^Qm[0-9A-Za-z]{0,64}$');
const cidV0HexPattern: RegExp = new RegExp('^1220[0-9A-Fa-f]{64}$');

export class NanoIpfs {
  private publicKeyToAccount: Function;
  private accountToPublicKey: Function;
  /**
   * Constructor taking account/key conversion functions, from nanocurrency or bananojs, as parameters.
   * @memberof NanoIpfs
   * @param publicKeyToAccount Function that converts public key to account.
   * @param accountToPublicKey Function that converts account to public key.
   */
  constructor(publicKeyToAccount: Function, accountToPublicKey: Function) {
    this.publicKeyToAccount = publicKeyToAccount;
    this.accountToPublicKey = accountToPublicKey;
  }

  /**
   * Gets the IPFS CID encoded into an address.
   * @memberof NanoIpfs
   * @param ipfsCidV0
   * @return An account with an IPFS CID v0 encoded into the public key.
   */
  ifpsCidV0ToAccount(ipfsCidV0: string): string {
    this.validateIpfsCidV0(ipfsCidV0);

    const bytes = bs58.decode(ipfsCidV0);
    const ipfsCidHex = bytes.toString('hex');
    this.validateIpfsCidV0Hex(ipfsCidHex);

    const ipfsPublicKey = ipfsCidHex.substring(4);

    return this.publicKeyToAccount(ipfsPublicKey);
  }

  /**
   * Gets the IPFS CID encoded into the account.
   * @memberof NanoIpfs
   * @param ipfsAccount. An account with an IPFS CID v0 encoded into the public key.
   * @return ipfsCidV0
   */
  accountToIpfsCidV0(ipfsAccount: string): string {
    const ipfsPublicKey: string = this.accountToPublicKey(ipfsAccount);
    return this.hexToIpfsCidV0(ipfsPublicKey);
  }

  hexToIpfsCidV0(hex: string): string {
    const ipfsCidHex: string = `1220${ipfsPublicKey}`;
    this.validateIpfsCidV0Hex(ipfsCidHex);

    const bytes: (Buffer | Uint8Array | number[]) = this.hexToBytes(ipfsCidHex);
    const ipfsCidV0: string = bs58.encode(bytes);
    this.validateIpfsCidV0(ipfsCidV0);

    return ipfsCidV0;
  }

  private validateIpfsCidV0(ipfsCidV0: string) {
    if (typeof(ipfsCidV0) !== 'string') {
      throw Error(`ipfsCidV0: expected to be string, got: ${typeof(ipfsCidV0)}`);
    }

    if (!cidV0B58Pattern.test(ipfsCidV0)) {
      throw Error(`ipfsCidV0:'${ipfsCidV0}' not valid v0 CID (Qm+base58)`);
    }
  }

  private validateIpfsCidV0Hex(ipfsCidV0Hex: string) {
    if (typeof(ipfsCidV0Hex) !== 'string') {
      throw Error(`ipfsCidV0Hex: expected to be string, got: ${typeof(ipfsCidV0Hex)}`);
    }

    if (!cidV0HexPattern.test(ipfsCidV0Hex)) {
      throw Error(`ipfsCidV0Hex:'${ipfsCidV0Hex}' not 64 hex chars after prefix 1220, ${ipfsCidV0Hex.length}`);
    }
  }

  private hexToBytes(hexString: string): Uint8Array {
    const bytes: Uint8Array = new Uint8Array(Math.ceil(hexString.length / 2.0));

    for (var i = 0; i < bytes.length; i++) {
      const hexPair: string = hexString.substr(i*2, 2);
      bytes[i] = parseInt(hexPair, 16);
    }

    return bytes;
  }
}

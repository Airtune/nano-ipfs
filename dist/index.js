"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NanoIpfs = void 0;
var bs58 = require("bs58");
var cidV0B58Pattern = new RegExp('^Qm[0-9A-Za-z]{0,64}$');
var cidV0HexPattern = new RegExp('^1220[0-9A-Fa-f]{64}$');
var NanoIpfs = /** @class */ (function () {
    /**
     * Constructor taking account/key conversion functions, from nanocurrency or bananojs, as parameters.
     * @memberof NanoIpfs
     * @param publicKeyToAccount Function that converts public key to account.
     * @param accountToPublicKey Function that converts account to public key.
     */
    function NanoIpfs(publicKeyToAccount, accountToPublicKey) {
        this.publicKeyToAccount = publicKeyToAccount;
        this.accountToPublicKey = accountToPublicKey;
    }
    /**
     * Gets the IPFS CID encoded into an address.
     * @memberof NanoIpfs
     * @param ipfsCidV0
     * @return An account with an IPFS CID v0 encoded into the public key.
     */
    NanoIpfs.prototype.ifpsCidV0ToAccount = function (ipfsCidV0) {
        this.validateIpfsCidV0(ipfsCidV0);
        var bytes = bs58.decode(ipfsCidV0);
        var ipfsCidHex = bytes.toString('hex');
        this.validateIpfsCidV0Hex(ipfsCidHex);
        var ipfsPublicKey = ipfsCidHex.substring(4);
        return this.publicKeyToAccount(ipfsPublicKey);
    };
    /**
     * Gets the IPFS CID encoded into the account.
     * @memberof NanoIpfs
     * @param ipfsAccount. An account with an IPFS CID v0 encoded into the public key.
     * @return ipfsCidV0
     */
    NanoIpfs.prototype.accountToIpfsCidV0 = function (ipfsAccount) {
        var ipfsPublicKey = this.accountToPublicKey(ipfsAccount);
        return this.hexToIpfsCidV0(ipfsPublicKey);
    };
    NanoIpfs.prototype.hexToIpfsCidV0 = function (hex) {
        var ipfsCidHex = "1220".concat(hex);
        this.validateIpfsCidV0Hex(ipfsCidHex);
        var bytes = this.hexToBytes(ipfsCidHex);
        var ipfsCidV0 = bs58.encode(bytes);
        this.validateIpfsCidV0(ipfsCidV0);
        return ipfsCidV0;
    };
    NanoIpfs.prototype.validateIpfsCidV0 = function (ipfsCidV0) {
        if (typeof (ipfsCidV0) !== 'string') {
            throw Error("ipfsCidV0: expected to be string, got: ".concat(typeof (ipfsCidV0)));
        }
        if (!cidV0B58Pattern.test(ipfsCidV0)) {
            throw Error("ipfsCidV0:'".concat(ipfsCidV0, "' not valid v0 CID (Qm+base58)"));
        }
    };
    NanoIpfs.prototype.validateIpfsCidV0Hex = function (ipfsCidV0Hex) {
        if (typeof (ipfsCidV0Hex) !== 'string') {
            throw Error("ipfsCidV0Hex: expected to be string, got: ".concat(typeof (ipfsCidV0Hex)));
        }
        if (!cidV0HexPattern.test(ipfsCidV0Hex)) {
            throw Error("ipfsCidV0Hex:'".concat(ipfsCidV0Hex, "' not 64 hex chars after prefix 1220, ").concat(ipfsCidV0Hex.length));
        }
    };
    NanoIpfs.prototype.hexToBytes = function (hexString) {
        var bytes = new Uint8Array(Math.ceil(hexString.length / 2.0));
        for (var i = 0; i < bytes.length; i++) {
            var hexPair = hexString.substr(i * 2, 2);
            bytes[i] = parseInt(hexPair, 16);
        }
        return bytes;
    };
    return NanoIpfs;
}());
exports.NanoIpfs = NanoIpfs;
//# sourceMappingURL=index.js.map
import {
  __async
} from "./chunk-J4B6MK7R.js";

// node_modules/crypto-hash/browser.js
var bufferToHex = (buffer) => {
  const view = new DataView(buffer);
  let hexCodes = "";
  for (let index = 0; index < view.byteLength; index += 4) {
    hexCodes += view.getUint32(index).toString(16).padStart(8, "0");
  }
  return hexCodes;
};
var create = (algorithm) => (_0, ..._1) => __async(void 0, [_0, ..._1], function* (buffer, { outputFormat = "hex" } = {}) {
  if (typeof buffer === "string") {
    buffer = new globalThis.TextEncoder().encode(buffer);
  }
  const hash = yield globalThis.crypto.subtle.digest(algorithm, buffer);
  return outputFormat === "hex" ? bufferToHex(hash) : hash;
});
var sha1 = create("SHA-1");
var sha256 = create("SHA-256");
var sha384 = create("SHA-384");
var sha512 = create("SHA-512");
export {
  sha1,
  sha256,
  sha384,
  sha512
};
//# sourceMappingURL=crypto-hash.js.map

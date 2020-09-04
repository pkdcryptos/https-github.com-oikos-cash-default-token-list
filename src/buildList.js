const { version } = require("../package.json");
const mainnet = require("./tokens/mainnet.json");
const nile = require("./tokens/nile.json");
const { toChecksumAddress } = require("ethereum-checksum-address");

module.exports = function buildList() {
  const parsed = version.split(".");
  return {
    name: "Oikos Swap Tokens",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI:
      "https://coin.top/production/upload/logo/TWVVcRqRmpyAi9dASvTXrqnS7FrwvDezMn.png",
    keywords: ["oikos", "default"],
    tokens: [...mainnet, ...nile]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      })
      .map((t) => ({
        ...t,
        address: toChecksumAddress(t.address),
      })),
  };
};

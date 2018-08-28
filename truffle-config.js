var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    rinkeby: {
      // provider: function() {
      //   return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/");
      // },
      network_id: 1
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
}
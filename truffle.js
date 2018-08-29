var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {    
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      // provider: function() {
      //   return new HDWalletProvider("", "https://rinkeby.infura.io/");
      // },
      network_id: "4"
    }
  }
}
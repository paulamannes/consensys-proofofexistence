# ConsenSys Proof of Existence DApp
Final Project for the ConsenSys Academy 2018 Developer Program

Go to: [https://paulamannes.github.io/consensys-proofofexistence/](https://paulamannes.github.io/consensys-proofofexistence/)

1) Connect to Metamask
2) Switch to Rinkeby Test Network
3) Make sure you have funds, if not request here:[https://faucet.rinkeby.io/](https://faucet.rinkeby.io/)
4) You are ready to test the dapp! (:

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
* You can play around with the Rinkeby deployed version.
* Documentation: refer to [Avoiding Common Attacks](https://github.com/paulamannes/consensys-proofofexistence/blob/master/docs/avoiding_comon_attacks.md) and [Design Pattern Decisions](https://github.com/paulamannes/consensys-proofofexistence/blob/master/docs/design_pattern_decisions.md)


### Prerequisites

What things you need to install the software and how to install them

```
npm install ganache-cli
```

### Installing

Clone the repo:
```
git clone https://github.com/paulamannes/consensys-proofofexistence.git
```
Install dependencies:
```
npm install
```
Run the server:
```
npm start
```
It will open http://localhost:3000/

## Deploying the smart contract

Run ganache to emulate an ethereum node:
```
npm ganache-cli
```
Compile the contracts with truffle
```
truffle compile
```
Migrate the contracts
```
truffle migrate
```

## Accessing in the browser with Metamask

You need the Metamask extension for this step.
1) Connect to LocalHost 8545
2) Click in Log out 
3) Click in **Import using account seed phrase**
    a) go to the terminal where ganache-cli is running
    b) copy the mnemonic, example: fragile junk leopard host pitch kick peace wage sauce size aerobic scale
    c) paste in metamask, save a new dummy password
4) Refresh the page


## Running truffle tests

For this step to work you need to have done the previous steps in the correct orther. Run:
```
truffle test
```

## Rinkeby deploy

* Contract Address: [0x101f87dd51440c52d82ed0f279b1b53c97aa5b64](https://rinkeby.etherscan.io/address/0x101f87dd51440c52d82ed0f279b1b53c97aa5b64)
* Ehterscan transaction: https://rinkeby.etherscan.io/tx/0x32ee43a14832cafd34f945fe5117c86d91de29434f96e16b96d0816be6d2483f



## Built With

* [Truffle](https://truffleframework.com/docs/truffle/overview) - blockchain development and testing framework
* [Drizzle](https://truffleframework.com/docs/drizzle/react/react-integration) - front-end libraries for react
* [Ganache-cli](https://truffleframework.com/docs/ganache/overview) - personal blockchain for Ethereum development 
* [Solidity 0.4.24](https://solidity.readthedocs.io/en/v0.4.24/) - programming language for Ethereum
* [Metamask](https://metamask.io/) - browser extension
* [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol) - framework to build secure smart contracts
  * [Ownable contract standard](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)
  * [Pausable contract standard](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Acknowledgments

* Front-end template: [Dashgum](https://www.bootstrapdash.com/free-flat-minimalist-admin-templates/#Dashgum)
* Open Zeppelin test helper: [Assert Revert](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/test/helpers/assertRevert.js)


## Author

* **Paula Mannes** - *Final Project in the ConsenSys Academy 2018 Developer Program* - [Github](https://github.com/paulamannes)
# Design Pattern Decisions

When it comes to design patterns, it was decided to have the fewer data on the blockchain as possible to not have sensitive information being registeres publicly, encryption can be incorporated but also can increase the complexity.
In this version of the application, the user can upload files to IPFS and visualize all of them of the details of one (picture) with its timestamp.

## Circuit Breaker Pattern

  * [Pausable contract standard](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol)

    The contract was designed to be as simple as possible. It serves two main purposes which is to store data about the file/picture on IPFS and get this information with a timestamp of the moment that it was stored.

    The circuit breaker pattern allows the contract to be stopped. Because it is open to anyone to call its method, it might get cluttered, the gas fees increase or bugs be detected. When the contract is paused, it won't be possible to store more information on it, avoiding to increase the problem, but still it will be possible to retrive the data that it contains.
    
## Ownable Pattern

  * [Ownable contract standard](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)

    This design pattern allows the contract to have an address to be able to perform the first circuit breaker pattern. This address will have the possibility to pause the contract in emergencies. As well as transfer the ownership.

## Avoid exceeding gas limit

The use of mapping was intentional to facilitate the access to data without having to run a loop and consume more gas than needed. Its a way to avoid infinite loops due to an unknown size of the data array.

```
  mapping (address => uint[]) private addressToFiles;
  mapping (uint => address) public fileOwner;
```
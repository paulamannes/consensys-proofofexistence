# Avoiding Common Attacks

The simpler the contract, lesser will be vulnerabilities and more can be the test and audit coverage.
The fact that the contract does not involves transfering minimizes the risk of most common attacks.
Most of the decisions about attacks below have one or more unit test for it.


## Posion Data

The contract validates all the string inputs to restrict to the following maximum length size:

```
  /**
   * @dev Modifier to check input size
   */
  modifier inputIsValid(string _fileName, string _ipfsHash, string _tags) {
    require(bytes(_tags).length <= 50);    
    require(bytes(_fileName).length <= 50);
    require(bytes(_ipfsHash).length <= 46);
    _;
  }
```
The IPFS hash has a unique size of `46`, which facilitates to check for poison data.

## msg.sender

**msg.sender** This is the most recommended method to check for authorisation of ownership. 
* **tx.origin** is the original sender of a transaction and can be exploited if used.
* **msg.sender** is the immediate sender and it is the most reliable way to verify the account that called the contract.


## Restrict Access 

In the `getFile()` method, it is required the `msg.sender` to be the owner of the file to minimize free access of other accounts files.

```
  /**
  * @dev Get file info associated with the index and the sender address
  * @return fileName, ipfsHash, tags, timestamp
  */
  function getFile(uint _index) public view returns (string, string, string, uint) {
    //security check: msg.sender has to be the file owner to access it
    require(fileOwner[_index] == msg.sender);    

    return (
      fileStructs[_index].fileName, 
      fileStructs[_index].ipfsHash, 
      fileStructs[_index].tags,
      fileStructs[_index].timestamp
      );
  }
```


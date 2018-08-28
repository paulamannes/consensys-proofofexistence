pragma solidity ^0.4.24;

import 'installed_contracts/zeppelin/contracts/ownership/Ownable.sol';
import 'installed_contracts/zeppelin/contracts/lifecycle/Pausable.sol';

/** 
* @title Ipfs File Storage 
* Contract that keeps ipfs hashes with timestamps
* Goal: Proof of existence of files
* @author Paula Mannes
*/
contract IpfsStorage is Ownable, Pausable {



  event LogNewFile(address indexed accountAddress, string fileName, string ipfsHash, string tags, uint timestamp);

  struct FileStruct {
    string fileName;
    string ipfsHash;
    string tags;
    uint timestamp;
  }

  FileStruct[] public fileStructs;
  
  mapping (address => uint[]) private addressToFiles;
  mapping (uint => address) public fileOwner;

  bool private stopped; 

  /**
   * @dev Modifier to check input size
   */
  modifier inputIsValid(string _fileName, string _ipfsHash, string _tags) {
    require(bytes(_tags).length <= 50);    
    require(bytes(_fileName).length <= 50);
    require(bytes(_ipfsHash).length <= 46);
    _;
  }

  /**
  * @dev Set file info and associate it with the sender address
  * @param _fileName Name of the file
  * @param _ipfsHash Hash of file on IPFS
  * @param _tags String with tags
  */
  function insertFile(string _fileName, string _ipfsHash, string _tags) 
    public 
    whenNotPaused
    inputIsValid(_fileName,_ipfsHash,_tags)
  { 
    uint id = fileStructs.push(FileStruct(_fileName, _ipfsHash, _tags, block.timestamp)) - 1;
    addressToFiles[msg.sender].push(id);
    fileOwner[id] = msg.sender;
    emit LogNewFile(msg.sender, _fileName, _ipfsHash, _tags, block.timestamp);
  }

  /**
  * @dev Get file indexes associated with the sender address
  * @return Array uint indexes
  */
  function getFileIndexes() public view returns (uint[]) {
    return addressToFiles[msg.sender];
  }
  
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
}
pragma solidity ^0.4.24;
contract IpfsStorage {


  struct FileStruct {
    string fileName;
    string ipfsHash;
    string tags;
    uint timestamp;
  }

  FileStruct[] public fileStructs;
  
  mapping (address => uint[]) private addressToFiles;
  mapping (uint => address) private fileOwner;

  string public ipfsHash;
 
  event LogNewFile(address indexed accountAddress, string fileName, string ipfsHash, string tags, uint timestamp);

  /**
  * @dev Set file info and associated it with the sender address
  */
  function insertFile(string _fileName, string _ipfsHash, string _tags) public {
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
pragma solidity >=0.5.16;

contract Medicine {
    address private addr;
    bytes32 private medicineName;
    bytes private medIpfsHash;

    constructor() public {
        addr = msg.sender;
        medicineName = 'temp';
        medIpfsHash = '0x0';
    }

    function createMedicine(bytes32 _medicineName, bytes memory _medIpfsHash) public {
        addr = msg.sender;
        medicineName = _medicineName;
        medIpfsHash = _medIpfsHash;
    }

    function updateMedicine(bytes memory ipfsHash) public returns(bool){
      medIpfsHash = ipfsHash;
      return true;
     }
}
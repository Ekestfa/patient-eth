pragma solidity >=0.5.16;

contract Consultation {
  address private addr;
  bytes32 private patientuname;
  bytes32 private consulDateID;
  bytes private consipfsHash;
  bytes32[] private medicines;
  mapping(bytes32 => uint) private medicinenameToIndex;


  constructor() public{
    addr = msg.sender;
    patientuname = 'x';
    consulDateID = 'x';
    consipfsHash = 'x';
    medicines.push('not-available');
   }

  function createConsultation(address _addr, bytes32 _patientuname, bytes32 _consulDateID, bytes memory _consipfsHash) public {
    addr = _addr;
    patientuname = _patientuname;
    consulDateID = _consulDateID;
    consipfsHash = _consipfsHash;
  }

  function saveMedicineForPatientUse(bytes32 mname) public returns(bool){
    medicines.push(mname);
    medicinenameToIndex[mname] = medicines.length - 1;
    return true;
  }

  function getMedicinesFromConsultation() public view returns(bytes32[] memory){
    return medicines;
  }
  function getMedicineByIndex(uint index) public view returns(bytes32){
    return medicines[index];
  }
  function getMedicineByMedicineName(bytes32 medname)public view returns(bytes32){
    return medicines[medicinenameToIndex[medname]];
  }
  function getMedicinesCountFromConsultation() public view returns(uint){
    return medicines.length;
  }
}
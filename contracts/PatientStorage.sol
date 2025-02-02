pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract PatientStorage {
   mapping(address => uint) private addressToIndex;
   mapping(bytes32 => uint) private patientnameToIndex;
   address[] private addresses;
   bytes32[] private patientUnames;
   bytes[] private ipfsHashes;
   address[] private patientContractAddress;

   constructor() public {
    addresses.push(msg.sender);
    patientUnames.push('x');
    ipfsHashes.push('not-available');
    patientContractAddress.push(msg.sender);
   }

  function savePatientContractAddress(address addr) public returns(bool){
    patientContractAddress.push(addr);
    return true;
  }

  function getPatientContractAddressByPatientName(bytes32 patientName) public view returns(address){
    return patientContractAddress[patientnameToIndex[patientName]];
  }

  function getPatientContractAddresses() public view returns(address[] memory){
    return patientContractAddress;
  }

   function registerPatient(bytes32 patientName, bytes memory ipfsHash) public returns(bool) {
     require(!hasPatient(msg.sender),
            "Sender not authorized.");
     require(!patientNameTaken(patientName),
            "Patient name has been taken.");
      addresses.push(msg.sender);
      patientUnames.push(patientName);
      ipfsHashes.push(ipfsHash);
      addressToIndex[msg.sender] = addresses.length - 1;
      patientnameToIndex[patientName] = addresses.length - 1;
      return true;
    }

   function updatePatient(bytes memory ipfsHash) public returns(bool){
      require(!hasPatient(msg.sender),
            "Sender not authorized.");
      ipfsHashes[addressToIndex[msg.sender]] = ipfsHash;
      return true;
   }

   function hasPatient(address _patientAdresses) public view returns(bool) {
      return (addressToIndex[_patientAdresses] > 0 || _patientAdresses == addresses[0]);
    }

   function patientNameTaken(bytes32 pname) public view returns(bool takenIndeed) {
      return (patientnameToIndex[pname] > 0 || pname == 'self');
    }

   function getPatientCount() public view returns(uint){
      return addresses.length;
    }

   function getPatientByIndex(uint index) public view returns(address,bytes32,bytes memory){
      require((index < addresses.length),
            "Index out of bound!");
      return(addresses[index], patientUnames[index], ipfsHashes[index]);
    }

   function getAddressByIndex(uint index) public view returns(address){
      require((index < addresses.length),
            "Index out of bound!");
      return addresses[index];
    }

   function getPatientNameByIndex(uint index) public view returns(bytes32){
      require((index < addresses.length),
            "Index out of bound!");
      return patientUnames[index];
    }

   function getIpfsHashByIndex(uint index) public view returns(bytes memory){
      require((index < addresses.length),
            "Index out of bound!");
      return ipfsHashes[index];
    }

   function getPatientByAddress(address patientAddress) public view returns(uint, bytes32, bytes memory){
      require(hasPatient(patientAddress),
            "Patient doesn't exist!");
      return(addressToIndex[patientAddress], patientUnames[addressToIndex[patientAddress]], ipfsHashes[addressToIndex[patientAddress]]);
    }

   function getIndexByAddress(address patientAddress) public view returns(uint){
      require(hasPatient(patientAddress),
            "Patient doesn't exist!");
      return addressToIndex[patientAddress];
    }

   function getPatientNameByAddress(address patientAddress) public view returns(bytes32){
      require(hasPatient(patientAddress),
            "Patient doesn't exist!");
      return patientUnames[addressToIndex[patientAddress]];
    }

   function getIpfsHashByAddress(address patientAddress) public view returns(bytes memory){
      require(hasPatient(patientAddress),
            "Patient doesn't exist!");
      return ipfsHashes[addressToIndex[patientAddress]];
    }

   function getPatientByPatientName(bytes32 patientname) public view returns(uint,address,bytes memory){
      require((patientnameToIndex[patientname] < addresses.length),
            "Patient index out of bound!");
      return(patientnameToIndex[patientname], addresses[patientnameToIndex[patientname]], ipfsHashes[patientnameToIndex[patientname]]);
    }

   function getIndexByPatientName(bytes32 patientname) public view returns(uint){
      require((patientNameTaken(patientname)),
            "Can't find the patient!");
      return patientnameToIndex[patientname];
    }

   function getAddressByPatientName(bytes32 patientname) public view returns(address){
      require((patientNameTaken(patientname)),
        "Can't find the patient!");
      return addresses[patientnameToIndex[patientname]];
    }

   function getIpfsHashByPatientName(bytes32 patientname) public view returns(bytes memory){
      require((patientNameTaken(patientname)),
            "Can't find the patient!");
      return ipfsHashes[patientnameToIndex[patientname]];
    }
}
pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;
import "./Patient.sol";

contract PatientStorage {
   mapping(address => uint) private addressToIndex;
   mapping(bytes32 => uint) private patientnameToIndex;
   address[] private addresses;
   bytes32[] private patientUnames;
   bytes[] private ipfsHashes;
   mapping(bytes32 => Patient) patientnameToPatient;
   mapping(address => Patient) patientAddressToPatient;
   Patient p = new Patient();

   constructor() public {
     addresses.push(msg.sender);
     patientUnames.push('x');
     ipfsHashes.push('not-available');
   }

   function registerPatient(bytes32 patientName, bytes memory ipfsHash) public returns(bool) {
     require(!hasPatient(msg.sender),
            "Sender not authorized.");
     require(!patientNameTaken(patientName),
            "Patient name has been taken.");
      // patientnameToPatient[patientName] = patientAddressToPatient[msg.sender] = new Patient(patientName, ipfsHash);
      p.createPatient(patientName, ipfsHash);
      addresses.push(msg.sender);
      patientUnames.push(patientName);
      ipfsHashes.push(ipfsHash);
      addressToIndex[msg.sender] = addresses.length - 1;
      patientnameToIndex[patientName] = addresses.length - 1;
      return true;
    }

   function hasPatient(address _patientAdresses) public view returns(bool) {
      return (addressToIndex[_patientAdresses] > 0 || _patientAdresses == addresses[0]);
    }

   function patientNameTaken(bytes32 pname) public view returns(bool takenIndeed) {
      return (patientnameToIndex[pname] > 0 || pname == 'self');
    }

   function updatePatient(bytes memory ipfsHash) public returns(bool){
      require(!hasPatient(msg.sender),
            "Sender not authorized.");
      p.updatePatient(ipfsHash);
      return true;
    }

   function getPatientCount() public view returns(uint){
      return addresses.length;
    }
   function getPatientByPatientname(bytes32 _pname) public view returns(Patient){
      return patientnameToPatient[_pname];
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
  // CONSULTATIONS
   function consultationCreate(bytes32 _pname, bytes32 _consulDateID, bytes memory newPatientIpfs)public returns(bool){
      return p.consultationCreate(_pname, _consulDateID, newPatientIpfs);
    }

   function getConsultationByConsultationIndex(bytes32 patientName, uint _index) public view returns(bytes32 consulID){
      return p.getConsultationByConsultationIndex(_index);
    }
   function getConsultationIndexByConsultationID(bytes32 patientName, bytes32 _consulDateID) public view returns(uint){
      return p.getConsultationIndexByConsultationID(_consulDateID);
    }

   function getConsultationsByPatientName(bytes32 _pname) public view returns(bytes32[] memory){
      require(hasPatient(getAddressByIndex(patientnameToIndex[_pname])),"Patient hasn't been found.");
      return p.getConsultationsByPatientName(_pname);
    }

   function getConsultationsByPatientAddress(address patientAddress) public view returns(bytes32[] memory){
      return patientAddressToPatient[patientAddress].getConsultationsByPatientAddress(patientAddress);
    }
  // TESTS
   function testCreate(bytes32 _pname, bytes32 _testDateID, bytes memory newPatientIpfs)public returns(bool){
      return patientnameToPatient[_pname].testCreate(_pname,_testDateID,newPatientIpfs);
    }

   function getTestByTestIndex(bytes32 patientName, uint _index) public view returns(bytes32 testID){
      return patientnameToPatient[patientName].getTestByTestIndex(_index);
    }

   function getTestIndexByTestID(bytes32 patientName, bytes32 _testDateID) public view returns(uint){
      return patientnameToPatient[patientName].getTestIndexByTestID(_testDateID);
    }

   function getTestsByPatientName(bytes32 _pname) public view returns(bytes32[] memory) {
      return patientnameToPatient[_pname].getTestsByPatientName(_pname);
    }

   function getTestsByPatientAddress(address patientAddress) public view returns(bytes32[] memory){
      return p.getTestsByPatientAddress(patientAddress);
    }
   function getTestsCount(bytes32 patientName) public view returns (uint){
      return patientnameToPatient[patientName].getTestsCount();
    }
  // MEDICINES
   function saveMedicineForPatientUse(bytes32 patientName, bytes32 consulDateID,bytes32 mname) public returns(bool){
      return patientnameToPatient[patientName].saveMedicineForPatientUse(consulDateID,mname);
    }
   function getMedicinesFromConsultation(bytes32 patientName, bytes32 consulDateID) public view returns(bytes32[] memory){
      return patientnameToPatient[patientName].getMedicinesFromConsultation(consulDateID);
     }
   function getMedicineByIndex(bytes32 patientName, bytes32 _consulDateID,uint index) public view returns(bytes32){
        return patientnameToPatient[patientName].getMedicineByIndex(_consulDateID,index);
     }
   function getMedicineByMedicineName(bytes32 patientName, bytes32 _consulDateID, bytes32 medname)public view returns(bytes32){
        return patientnameToPatient[patientName].getMedicineByMedicineName(_consulDateID, medname);
     }
   function getMedicinesCountFromConsultation(bytes32 patientName, bytes32 _consulDateID) public view returns(uint){
      return patientnameToPatient[patientName].getMedicinesCountFromConsultation(_consulDateID);
  }
}
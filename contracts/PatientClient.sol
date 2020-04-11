pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;
import "./Consultation.sol";

contract Storage {
    mapping(address => uint) private addressToIndex;
    mapping(bytes32 => uint) private patientnameToIndex;
    address[] private addresses;
    bytes32[] private patientUnames;
    bytes[] private ipfsHashes;
    // Consultation mapping
    mapping(bytes32 => uint) private consulDateIDToIndex;
    // patient name to consultations
    mapping(bytes32 => bytes32[]) pnameToConsulArray;
    mapping(bytes32 => bytes[]) pnameToConsulIpfsArray;
    // patient address to consultations
    mapping(address => bytes32[]) paddressToConsulArray;
    mapping(address => bytes[]) paddressToConsulIpfsArray;
    bytes32[] consultations;
    bytes[] private consulIPFShashes;

function consultationCreate(bytes32 _pname, bytes32 _consulDateID,
   bytes memory _ipfsConsulHash, bytes memory newPatientIpfs)public returns(bool){
   // Create new consultation with ID and its IPFS Hash
   new Consultation(_consulDateID, _ipfsConsulHash);
   consultations.push(_consulDateID);
   consulIPFShashes.push(_ipfsConsulHash);
   consulDateIDToIndex[_consulDateID] = consultations.length;
   pnameToConsulArray[_pname] = consultations;
   pnameToConsulIpfsArray[_pname] = consulIPFShashes;
   paddressToConsulArray[msg.sender] = consultations;
   paddressToConsulIpfsArray[msg.sender] = consulIPFShashes;
   // Consultations hash append to patient ipfs storage
   updatePatient(newPatientIpfs);
//   emit consultationCreated(_pname, _consulDateID);
   return true;

}

function getConsultationByConsultationIndex(uint _index) public view returns(bytes32 consulID, bytes memory ipfs){
   return (consultations[_index], consulIPFShashes[_index]);
}

function getConsultationIpfsByConsultationID(bytes32 _consulDateID) public view returns(bytes memory ipfs){
   return consulIPFShashes[consulDateIDToIndex[_consulDateID]];
}

function getConsultationIndexByConsultationID(bytes32 _consulDateID) public view returns(uint){
   return consulDateIDToIndex[_consulDateID];
}

function getConsultationsByPatientName(bytes32 _pname) public view returns(bytes32[] memory, bytes[] memory) {
   require(hasPatient(getAddressByPatientName(_pname)),
          "Patient hasn't been found");
   return (pnameToConsulArray[_pname], pnameToConsulIpfsArray[_pname]);
}

function getConsultationsByPatientAddress(address patientAddress) public view returns(bytes32[] memory, bytes[] memory){
   require(hasPatient(patientAddress),
          "Patient hasn't been found");
   return(paddressToConsulArray[patientAddress],paddressToConsulIpfsArray[patientAddress]);
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
    function hasPatient(address _patientAdresses) public view returns(bool) {
        return (addressToIndex[_patientAdresses] > 0 || _patientAdresses == addresses[0]);
 }
    function patientNameTaken(bytes32 pname) public view returns(bool takenIndeed) {
    return (patientnameToIndex[pname] > 0 || pname == 'self');
 }

  function updatePatient(bytes memory ipfsHash) public returns(bool){
    require(!hasPatient(msg.sender),
            "Sender not authorized.");
    ipfsHashes[addressToIndex[msg.sender]] = ipfsHash;
    return true;
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

contract Client {

   Storage datastore;

constructor(address storageAddress) public {
    datastore = Storage(storageAddress);
}

function consultationCreate(bytes32 _pname, bytes32 _consulDateID,
   bytes memory _ipfsConsulHash, bytes memory newPatientIpfs)public returns(bool){
   datastore.consultationCreate(_pname, _consulDateID, _ipfsConsulHash, newPatientIpfs);
   return true;

}

function getConsultationByConsultationIndex(uint _index) public view returns(bytes32 consulID, bytes memory ipfs){
   return datastore.getConsultationByConsultationIndex(_index);
}

function getConsultationIpfsByConsultationID(bytes32 _consulDateID) public view returns(bytes memory ipfs){
   return datastore.getConsultationIpfsByConsultationID(_consulDateID);
}

function getConsultationIndexByConsultationID(bytes32 _consulDateID) public view returns(uint){
   return datastore.getConsultationIndexByConsultationID(_consulDateID);
}

function getConsultationsByPatientName(bytes32 _pname) public view returns(bytes32[] memory, bytes[] memory) {
   return datastore.getConsultationsByPatientName(_pname);
}

function getConsultationsByPatientAddress(address patientAddress) public view returns(bytes32[] memory, bytes[] memory){
   return datastore.getConsultationsByPatientAddress(patientAddress);
}

function registerPatient(bytes32 patientName, bytes memory ipfsHash) public returns(bool) {
    return datastore.registerPatient(patientName,ipfsHash);
 }

function hasPatient(address _patientAdresses) public view returns(bool) {
    return datastore.hasPatient(_patientAdresses);
 }
function patientNameTaken(bytes32 pname) public view returns(bool takenIndeed) {
    return datastore.patientNameTaken(pname);
 }

  function updatePatient(bytes memory ipfsHash) public returns(bool){
    return datastore.updatePatient(ipfsHash);
 }

 function getPatientCount() public view returns(uint){
    return datastore.getPatientCount();
 }

 function getPatientByIndex(uint index) public view returns(address,bytes32,bytes memory){
    return datastore.getPatientByIndex(index);
 }

 function getAddressByIndex(uint index) public view returns(address){
    return datastore.getAddressByIndex(index);
 }

 function getPatientNameByIndex(uint index) public view returns(bytes32){
    return datastore.getPatientNameByIndex(index);
 }

 function getIpfsHashByIndex(uint index) public view returns(bytes memory){
    return datastore.getIpfsHashByIndex(index);
 }

 function getPatientByAddress(address patientAddress) public view returns(uint, bytes32, bytes memory){
    return datastore.getPatientByAddress(patientAddress);
 }

 function getIndexByAddress(address patientAddress) public view returns(uint){
    return datastore.getIndexByAddress(patientAddress);
 }

 function getPatientNameByAddress(address patientAddress) public view returns(bytes32){
    return datastore.getPatientNameByAddress(patientAddress);
 }

 function getIpfsHashByAddress(address patientAddress) public view returns(bytes memory){
    return datastore.getIpfsHashByAddress(patientAddress);
 }

 function getPatientByPatientName(bytes32 patientname) public view returns(uint,address,bytes memory){
    return datastore.getPatientByPatientName(patientname);
 }

 function getIndexByPatientName(bytes32 patientname) public view returns(uint){
    return datastore.getIndexByPatientName(patientname);
 }

 function getAddressByPatientName(bytes32 patientname) public view returns(address){
    return datastore.getAddressByPatientName(patientname);
 }
 function getIpfsHashByPatientName(bytes32 patientname) public view returns(bytes memory){
    return datastore.getIpfsHashByPatientName(patientname);
 }
}

contract ClientFactory {
 event LogNewClientCreated(address sender, Client newClient);

 function createClient(address storageContract) public returns(Client newClient) {
   Client c = new Client(storageContract);
   emit LogNewClientCreated(msg.sender, c);
   return c;
   }
}

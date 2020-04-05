pragma solidity >=0.5.16;
import "./PatientFactory.sol";

contract PatientIndex {
    mapping(address => uint) private addressToIndex;
    mapping(bytes16 => uint) private patientnameToIndex;
   //  mapping(address => Patient) private patientInfoToAddress;
    address[] private addresses;
    address[] private patientInfoAddresses;
    bytes16[] private patientUnames;
    bytes[] private ipfsHashes;

   constructor() public{
        addresses.push(msg.sender);
        patientUnames.push('x');
        ipfsHashes.push('not-available');
    }

    function hasPatient(address _patientAdresses) public view returns(bool) {
        return (addressToIndex[_patientAdresses] > 0 || _patientAdresses == addresses[0]);
    }

    function patientNameTaken(bytes16 pname) public view returns(bool takenIndeed) {
            return (patientnameToIndex[pname] > 0 || pname == 'self');
    }

    function registerPatient(bytes16 patientName, bytes memory ipfsHash) public returns(bool) {
        require(!hasPatient(msg.sender),
                "Sender not authorized.");
        require(!patientNameTaken(patientName),
                "Patient name has been taken."
        );
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

 function getPatientCount() public view returns(uint){
    return addresses.length;
 }

 function getPatientByIndex(uint index) public view returns(address,bytes16,bytes memory){
    require((index < addresses.length),
            "Index out of bound!");
    return(addresses[index], patientUnames[index], ipfsHashes[index]);
 }

 function getAddressesByIndex(uint index) public view returns(address){
    require((index < addresses.length),
            "Index out of bound!");
    return addresses[index];
 }

 function getPatientNameByIndex(uint index) public view returns(bytes16){
    require((index < addresses.length),
            "Index out of bound!");
    return patientUnames[index];
 }

 function getIpfsHashByIndex(uint index) public view returns(bytes memory){
    require((index < addresses.length),
            "Index out of bound!");
    return ipfsHashes[index];
 }

 function getPatientByAddress(address patientAddress) public view returns(uint, bytes16, bytes memory){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return(addressToIndex[patientAddress], patientUnames[addressToIndex[patientAddress]], ipfsHashes[addressToIndex[patientAddress]]);
 }

 function getIndexByAddress(address patientAddress) public view returns(uint){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return addressToIndex[patientAddress];
 }

 function getPatientNameByAddress(address patientAddress) public view returns(bytes16){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return patientUnames[addressToIndex[patientAddress]];
 }

 function getIpfsHashByAddress(address patientAddress) public view returns(bytes memory){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return ipfsHashes[addressToIndex[patientAddress]];
 }

 function getPatientByPatientName(bytes16 patientname) public view returns(uint,address,bytes memory){
    require((patientnameToIndex[patientname] < addresses.length),
            "Patient index out of bound!");
    return(patientnameToIndex[patientname], addresses[patientnameToIndex[patientname]], ipfsHashes[patientnameToIndex[patientname]]);
 }

 function getIndexByPatientName(bytes16 patientname) public view returns(uint){
    require((patientNameTaken(patientname)),
        "Can't find the patient!");
    return patientnameToIndex[patientname];
 }

 function getAddressByPatientName(bytes16 patientname) public view returns(address){
    require((patientNameTaken(patientname)),
        "Can't find the patient!");
    return addresses[patientnameToIndex[patientname]];
 }
 function getIpfsHashByPatientName(bytes16 patientname) public view returns(bytes memory){
    require((patientNameTaken(patientname)),
            "Can't find the patient!");
    return ipfsHashes[patientnameToIndex[patientname]];
 }
}
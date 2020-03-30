pragma solidity 0.5.16;

interface PatientInterface {
    function Patient() external returns(bool);
    function hasPatient(address) external returns(bool);
    function patientNameTaken(bytes16) external returns(bool);
    function registerPatient(bytes16, bytes calldata) external returns(bool);
    function updatePatient(bytes calldata) external returns(bool);
    function getPatientCount() external returns(uint);
    function getPatientByIndex(uint index) external returns(address,bytes16,bytes memory);
    function getAddressesByIndex(uint index) external returns(address);
    function getPatientNameByIndex(uint index) external returns(bytes16);
    function getIpfsHashByIndex(uint index) external returns(bytes memory);
    function getPatientByAddress(address) external returns(uint, bytes16, bytes memory);
    function getIndexByAddress(address) external returns(uint);
    function getPatientNameByAddress(address) external returns(bytes16);
    function getIpfsHashByAddress(address) external returns(bytes memory);
    function getPatientByPatientName(bytes16) external returns(uint,address,bytes memory);
    function getIndexByPatientName(bytes16) external returns(uint);
    function getAddressByPatientName(bytes16) external returns(address);
    function getIpfsHashByPatientName(bytes16) external returns(bytes memory);
}

contract PatientContract is PatientInterface {
    mapping(address => uint) private addressToIndex;
    mapping(bytes16 => uint) private patientnameToIndex;

    address[] private addresses;
    bytes16[] private patientUnames;
    bytes16[] private patName;
    bytes16[] private patSurnm;
    bytes16[] private patSex;
    bytes16[] private patBirth;
    bytes16[] private patPhone;
    bytes16[] private patEmail;
    bytes16[] private patAddress;
    bytes[] private ipfsHashes;

    function Patient() public returns(bool){
        addresses.push(msg.sender);
        patientUnames.push('self');
        ipfsHashes.push('not-available');
    }

    function hasPatient(address _patientAdresses) public returns(bool) {
        return (addressToIndex[_patientAdresses] > 0 || _patientAdresses == addresses[0]);
    }

    function patientNameTaken(bytes16 pname) public returns(bool takenIndeed) {
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

 function getPatientCount() public returns(uint){
    return addresses.length;
 }

 function getPatientByIndex(uint index) public returns(address,bytes16,bytes memory){
    require((index < addresses.length),
            "Index out of bound!");
    return(addresses[index], patientUnames[index], ipfsHashes[index]);
 }

 function getAddressesByIndex(uint index) public returns(address){
    require((index < addresses.length),
            "Index out of bound!");
    return addresses[index];
 }

 function getPatientNameByIndex(uint index) public returns(bytes16){
    require((index < addresses.length),
            "Index out of bound!");
    return patientUnames[index];
 }

 function getIpfsHashByIndex(uint index) public returns(bytes memory){
    require((index < addresses.length),
            "Index out of bound!");
    return ipfsHashes[index];
 }

 function getPatientByAddress(address patientAddress) public returns(uint, bytes16, bytes memory){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return(addressToIndex[patientAddress], patientUnames[addressToIndex[patientAddress]], ipfsHashes[addressToIndex[patientAddress]]);
 }

 function getIndexByAddress(address patientAddress) public returns(uint){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return addressToIndex[patientAddress];
 }

 function getPatientNameByAddress(address patientAddress) public returns(bytes16){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return patientUnames[addressToIndex[patientAddress]];
 }

 function getIpfsHashByAddress(address patientAddress) public returns(bytes memory){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return ipfsHashes[addressToIndex[patientAddress]];
 }

 function getPatientByPatientName(bytes16 patientname) public returns(uint,address,bytes memory){
    require((patientnameToIndex[patientname] < addresses.length),
            "Patient index out of bound!");
    return(patientnameToIndex[patientname], addresses[patientnameToIndex[patientname]], ipfsHashes[patientnameToIndex[patientname]]);
 }

 function getIndexByPatientName(bytes16 patientname) public returns(uint){
         require((patientNameTaken(patientname)),
                "Can't find the patient!");
         return patientnameToIndex[patientname];
 }

 function getAddressByPatientName(bytes16 patientname) public returns(address){
         require((patientNameTaken(patientname)),
                "Can't find the patient!");
         return addresses[patientnameToIndex[patientname]];
 }
 function getIpfsHashByPatientName(bytes16 patientname) public returns(bytes memory){
         require((patientNameTaken(patientname)),
                "Can't find the patient!");
         return ipfsHashes[patientnameToIndex[patientname]];
 }
}
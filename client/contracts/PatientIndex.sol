pragma solidity >=0.5.16;


interface PatientsInterface {
    function Patients() external returns(bool);
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

contract PatientIndex is PatientsInterface{
    mapping(address => uint) private addressToIndex;
    mapping(bytes16 => uint) private patientnameToIndex;
    address[] private addresses;
    bytes16[] private patientUnames;
    bytes[] private ipfsHashes;

    function Patients() public override returns(bool){
        addresses.push(msg.sender);
        patientUnames.push('x');
        ipfsHashes.push('not-available');
    }

    function hasPatient(address _patientAdresses) public override returns(bool) {
        return (addressToIndex[_patientAdresses] > 0 || _patientAdresses == addresses[0]);
    }

    function patientNameTaken(bytes16 pname) public override returns(bool takenIndeed) {
            return (patientnameToIndex[pname] > 0 || pname == 'self');
    }

    function registerPatient(bytes16 patientName, bytes memory ipfsHash) public override returns(bool) {
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

 function updatePatient(bytes memory ipfsHash) public override returns(bool){
    require(!hasPatient(msg.sender),
            "Sender not authorized.");
    ipfsHashes[addressToIndex[msg.sender]] = ipfsHash;
    return true;
 }

 function getPatientCount() public override returns(uint){
    return addresses.length;
 }

 function getPatientByIndex(uint index) public override returns(address,bytes16,bytes memory){
    require((index < addresses.length),
            "Index out of bound!");
    return(addresses[index], patientUnames[index], ipfsHashes[index]);
 }

 function getAddressesByIndex(uint index) public override returns(address){
    require((index < addresses.length),
            "Index out of bound!");
    return addresses[index];
 }

 function getPatientNameByIndex(uint index) public override returns(bytes16){
    require((index < addresses.length),
            "Index out of bound!");
    return patientUnames[index];
 }

 function getIpfsHashByIndex(uint index) public override returns(bytes memory){
    require((index < addresses.length),
            "Index out of bound!");
    return ipfsHashes[index];
 }

 function getPatientByAddress(address patientAddress) public override returns(uint, bytes16, bytes memory){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return(addressToIndex[patientAddress], patientUnames[addressToIndex[patientAddress]], ipfsHashes[addressToIndex[patientAddress]]);
 }

 function getIndexByAddress(address patientAddress) public override returns(uint){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return addressToIndex[patientAddress];
 }

 function getPatientNameByAddress(address patientAddress) public override returns(bytes16){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return patientUnames[addressToIndex[patientAddress]];
 }

 function getIpfsHashByAddress(address patientAddress) public override returns(bytes memory){
    require(hasPatient(patientAddress),
            "Patient doesn't exist!");
    return ipfsHashes[addressToIndex[patientAddress]];
 }

 function getPatientByPatientName(bytes16 patientname) public override returns(uint,address,bytes memory){
    require((patientnameToIndex[patientname] < addresses.length),
            "Patient index out of bound!");
    return(patientnameToIndex[patientname], addresses[patientnameToIndex[patientname]], ipfsHashes[patientnameToIndex[patientname]]);
 }

 function getIndexByPatientName(bytes16 patientname) public override returns(uint){
    require((patientNameTaken(patientname)),
        "Can't find the patient!");
    return patientnameToIndex[patientname];
 }

 function getAddressByPatientName(bytes16 patientname) public override returns(address){
    require((patientNameTaken(patientname)),
        "Can't find the patient!");
    return addresses[patientnameToIndex[patientname]];
 }
 function getIpfsHashByPatientName(bytes16 patientname) public override returns(bytes memory){
    require((patientNameTaken(patientname)),
            "Can't find the patient!");
    return ipfsHashes[patientnameToIndex[patientname]];
 }
}
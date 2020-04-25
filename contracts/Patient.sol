pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;
import "./Consultation.sol";
import "./Test.sol";

contract Patient{
    address private addr;
    bytes32 private patientuname;
    bytes private IpfsHash;
    Consultation c = new Consultation();

    // Consultation mapping
    mapping(bytes32 => uint) private consulDateIDToIndex;
    mapping(bytes32 => bytes32[]) pnameToConsulArray;
    mapping(address => bytes32[]) paddressToConsulArray;
    mapping(bytes32 => Consultation) consulDateIDToCons;
    bytes32[] consIDs;

    // Test mapping
    Test t = new Test();
    mapping(bytes32 => uint) private testDateIDToIndex;
    mapping(bytes32 => bytes32[]) pnameToTestArray;
    mapping(address => bytes32[]) paddressToTestArray;
    bytes32[] testIDs;

    event NewConsultationCreated(bytes32 pname, bytes32 consID);
    event NewTestCreated(bytes32 pname, bytes32 testID);
    event NewMedicineCreatedForPatient(bytes32 pname, bytes32 consID, bytes32 medname);

    constructor() public{
        addr = msg.sender;
        patientuname = 'x';
        IpfsHash = 'x';
        consIDs.push('not-available');
        testIDs.push('not-available');
     }

    function createPatient(bytes32 _patientuname,bytes memory _IpfsHash) public {
        addr = msg.sender;
        patientuname = _patientuname;
        IpfsHash = _IpfsHash;
    }

    function updatePatient(bytes memory ipfsHash) public returns(bool){
        IpfsHash = ipfsHash;
        return true;
     }

    // CONSULTATIONS
    function consultationCreate(bytes32 _pname, bytes32 _consulDateID, bytes memory newPatientIpfs)public returns(bool){
        // Create new consultation with ID
        c.createConsultation(msg.sender, _pname, _consulDateID);
        consIDs.push(_consulDateID);
        consulDateIDToIndex[_consulDateID] = consIDs.length;
        pnameToConsulArray[_pname] = consIDs;
        paddressToConsulArray[msg.sender] = consIDs;
        consulDateIDToCons[_consulDateID] = c;
        // Consultations hash append to patient ipfs storage
        updatePatient(newPatientIpfs);
        emit NewConsultationCreated(_pname, _consulDateID);
        return true;
     }

    function getConsultationByConsultationIndex(uint _index) public view returns(bytes32 consulID){
        return (consIDs[_index]);
     }

    function getConsultationIndexByConsultationID(bytes32 _consulDateID) public view returns(uint){
        return consulDateIDToIndex[_consulDateID];
     }

    function getConsultationsByPatientName(bytes32 _pname) public view returns(bytes32[] memory) {
        return (pnameToConsulArray[_pname]);
     }

    function getConsultationsByPatientAddress(address patientAddress) public view returns(bytes32[] memory){
        return(paddressToConsulArray[patientAddress]);
     }
    function getConsultationsCount() public view returns (uint){
        return consIDs.length;
     }
    // TESTS
    function testCreate(bytes32 _pname, bytes32 _testDateID, bytes memory newPatientIpfs)public returns(bool){
        // Create new test with ID
        t.createTest(msg.sender, _pname, _testDateID);
        testIDs.push(_testDateID);
        testDateIDToIndex[_testDateID] = testIDs.length;
        pnameToTestArray[_pname] = testIDs;
        paddressToTestArray[msg.sender] = testIDs;
        // Consultations hash append to patient ipfs storage
        updatePatient(newPatientIpfs);
        emit NewTestCreated(_pname, _testDateID);
        return true;
     }

    function getTestByTestIndex(uint _index) public view returns(bytes32 testID){
        return (testIDs[_index]);
     }

    function getTestIndexByTestID(bytes32 _testDateID) public view returns(uint){
        return testDateIDToIndex[_testDateID];
     }

    function getTestsByPatientName(bytes32 _pname) public view returns(bytes32[] memory) {
        return (pnameToTestArray[_pname]);
     }

    function getTestsByPatientAddress(address patientAddress) public view returns(bytes32[] memory){
        return(paddressToConsulArray[patientAddress]);
     }
    function getTestsCount() public view returns (uint){
        return testIDs.length;
     }

    function saveMedicineForPatientUse(bytes32 _consulDateID, bytes32 mname) public returns(bool){
        return consulDateIDToCons[_consulDateID].saveMedicineForPatientUse(mname);
     }
    function getMedicinesFromConsultation(bytes32 _consulDateID) public view returns(bytes32[] memory){
        return consulDateIDToCons[_consulDateID].getMedicinesFromConsultation();
     }
    function getMedicineByIndex(bytes32 _consulDateID,uint index) public view returns(bytes32){
        return consulDateIDToCons[_consulDateID].getMedicineByIndex(index);
     }
    function getMedicineByMedicineName(bytes32 _consulDateID, bytes32 medname)public view returns(bytes32){
        return consulDateIDToCons[_consulDateID].getMedicineByMedicineName(medname);
     }
    function getMedicinesCountFromConsultation(bytes32 _consulDateID) public view returns(uint){
        return consulDateIDToCons[_consulDateID].getMedicinesCountFromConsultation();
     }
}
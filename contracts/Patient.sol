pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract Patient{
    //Patient Contract Data for contract creation
    address patientAddress;
    bytes32 patientName;

    //Consultation data
    bytes32[] private consIDs;
    bytes[] private consipfsHash;
    // Consultation mapping
    mapping(bytes32 => uint) private consulDateIDToIndex;

    // Test mapping
    bytes32[] private testIDs;
    bytes[] private testipfsHash;
    mapping(bytes32 => uint) private testDateIDToIndex;

    constructor(address _patientAddress, bytes32 _patientName) public{
        patientAddress = _patientAddress;
        patientName = _patientName;
     }

    // CONSULTATIONS
     function consultationCreate(bytes32 _consulDateID, bytes memory _consipfs)public returns(bool){
        // Create new consultation with ID
        consIDs.push(_consulDateID);
        consipfsHash.push(_consipfs);
        consulDateIDToIndex[_consulDateID] = consIDs.length;
        return true;
     }

     function getConsultationByConsultationIndex(uint _index) public view returns(bytes32 consulID){
        return (consIDs[_index]);
     }

     function getConsultationIndexByConsultationID(bytes32 _consulDateID) public view returns(uint){
        return consulDateIDToIndex[_consulDateID];
     }

     function getConsultationsCount() public view returns (uint){
        return consIDs.length;
     }

     function getConsultationIpfsByConsultationID(bytes32 _consulDateID) public view returns(bytes memory){
        return (consipfsHash[consulDateIDToIndex[_consulDateID]]);
     }

     function getConsultationsIpfsList() public view returns(bytes[] memory){
         return consipfsHash;
     }

     function getConsultationsNameList() public view returns(bytes32[] memory){
         return consIDs;
     }

    // TESTS
     function testCreate(bytes32 _testDateID, bytes memory _testipfs)public returns(bool){
        testIDs.push(_testDateID);
        testipfsHash.push(_testipfs);
        testDateIDToIndex[_testDateID] = testIDs.length;
        return true;
     }

     function getTestByTestIndex(uint _index) public view returns(bytes32){
        return (testIDs[_index]);
     }

     function getTestIndexByTestID(bytes32 _testDateID) public view returns(uint){
        return testDateIDToIndex[_testDateID];
     }

     function getTestCount() public view returns (uint){
        return testIDs.length;
     }

     function getTestIpfsByTestID(bytes32 _testDateID) public view returns(bytes memory){
        return (testipfsHash[testDateIDToIndex[_testDateID]]);
     }

     function getTestIpfsList() public view returns(bytes[] memory){
         return testipfsHash;
     }

     function getTestNameList() public view returns(bytes32[] memory){
         return testIDs;
     }
}
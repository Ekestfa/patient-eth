pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;
import "./PatientStorage.sol";
import "./DoctorStorage.sol";
import "./MedicineStorage.sol";

contract Client {
   //out of gas
address addr;
PatientStorage datastore = new PatientStorage();
DoctorStorage doctorstore;
MedicineStorage medicinestore;

constructor() public {
   addr = msg.sender;
}
 // PATIENT
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
// CONSULTATIONS
function consultationCreate(bytes32 _pname, bytes32 _consulDateID, bytes memory newPatientIpfs)public returns(bool){
   return datastore.consultationCreate(_pname, _consulDateID, newPatientIpfs);
 }

function getConsultationByConsultationIndex(bytes32 _pname, uint _index) public view returns(bytes32 consulID){
   return datastore.getConsultationByConsultationIndex(_pname, _index);
 }
function getConsultationIndexByConsultationID(bytes32 _pname, bytes32 _consulDateID) public view returns(uint){
   return datastore.getConsultationIndexByConsultationID(_pname, _consulDateID);
 }

function getConsultationsByPatientName(bytes32 _pname) public view returns(bytes32[] memory){
   return datastore.getConsultationsByPatientName(_pname);
 }

function getConsultationsByPatientAddress(address patientAddress) public view returns(bytes32[] memory){
   return datastore.getConsultationsByPatientAddress(patientAddress);
 }
// TESTS
function testCreate(bytes32 _pname, bytes32 _testDateID, bytes memory newPatientIpfs)public returns(bool){
   return datastore.testCreate(_pname,_testDateID, newPatientIpfs);
 }

function getTestByTestIndex(bytes32 patientName, uint _index) public view returns(bytes32 testID){
   return datastore.getTestByTestIndex(patientName, _index);
 }

function getTestIndexByTestID(bytes32 patientName, bytes32 _testDateID) public view returns(uint){
   return datastore.getTestIndexByTestID(patientName, _testDateID);
 }

function getTestsByPatientName(bytes32 _pname) public view returns(bytes32[] memory) {
   return datastore.getTestsByPatientName(_pname);
 }

function getTestsByPatientAddress(address patientAddress) public view returns(bytes32[] memory){
   return datastore.getTestsByPatientAddress(patientAddress);
 }
function getTestsCount(bytes32 patientName) public view returns (uint){
   return datastore.getTestsCount(patientName);
 }
// MEDICINES
function saveMedicineForPatientUse(bytes32 patientName, bytes32 consulDateID,bytes32 mname) public returns(bool){
   return datastore.saveMedicineForPatientUse(patientName, consulDateID, mname);
 }
function getMedicinesFromConsultation(bytes32 patientName, bytes32 consulDateID) public view returns(bytes32[] memory){
   return datastore.getMedicinesFromConsultation(patientName, consulDateID);
 }
function getMedicineByIndex(bytes32 patientName, bytes32 _consulDateID,uint index) public view returns(bytes32){
   return datastore.getMedicineByIndex(patientName, _consulDateID, index);
 }
function getMedicineByMedicineName(bytes32 patientName, bytes32 _consulDateID, bytes32 medname)public view returns(bytes32){
   return datastore.getMedicineByMedicineName(patientName, _consulDateID, medname);
 }
function getMedicinesCountFromConsultation(bytes32 patientName, bytes32 _consulDateID) public view returns(uint){
   return datastore.getMedicinesCountFromConsultation(patientName, _consulDateID);
 }
// DOCTORS
function registerDoctor(bytes32 DoctorName, bytes memory ipfsHash) public returns(bool) {
   doctorstore.registerDoctor(DoctorName, ipfsHash);
   return true;
 }
function updateDoctor(bytes memory ipfsHash) public returns(bool){
   doctorstore.updateDoctor(ipfsHash);
 }

function getDoctorCount() public view returns(uint){
      return doctorstore.getDoctorCount();
 }

function getDoctorByIndex(uint index) public view returns(address,bytes32,bytes memory){
   return doctorstore.getDoctorByIndex(index);
 }

function getDoctorAddressByIndex(uint index) public view returns(address){
   return doctorstore.getDoctorAddressByIndex(index);
 }

function getDoctorNameByIndex(uint index) public view returns(bytes32){
   return doctorstore.getDoctorNameByIndex(index);
 }

function getDoctorIpfsHashByIndex(uint index) public view returns(bytes memory){
   return doctorstore.getDoctorIpfsHashByIndex(index);
 }

function getDoctorByAddress(address DoctorAddress) public view returns(uint, bytes32, bytes memory){
   return doctorstore.getDoctorByAddress(DoctorAddress);
 }

function getDoctorIndexByAddress(address DoctorAddress) public view returns(uint){
   return doctorstore.getDoctorIndexByAddress(DoctorAddress);
 }

function getDoctorNameByAddress(address DoctorAddress) public view returns(bytes32){
   return doctorstore.getDoctorNameByAddress(DoctorAddress);
 }

function getDoctorIpfsHashByAddress(address DoctorAddress) public view returns(bytes memory){
   return doctorstore.getDoctorIpfsHashByAddress(DoctorAddress);
 }

function getDoctorByDoctorName(bytes32 Doctorname) public view returns(uint,address,bytes memory){
   return doctorstore.getDoctorByDoctorName(Doctorname);
 }

function getDoctorIndexByDoctorName(bytes32 Doctorname) public view returns(uint){
   return doctorstore.getDoctorIndexByDoctorName(Doctorname);
 }

function getDoctorAddressByDoctorName(bytes32 Doctorname) public view returns(address){
   return doctorstore.getDoctorAddressByDoctorName(Doctorname);
 }

function getDoctorIpfsHashByDoctorName(bytes32 Doctorname) public view returns(bytes memory){
   return doctorstore.getDoctorIpfsHashByDoctorName(Doctorname);
 }
function saveMedicine(bytes32 mname, bytes memory ipfsHash) public returns(bool) {
   return medicinestore.saveMedicine(mname, ipfsHash);
 }

function updateMedicine(bytes memory ipfsHash) public returns(bool){
   return medicinestore.updateMedicine(ipfsHash);
 }

function getMedicineCount() public view returns(uint){
   return medicinestore.getMedicineCount();
 }
// function getMedicineByMedicinename(bytes32 mname) public view returns(Medicine){
//    return medicinestore.getMedicineByMedicinename(mname);
//  }

function getMedicineByIndex(uint index) public view returns(bytes32,bytes memory){
   return medicinestore.getMedicineByIndex(index);
 }

function getMedicineNameByIndex(uint index) public view returns(bytes32){
   medicinestore.getMedicineNameByIndex(index);
 }

function getMedIpfsHashByIndex(uint index) public view returns(bytes memory){
   return medicinestore.getMedIpfsHashByIndex(index);
 }

function getIpfsHashByMedicineName(bytes32 mname) public view returns(bytes memory){
   medicinestore.getIpfsHashByMedicineName(mname);
 }

}
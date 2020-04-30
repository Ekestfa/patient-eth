
const DoctorStorage = artifacts.require('../contract/DoctorStorage.sol')
const MedicineStorage = artifacts.require('../contract/MedicineStorage.sol')
// const Patient = artifacts.require('../contract/Patient.sol')
const PatientStorage = artifacts.require('../contract/PatientStorage.sol')

module.exports = function (deployer) {
  deployer.deploy(PatientStorage)
  // deployer.deploy(Patient)
  deployer.deploy(DoctorStorage)
  deployer.deploy(MedicineStorage)
 
}
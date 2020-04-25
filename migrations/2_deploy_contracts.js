const Consultation = artifacts.require('../contract/Consultation.sol')
const Doctor = artifacts.require('../contract/Doctor.sol')
const DoctorStorage = artifacts.require('../contract/DoctorStorage.sol')
const Medicine = artifacts.require('../contract/Medicine.sol')
const MedicineStorage = artifacts.require('../contract/MedicineStorage.sol')
const Patient = artifacts.require('../contract/Patient.sol')
const PatientStorage = artifacts.require('../contract/PatientStorage.sol')
const Test = artifacts.require('../contract/Test.sol')
const Client = artifacts.require('../contract/Client.sol')
// const ClientFactory = artifacts.require('../contract/ClientFactory.sol')

module.exports = function (deployer) {
  // deployer.deploy(ClientFactory)
  // deployer.deploy(Client)
  deployer.deploy(PatientStorage)
  deployer.deploy(DoctorStorage)
  deployer.deploy(MedicineStorage)
  deployer.deploy(Patient)
  deployer.deploy(Doctor)
  deployer.deploy(Medicine)

  deployer.deploy(Test)
 
}
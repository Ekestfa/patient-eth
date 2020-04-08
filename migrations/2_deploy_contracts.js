// const Usingref = artifacts.require('../contracts/UsingReferencePatient.sol')
// const PatientContract = artifacts.require('../contracts/PatientContract.sol')
// const ReferencedPatient = artifacts.require('../contracts/ReferencedPatient.sol')
// const ReferencingPatient = artifacts.require('../contracts/ReferencingPatient.sol')
const PatientIndex = artifacts.require('../contracts/PatientIndex.sol')
// const AllInOne = artifacts.require('../contracts/AllInOne.sol')

module.exports = function (deployer) {
  // deployer.deploy(TestStorage)
  // deployer.deploy(PatientIndex)
  // deployer.deploy(PatientContract)
  // deployer.deploy(ReferencingPatient)
  // deployer.deploy(ReferencedPatient)
  // deployer.deploy(Usingref)
  deployer.deploy(PatientIndex)
}

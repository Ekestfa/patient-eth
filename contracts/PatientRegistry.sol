pragma solidity >=0.5.16;
// import "./PatientFactory.sol";

// contract PatientRegistry {
//     address private patientAdd

//     function registerPatient(
//         bytes16 _uname,
//         bytes16 _passwd,
//         bytes16 _patName,
//         bytes16 _patSurnm,
//         bytes1 _patSex,
//         bytes16 _patBirth,
//         bytes16 _patPhone,
//         bytes16 _patEmail,
//         bytes32 _patAddress,
//         address addr,
//         uint16 ver,
//         bytes memory _ipfsHash) public returns (bool) {
//         // versions should start from 1
//         require(ver >= 1, "Version is equal to one or bigger than one");
//         Patient _patientinfo = new Patient(_uname, _passwd, _patName, _patSurnm, _patSex, _patBirth, _patPhone, _patEmail, _patAddress);
//         ContractDetails memory info; //= registry[_uname];
//         require(info.owner == msg.sender,"Owner error");
//         // create info if it doesn't exist in the registry
//         if (info.contractAddress == address(0)) {
//         info = ContractDetails({
//             owner: msg.sender,
//             contractAddress: addr,
//             uname: _uname,
//             patientinfo: _patientinfo,
//             version: ver,
//             ipfsHash: _ipfsHash
//           });
//         }
//         else {
//             //info.version = ver;
//             info.contractAddress = addr;
//         }
//         // update record in the registry
//         registry[_uname] = info;
//         return true;
//         }

//     function getPatientDetails(bytes16 _uname) public view returns(address, uint16) {
//          return (registry[_uname].contractAddress, registry[_uname].version);
//     }
// }
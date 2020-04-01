pragma solidity >=0.5.16;

// import "../client/contracts/UsingReferencePatient.sol";

// contract TestUsingReferencePatient{

//     function test() public{
//         bytes16 patientUname = "demo1";
//         bytes16 passwd = "demo1pass";
//         bytes16 patName = "demo1name";
//         bytes16 patSurnm = "demo1surnm";
//         bytes1 patSex = "M";
//         bytes16 patBirth = "19931910";
//         bytes16 patPhone = "12341235123";
//         bytes16 patEmail = "naskdjakfasldkm";
//         bytes32 patAddress = "Addresasdasdafadasdadfasd";
//         UsingReferencePatient usref = UsingReferencePatient(msg.sender);
//         //patientUname,passwd,patName,patSurnm,patSex,patBirth,patPhone,patEmail,patAddress
//         usref.PatientSaving(patientUname,passwd,patName,patSurnm,patSex,patBirth,patPhone,patEmail,patAddress);
//         emit username(usref.GetUserName());
//     }

//     event username(bytes16 u);
// }
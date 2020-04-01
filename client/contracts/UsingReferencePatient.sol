pragma solidity >=0.5.16;

import "./ReferencedPatient.sol";
import "./ReferencingPatient.sol";

contract UsingReferencePatient {
    ReferencingPatient referencing;
    constructor(address ref) public {
        referencing = ReferencingPatient(ref);
    }
    function PatientSaving(
        bytes16 patientUname,
        bytes16 passwd,
        bytes16 patName,
        bytes16 patSurnm,
        bytes1 patSex,
        bytes16 patBirth,
        bytes16 patPhone,
        bytes16 patEmail,
        bytes32 patAddress) public {
            address ret = referencing.getRef();
            ReferencedPatient referenced = ReferencedPatient(ret);
            referenced.setPatientUName(patientUname);
            referenced.setPassword(passwd);
            referenced.setPatientName(patName);
            referenced.setPatientSurname(patSurnm);
            referenced.setPatientSex(patSex);
            referenced.setPatientBirth(patBirth);
            referenced.setPatientPhone(patPhone);
            referenced.setPatientEmail(patEmail);
            referenced.setPatientAddress(patAddress);
        }
    function GetUserName() public view returns(bytes16){
            address ret = referencing.getRef();
            ReferencedPatient referenced = ReferencedPatient(ret);
            return referenced.getPatientUserName();
    }

}
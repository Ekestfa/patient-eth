pragma solidity >=0.5.16;

contract ReferencedPatient{
    struct Patient{
        bytes16 patientUname;
        bytes16 passwd;
        bytes16 patName;
        bytes16 patSurnm;
        bytes1 patSex;
        bytes16 patBirth;
        bytes16 patPhone;
        bytes16 patEmail;
        bytes32 patAddress;
    }
    Patient p;

    function setPatientUName(bytes16 _uname) public returns(bool){
        p.patientUname = _uname;
        return true;
    }

    function setPassword(bytes16 _pass) public returns(bool){
        p.passwd = _pass;
        return true;
    }

    function setPatientName(bytes16 _patName) public returns(bool){
        p.patName = _patName;
        return true;
    }

    function setPatientSurname(bytes16 _patSurnm) public returns(bool){
        p.patSurnm = _patSurnm;
        return true;
    }

    function setPatientSex(bytes1 _patSex) public returns(bool){
        p.patSex = _patSex;
        return true;
    }

    function setPatientBirth(bytes16 _patBirth) public returns(bool){
        p.patBirth = _patBirth;
        return true;
    }

    function setPatientPhone(bytes16 _patPhone) public returns(bool){
        p.patPhone = _patPhone;
        return true;
    }

    function setPatientEmail(bytes16 _patEmail) public returns(bool){
        p.patEmail = _patEmail;
        return true;
    }
    function setPatientAddress(bytes32 _patAddress) public returns(bool){
        p.patAddress = _patAddress;
        return true;
    }

    function getPatientUserName() public view returns(bytes16){
        return p.patientUname;
    }

    function getPassword() public view returns(bytes16){
        return p.passwd;
    }

    function getPatientName() public view returns(bytes16){
        return p.patName;
    }

    function getPatientSurname() public view returns(bytes16){
        return p.patSurnm;
    }

    function getPatientSex() public view returns(bytes1){
        return p.patSex;
    }

    function getPatientBirth() public view returns(bytes16){
        return p.patBirth;
    }

    function getPatientPhone() public view returns(bytes16){
        return p.patPhone;
    }

    function setPatientEmail() public view returns(bytes16){
        return p.patEmail;
    }
    function setPatientAddress() public view returns(bytes32){
        return p.patAddress;
    }
}
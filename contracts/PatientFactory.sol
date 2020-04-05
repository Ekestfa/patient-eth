pragma solidity >=0.5.16;

// contract Patient{
//     address patientInfoAddress;
//     mapping(bytes16 => uint) patientNameToIndex;
// }
//     struct PatientInfo{
//     bytes16 patientUname;
//     bytes16 passwd;
//     bytes16 patName;
//     bytes16 patSurnm;
//     bytes1 patSex;
//     bytes16 patBirth;
//     bytes16 patPhone;
//     bytes16 patEmail;
//     bytes32 patAddress;
//     }
//     mapping(address => PatientInfo) patientinfoaddres;

//     constructor(
//         bytes16 _patientUname,
//         bytes16 _passwd,
//         bytes16 _patName,
//         bytes16 _patSurnm,
//         bytes1 _patSex,
//         bytes16 _patBirth,
//         bytes16 _patPhone,
//         bytes16 _patEmail,
//         bytes32 _patAddress) public payable{
//             PatientInfo memory p;
//             p.patientUname = _patientUname;
//             p.passwd = _passwd;
//             p.patName = _patName;
//             p.patSurnm = _patSurnm;
//             p.patSex = _patSex;
//             p.patBirth = _patBirth;
//             p.patPhone = _patPhone;
//             p.patEmail = _patEmail;
//             p.patAddress = _patAddress;
//     }

//     function getPatientUserName(address ad) public view returns(bytes16){
//         return patientinfoaddres[ad].patientUname;
//     }

//     function getPassword(address ad) public view returns(bytes16){
//         return patientinfoaddres[ad].passwd;
//     }

//     function getPatientName(address ad) public view returns(bytes16){
//         return patientinfoaddres[ad].patName;
//     }

//     function getPatientSurname(address ad) public view returns(bytes16){
//         return patientinfoaddres[ad].patSurnm;
//     }

//     function getPatientSex(address ad) public view returns(bytes1){
//         return patientinfoaddres[ad].patSex;
//     }

//     function getPatientBirth(address ad) public view returns(bytes16){
//         return patientinfoaddres[ad].patBirth;
//     }

//     function getPatientPhone(address ad) public view returns(bytes16){
//         return patientinfoaddres[ad].patPhone;
//     }

//     function getPatientEmail(address ad) public view returns(bytes16){
//         return patientinfoaddres[ad].patEmail;
//     }
//     function getPatientAddress(address ad) public view returns(bytes32){
//         return patientinfoaddres[ad].patAddress;
//     }


    // function setPatientUName(address _address, bytes16 _uname) public view returns(bool){
    //     Patient memory p = patientregistry[_address];
    //     p.patientUname = _uname;
    //     return true;
    // }

    // function setPassword(bytes16 _pass) public pure returns(bool){
    //     Patient memory p;
    //     p.passwd = _pass;
    //     return true;
    // }

    // function setPatientName(bytes16 _patName) public pure returns(bool){
    //     Patient memory p;
    //     p.patName = _patName;
    //     return true;
    // }

    // function setPatientSurname(bytes16 _patSurnm) public pure returns(bool){
    //     Patient memory p;
    //     p.patSurnm = _patSurnm;
    //     return true;
    // }

    // function setPatientSex(bytes1 _patSex) public pure returns(bool){
    //     Patient memory p;
    //     p.patSex = _patSex;
    //     return true;
    // }

    // function setPatientBirth(bytes16 _patBirth) public pure returns(bool){
    //     Patient memory p;
    //     p.patBirth = _patBirth;
    //     return true;
    // }

    // function setPatientPhone(bytes16 _patPhone) public pure returns(bool){
    //     Patient memory p;
    //     p.patPhone = _patPhone;
    // return true;
//     }

//     function setPatientEmail(bytes16 _patEmail) public pure returns(bool){
//         Patient memory p;
//         p.patEmail = _patEmail;
//         return true;
//     }
//     function setPatientAddress(bytes32 _patAddress) public pure returns(bool){
//         Patient memory p;
//         p.patAddress = _patAddress;
//         return true;
//     }
// }
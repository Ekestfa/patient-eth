pragma solidity >=0.5.16;
import "./PatientContract.sol";


contract ReferencingPatient is PatientContract {
    address  referenced;


    function getRef() public view  returns(address){
        return referenced;
    }

//we implement a little security to allow only contract owner to change ref
// for better security chek  openZeppelin ownable pattern.
    function changeRef(address newRef)  public onlyPatient{
        referenced = newRef;
    }
}
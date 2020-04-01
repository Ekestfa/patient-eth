pragma solidity >=0.5.16;

contract PatientContract {
  address public patient = msg.sender;

  /// @notice check if the caller is the owner of the contract
  modifier onlyPatient {
    if (msg.sender != patient) revert("Doesn't a patient!");
    _;
    }

  /// @notice change the owner of the contract
  /// @param _newPatient the address of the new owner of the contract.
  function changeOwner(address _newPatient)
  public
  onlyPatient
  {
    if(_newPatient == address(0x0)) revert("New owner is null!");
    patient = _newPatient;
  }
}
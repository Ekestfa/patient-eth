pragma solidity >=0.5.16;
import "./Medicine.sol";

contract MedicineStorage{
    bytes32[] private medicineNames;
    bytes[] private medIpfsHash;
    mapping(bytes32 => uint) private medicinenameToIndex;
    Medicine m = new Medicine();
    // mapping(bytes32 => Medicine) private mednameToMedicine;

    constructor() public {
      medicineNames.push('temp');
      medIpfsHash.push('not-available');
    }

    function hasMedicine(bytes32 mname) public view returns(bool) {
        return (medicinenameToIndex[mname] > 0);
     }
    function saveMedicine(bytes32 mname, bytes memory ipfsHash) public returns(bool) {
        require(!hasMedicine(mname),
            "Medicine already exists!");
        //mednameToMedicine[mname] =
        m.createMedicine(mname,ipfsHash);
        medicineNames.push(mname);
        medIpfsHash.push(ipfsHash);
        medicinenameToIndex[mname] = medicineNames.length - 1;
        return true;
     }
    function updateMedicine(bytes memory ipfsHash) public returns(bool){
      m.updateMedicine(ipfsHash);
      return true;
     }

    function getMedicineCount() public view returns(uint){
      return medicineNames.length;
     }
    // function getMedicineByMedicinename(bytes32 mname) public view returns(Medicine){
    //   return mednameToMedicine[mname];
    //  }
    function getMedicineByIndex(uint index) public view returns(bytes32,bytes memory){
      require((index < medicineNames.length),
            "Index out of bound!");
      return(medicineNames[index], medIpfsHash[index]);
     }



    function getMedicineNameByIndex(uint index) public view returns(bytes32){
      require((index < medicineNames.length),
            "Index out of bound!");
      return medicineNames[index];
     }

    function getMedIpfsHashByIndex(uint index) public view returns(bytes memory){
      require((index < medicineNames.length),
            "Index out of bound!");
      return medIpfsHash[index];
     }
    function getIpfsHashByMedicineName(bytes32 mname) public view returns(bytes memory){
       return medIpfsHash[medicinenameToIndex[mname]];
     }
}
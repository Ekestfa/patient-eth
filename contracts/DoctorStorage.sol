pragma solidity >=0.5.16;
import "./Doctor.sol";

contract DoctorStorage {
   mapping(address => uint) private addressToIndex;
   mapping(bytes32 => uint) private doctornameToIndex;
   address[] private addresses;
   bytes32[] private doctorUnames;
   bytes[] private ipfsHashes;
   Doctor p = new Doctor();

   constructor() public {
      addresses.push(msg.sender);
      doctorUnames.push('x');
      ipfsHashes.push('not-available');
   }
   function registerDoctor(bytes32 DoctorName, bytes memory ipfsHash) public returns(bool) {
     require(!hasDoctor(msg.sender),
            "Sender not authorized.");
     require(!DoctorNameTaken(DoctorName),
            "Doctor name has been taken.");
      p.createDoctor(DoctorName, ipfsHash);
      addresses.push(msg.sender);
      doctorUnames.push(DoctorName);
      ipfsHashes.push(ipfsHash);
      addressToIndex[msg.sender] = addresses.length - 1;
      doctornameToIndex[DoctorName] = addresses.length - 1;
      return true;
   }

   function hasDoctor(address _DoctorAdresses) public view returns(bool) {
      return (addressToIndex[_DoctorAdresses] > 0 || _DoctorAdresses == addresses[0]);
   }

   function DoctorNameTaken(bytes32 pname) public view returns(bool takenIndeed) {
      return (doctornameToIndex[pname] > 0 || pname == 'self');
   }

   function updateDoctor(bytes memory ipfsHash) public returns(bool){
      require(!hasDoctor(msg.sender),
            "Sender not authorized.");
      p.updateDoctor(ipfsHash);
      return true;
   }

   function getDoctorCount() public view returns(uint){
      return addresses.length;
   }

   function getDoctorByIndex(uint index) public view returns(address,bytes32,bytes memory){
      require((index < addresses.length),
            "Index out of bound!");
      return(addresses[index], doctorUnames[index], ipfsHashes[index]);
   }

   function getDoctorAddressByIndex(uint index) public view returns(address){
      require((index < addresses.length),
            "Index out of bound!");
      return addresses[index];
   }

   function getDoctorNameByIndex(uint index) public view returns(bytes32){
      require((index < addresses.length),
            "Index out of bound!");
      return doctorUnames[index];
   }

   function getDoctorIpfsHashByIndex(uint index) public view returns(bytes memory){
      require((index < addresses.length),
            "Index out of bound!");
      return ipfsHashes[index];
   }

   function getDoctorByAddress(address DoctorAddress) public view returns(uint, bytes32, bytes memory){
      require(hasDoctor(DoctorAddress),
            "Doctor doesn't exist!");
      return(addressToIndex[DoctorAddress], doctorUnames[addressToIndex[DoctorAddress]], ipfsHashes[addressToIndex[DoctorAddress]]);
   }

   function getDoctorIndexByAddress(address DoctorAddress) public view returns(uint){
      require(hasDoctor(DoctorAddress),
            "Doctor doesn't exist!");
      return addressToIndex[DoctorAddress];
   }

   function getDoctorNameByAddress(address DoctorAddress) public view returns(bytes32){
      require(hasDoctor(DoctorAddress),
            "Doctor doesn't exist!");
      return doctorUnames[addressToIndex[DoctorAddress]];
   }

   function getDoctorIpfsHashByAddress(address DoctorAddress) public view returns(bytes memory){
      require(hasDoctor(DoctorAddress),
            "Doctor doesn't exist!");
      return ipfsHashes[addressToIndex[DoctorAddress]];
   }

   function getDoctorByDoctorName(bytes32 Doctorname) public view returns(uint,address,bytes memory){
      require((doctornameToIndex[Doctorname] < addresses.length),
            "Doctor index out of bound!");
      return(doctornameToIndex[Doctorname], addresses[doctornameToIndex[Doctorname]], ipfsHashes[doctornameToIndex[Doctorname]]);
   }

   function getDoctorIndexByDoctorName(bytes32 Doctorname) public view returns(uint){
      require((DoctorNameTaken(Doctorname)),
            "Can't find the Doctor!");
      return doctornameToIndex[Doctorname];
   }

   function getDoctorAddressByDoctorName(bytes32 Doctorname) public view returns(address){
      require((DoctorNameTaken(Doctorname)),
        "Can't find the Doctor!");
      return addresses[doctornameToIndex[Doctorname]];
   }

   function getDoctorIpfsHashByDoctorName(bytes32 Doctorname) public view returns(bytes memory){
      require((DoctorNameTaken(Doctorname)),
            "Can't find the Doctor!");
      return ipfsHashes[doctornameToIndex[Doctorname]];
   }
}
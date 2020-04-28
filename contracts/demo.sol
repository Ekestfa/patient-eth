pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract demo {
    address addr;
    bytes32 name;
    bytes32[] list;

    constructor(address adr, bytes32 _name) public {
        addr = adr;
        name = _name;
    }

    mapping(bytes32 => uint) private nametolist;

    function createDemo(bytes32 _name) public returns(bool) {
        list.push(_name);
        nametolist[_name] = list.length;
        return true;
    }

    function getDemoContract()public view returns(address){
        return address(this);
    }

    function getDemoList() public view returns (bytes32[] memory){
        return list;
    }
}
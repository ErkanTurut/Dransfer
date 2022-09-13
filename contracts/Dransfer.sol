// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
contract DransferStorage is ReentrancyGuard {

    struct Directory {
        string hash;
        uint fileDate;
        bool fileStatus;
    }


    address payable public immutable owner; // the account that receives fees
    uint public immutable fee; // the fee percentage on sales 

       constructor(uint _fee) {
        owner = payable(msg.sender);
        fee= _fee;
    }
 

    mapping(address => mapping(uint => Directory)) private UserDirectories;
    mapping(address => uint[]) public UserDirectoriesIndex;


    function store(string memory _hash) public {
        uint index = UserDirectoriesIndex[msg.sender].length;
        UserDirectories[msg.sender][index] = Directory(_hash, block.timestamp, true);
        UserDirectoriesIndex[msg.sender].push(index);
    }


    function getAllFiles() public view returns (Directory[] memory) {
        require(UserDirectoriesIndex[msg.sender].length > 0, "Dransfer: You have no files");
        uint[] memory indexes = UserDirectoriesIndex[msg.sender];
        Directory[] memory files = new Directory[](indexes.length);
        for (uint i = 0; i < indexes.length; i++) {
            files[i] = UserDirectories[msg.sender][indexes[i]];
        }
        return files;
    }

    function getUserDirectory(uint x) public view returns (Directory memory){
    return UserDirectories[msg.sender][x];
    }


}
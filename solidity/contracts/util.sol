// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./crowdfund.sol";
import "./reward.sol";

contract UtilContract is Ownable {
    CrowdfundContract public cContract;
    RewardContract public rContract;
    address cContractAddr;
    address rContractAddr;

    function setContracts(address _crowdfund, address _reward) public onlyOwner {
        cContract = CrowdfundContract(_crowdfund);
        rContract = RewardContract(_reward);
        cContractAddr = _crowdfund;
        rContractAddr = _reward;
    }

    function getContracts() public view returns(CrowdfundContract, RewardContract) {
        return (cContract, rContract);
    }

    function getContractsAddrs() public view returns(address, address) {
        return (cContractAddr, rContractAddr);
    }
    
/////////////////////////////////////////////
///////////////// MODIFIER //////////////////
/////////////////////////////////////////////


    modifier onlyCContract {
        require(msg.sender == cContractAddr, "ONLY CROWDCONTRACT CALL THIS FUNCTION");
        _;
    }
    modifier onlyRContract(address _sender) {
        require(msg.sender == rContractAddr, "ONLY REWARDCONTRACT CALL THIS FUNCTION");
        _;
    }

    // modifier isCrowdfundExist(string memory _filmName) {
    //     require(cContract.getCrowdfundIdxByFilmName(_filmName) > 0, "CROWDFUND NOT EXIST");
    //     _;
    // }


/////////////////////////////////////////////
///////////////// UTIL FUNC /////////////////
/////////////////////////////////////////////
    function stringCompare(string memory _str1, string memory _str2) public pure returns(bool) {
        if(keccak256(abi.encodePacked(_str1)) == keccak256(abi.encodePacked(_str2))){
            return true;
        } else{
            return false;
        }
    }
}
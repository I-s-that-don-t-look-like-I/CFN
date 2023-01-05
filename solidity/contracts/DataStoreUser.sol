// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./crowdfund.sol";
import "./reward.sol";
import "./util.sol";

contract DBUserContract is Ownable{
    CrowdfundContract public cContract;
    RewardContract public rContract;
    address cContractAddr;
    address rContractAddr;

    function setContracts(address _crowdfund, address _reward)
     public onlyOwner {
        cContract = CrowdfundContract(_crowdfund);
        rContract = RewardContract(_reward);
        cContractAddr = _crowdfund;
        rContractAddr = _reward;
    }

    function getContractsAddrs()
     public view returns(address, address) {
        return (cContractAddr, rContractAddr);
    }

    modifier onlyCFN(address _sender) {
        require(_sender == cContractAddr
            || _sender == rContractAddr
            , "ONLY CFN CONTRACTS CALL THIS FUNCTION");
        _;
    }

    struct sUser {
        string nickName;
        uint points;
        uint timestamp;
        string[] aFundedList;
        string[] aCrowdfundVoteList;
        string[] aCrowdfundMakeList;
    }

    mapping(address => sUser) mUserList;
    
    // User => filmName => pro/con => count
    mapping(address => mapping(string => mapping(bool => uint))) mUserVoteList;

    modifier isUserExist(address _userAddr) {
        require(mUserList[_userAddr].timestamp > 0, "USER DOES NOT EXIST");
        _;
    }

    function getUser(address _userAddr)
     public view isUserExist(_userAddr) returns(sUser memory) {
        return mUserList[_userAddr];
    }

    function getUserVoteList(address _userAddr, string memory _filmName)
     external view isUserExist(_userAddr) returns(uint, uint) {
        return (mUserVoteList[_userAddr][_filmName][true], mUserVoteList[_userAddr][_filmName][false]);
    }

    function setUser(address _sender, string memory _nickName)
     external {
        require(mUserList[_sender].timestamp == 0, "USER ALREADY EXIST");
        mUserList[_sender] = sUser(_nickName, 100, block.timestamp, new string[](0), new string[](0), new string[](0));
    }

    function setUserVoteList(address _userAddr, string memory _filmName, bool _side, uint _count)
     external isUserExist(_userAddr) {
        mUserVoteList[_userAddr][_filmName][_side] += _count;
    }

    function pushUserFundedList(address _userAddr, string memory _filmName)
     external isUserExist(_userAddr) {
        mUserList[_userAddr].aFundedList.push(_filmName);
    }

    function pushUserVoteList(address _userAddr, string memory _filmName)
     external isUserExist(_userAddr) {
        mUserList[_userAddr].aCrowdfundVoteList.push(_filmName);
    }

    function pushCrowdfundMakeList(address _userAddr, string memory _filmName)
     external isUserExist(_userAddr) {
         mUserList[_userAddr].aCrowdfundMakeList.push(_filmName);
    }

    function setPointAdd(address _userAddr, uint _points)
     external isUserExist(_userAddr) {
        require(_points > 0, "INPUT 0 ERROR");
        mUserList[_userAddr].points += _points;
    }

    function setPointSub(address _userAddr, uint _points)
     external isUserExist(_userAddr) {
        require(_points > 0, "INPUT 0 ERROR");
        require(getUser(_userAddr).points >= _points,"NOT ENOUGH POINT");
        mUserList[_userAddr].points -= _points;
    }
}
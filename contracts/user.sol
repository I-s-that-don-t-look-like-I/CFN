// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
// =====================
// user
// =====================
import "@openzeppelin/contracts/access/Ownable.sol";
import "./crowdfund.sol";
import "./reward.sol";

contract UserContract { 
    CrowdfundContract cContract;
    RewardContract rContract;
    address cContractAddr;
    address rContractAddr;

    function setRewardContract(address _rewardContract) public {
        rContract = RewardContract(_rewardContract);
        rContractAddr = _rewardContract;
    }

    constructor(address _crowdfundAddr) {
        cContract = CrowdfundContract(_crowdfundAddr);
        cContractAddr = _crowdfundAddr;
    }

    struct sUser {
        string nickName;
        uint points;
        uint timestamp;
        string[] aFundedList;
        string[] aCrowdfundVoteList;
    }

    mapping(address => sUser) mUserList;
    mapping(address => CrowdfundContract.sFund[]) mUserToFundList;
    
    // U ser => filmName => pro/con => count
    mapping(address => mapping(string => mapping(bool => uint))) mUserVoteList;

    modifier checkUserExist(address _userAddr) {
        require(mUserList[_userAddr].timestamp != 0, "USER NOT EXIST!!");
        _;
    }

    modifier isCrowdfundContract(address _sender) {
        require(_sender == cContractAddr, "ONLY CROWDFUND CONTRACT CAN CALL");
        _;
    }

    function setUser(string memory _nickName) public {
        require(mUserList[msg.sender].timestamp == 0, "USER ALREADY EXIST");
        mUserList[msg.sender] = sUser(_nickName, 0, block.timestamp, new string[](0), new string[](0));
    }

    function getUser(address _userAddr) public view checkUserExist(_userAddr) returns(sUser memory) {
        return mUserList[_userAddr];
    }

    function pushFundInfoToUser(string memory _filmName, address _userAddr, uint _itemIndex, uint _amount, uint _value)
     public isCrowdfundContract(msg.sender) checkUserExist(_userAddr) {
        mUserList[_userAddr].aFundedList.push(_filmName);
        mUserToFundList[_userAddr].push(
            CrowdfundContract.sFund(_userAddr, _itemIndex, _amount, _amount * _value, block.timestamp, CrowdfundContract.eFundStatus.PENDING));
    }

    function setVotingInfo(address _userAddr, string memory _filmName, bool _side, uint _count)
     public isCrowdfundContract(msg.sender) checkUserExist(_userAddr) {
        mUserList[_userAddr].aCrowdfundVoteList.push(_filmName);
        mUserVoteList[_userAddr][_filmName][_side] += _count;
        setPointSub(_userAddr, _count);
    }

    function setPointAdd(address _userAddr, uint _points) public checkUserExist(_userAddr) {
        require(_points != 0, "INPUT 0 ERROR");
        mUserList[_userAddr].points += _points;
    }

    function setPointSub(address _userAddr, uint _points) public checkUserExist(_userAddr) {
        require(_points != 0, "INPUT 0 ERROR");
        require(mUserList[_userAddr].points >= _points,"NOT ENOUGH POINT");
        mUserList[_userAddr].points -= _points;
    }

    function getUserFundList(address _userAddr) public view checkUserExist(_userAddr)
     returns(CrowdfundContract.sFund[] memory) {
        return mUserToFundList[_userAddr];
    }

    function getUserVoteProConCount(address _userAddr, string memory _filmName)
     public view checkUserExist(_userAddr) returns(uint, uint) {
        return (mUserVoteList[_userAddr][_filmName][true], mUserVoteList[_userAddr][_filmName][false]);
    }
}
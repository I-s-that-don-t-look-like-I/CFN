// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
import "./util.sol";
// import "./DataStore.sol";

/////////////////////////////////////////////
/////////////////// USER ////////////////////
/////////////////////////////////////////////
contract DBUserContract {
    // UtilContract utilContract;
    // DBContract DBCont;
    // address utilContractAddr;
    // address DBContractAddr;

    // constructor(address _utilContract, address _dbc) {
    //     utilContract = UtilContract(_utilContract);
    //     utilContractAddr = _utilContract;
    //     DBContractAddr = _dbc;
    // }

    struct sUser {
        string nickName;
        uint points;
        uint timestamp;
        string[] aFundedList;
        string[] aCrowdfundVoteList;
    }

    mapping(address => sUser) mUserList;
    
    // User => filmName => pro/con => count
    mapping(address => mapping(string => mapping(bool => uint))) mUserVoteList;

    function getUser(address _userAddr) public view returns(sUser memory) {
        return mUserList[_userAddr];
    }

    function getUserVoteList(address _userAddr, string memory _filmName)
     public view returns(uint, uint) {
        return (mUserVoteList[_userAddr][_filmName][true], mUserVoteList[_userAddr][_filmName][false]);
    }

    function setUser(address _sender, string memory _nickName) external {
        require(mUserList[_sender].timestamp == 0, "USER ALREADY EXIST");
        mUserList[_sender] = sUser(_nickName, 0, block.timestamp, new string[](0), new string[](0));
    }

    function setUserVoteList(address _userAddr, string memory _filmName, bool _side, uint _count) external {
        mUserVoteList[_userAddr][_filmName][_side] += _count;
    }

    function pushUserFundedList(address _sender, string memory _filmName) external {
        mUserList[_sender].aFundedList.push(_filmName);
    }

    function pushUserVoteList(address _sender, string memory _filmName) external {
        mUserList[_sender].aCrowdfundVoteList.push(_filmName);
    }

    function setPointAdd(address _userAddr, uint _points) public {
        require(_points > 0, "INPUT 0 ERROR");
        mUserList[_userAddr].points += _points;
    }

    function setPointSub(address _userAddr, uint _points) public {
        require(_points > 0, "INPUT 0 ERROR");
        require(getUser(_userAddr).points >= _points,"NOT ENOUGH POINT");
        mUserList[_userAddr].points -= _points;
    }
}
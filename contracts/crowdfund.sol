// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
// Naming Rules
// type + name with CamelCase
// type
// enum : e    struct : s    Array[] : a    mapping : m    
// ex) enum eStatus{}
// ex) struct sUser{}
// ex) mapping(string=>User) mUserList
// ex) User[] aUserList
import "@openzeppelin/contracts/access/Ownable.sol";

import "./user.sol";
import "./reward.sol";
import "./fundItems.sol";

contract CrowdfundContract is Ownable {
    UserContract uContract;
    RewardContract rContract;
    FundItemsContract fContract;
    address uContractAddr;
    address rContractAddr;
    address fContractAddr;

    function setContracts(address _userContract, address _rewardContract, address _fundContract) public onlyOwner {
        uContract = UserContract(_userContract);
        rContract = RewardContract(_rewardContract);
        fContract = FundItemsContract(_fundContract);
        uContractAddr = _userContract;
        rContractAddr = _rewardContract;
        fContractAddr = _fundContract;
    }

    struct sCrowdfund {
        string filmName; // title + "__" + directorName // ex) "Avatar 2__James Cameron"
        address director;
        string imgUrl;
        string synopsis;
        uint targetAmount;
        uint startTime;
        uint endTime;
        uint voteStartTime;
        uint voteEndTime;
        eStatus status;
        uint pros;
        uint cons;
        address[] aPros;
        address[] aCons;
    }
    enum eStatus {BD, DIP, WAITING, FUNDING, PENDING, SUCCESS, FAIL}
    // DIP     -> Decision in process
    // WAITING -> Before startTime
    // FUNDING -> Funding on going
    // PENDING -> After endTime or Pausing
    // SUCCESS -> After endTime && reach targetAmount
    // FAIL    -> After endTime && !reach targetAmount

    //filmName(title+directorName) => crowdfundsArrIdx
    mapping(string => uint) mCrowdfundIdxList;
    //crowdfundsArr[crowdfundIdxMapping[_filmName]]
    sCrowdfund[] aCrowdfundList;
    // Use getCrowdfundByFilmName() to get Crowdfund by filmName
    mapping(eStatus => sCrowdfund[]) mStatusCrowdfundList;

    constructor() {
        aCrowdfundList.push(
            sCrowdfund("title__directorName",0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,"ImgUrl","Synopsis",
            1*10**18,652287600,block.timestamp,block.timestamp, block.timestamp + 7 days,
            eStatus.SUCCESS,99,1, new address[](0), new address[](0)));
    }

    modifier isCrowdfundExist(string memory _filmName) {
        require(getCrowdfundIdxByFilmName(_filmName) != 0, "ERROR : CROWDFUNDING DOES NOT EXIST");
        _;
    }

    // pay to set crowdfund for avoiding bots
    // 0.0001 ether // 100,000 Gwei
    function setCrowdfund(string memory _filmName, string memory _imgUrl, string memory _synopsis, 
     uint _tgAmt,  uint _startTime, uint _endTime, uint _voteStartTime, uint _voteEndTime)
     public payable{
        require(msg.value == (1*10**18) / (10**4),"ERROR : YOU MUST PAY 0.0001 ETHER TO CREATE CROWDFUND");
        require(_startTime < _endTime, "ERROR : CHECK YOUR START & END TIME");
        require(mCrowdfundIdxList[_filmName] == 0,"ERROR : SAME FILMNAME ALREADY EXIST");
        mCrowdfundIdxList[_filmName] = aCrowdfundList.length;
        aCrowdfundList.push(sCrowdfund(_filmName, msg.sender,_imgUrl, _synopsis, _tgAmt, _startTime, _endTime, _voteStartTime, _voteEndTime, eStatus.BD, 0, 0, new address[](0), new address[](0)));
        mStatusCrowdfundList[eStatus.BD].push(sCrowdfund(_filmName, msg.sender,_imgUrl, _synopsis, _tgAmt, _startTime, _endTime, _voteStartTime, _voteEndTime, eStatus.BD, 0, 0, new address[](0), new address[](0)));
    }

    function removeStatusCrowdfund(eStatus _status, uint _idx) private onlyOwner{
        uint len = mStatusCrowdfundList[_status].length;
        mStatusCrowdfundList[_status][_idx] = mStatusCrowdfundList[_status][len-1];
        mStatusCrowdfundList[_status].pop();
    }

    function changeStatusCrowdfund(eStatus _BeforeStatus, uint _BeforeIdx, eStatus _AfterStatus) private onlyOwner {
        mStatusCrowdfundList[_AfterStatus].push(mStatusCrowdfundList[_BeforeStatus][_BeforeIdx]);
        removeStatusCrowdfund(_BeforeStatus, _BeforeIdx);
    }

    function findIdxStatusCrowdfund(eStatus _status, string memory _filmName) public view returns(bool, uint) {
        for(uint i=0; i < mStatusCrowdfundList[_status].length; i++){
            if(stringCompare(mStatusCrowdfundList[_status][i].filmName, _filmName)){
                return (true, i);
            }
        }
        require(false,"ERROR : CANNOT FIND CROWDFUND");
        return(false,0);
    }

    function getsCrowdfundByKeyValue(string memory _filmName) public view returns(sCrowdfund memory) {
        return aCrowdfundList[mCrowdfundIdxList[_filmName]];
    }

    function getCrowdfundIdxByFilmName(string memory _filmName) public view returns(uint) {
        return mCrowdfundIdxList[_filmName];
    }

    function getCrowdfundByIdx(uint _index) public view returns(sCrowdfund memory) {
        return aCrowdfundList[_index];
    }

    function setCrowdfundStatus(string memory _filmName) public onlyOwner {
        sCrowdfund memory crowdFund = aCrowdfundList[mCrowdfundIdxList[_filmName]];
        eStatus statusPrev = crowdFund.status;
        eStatus statusNext = statusPrev;
        uint timeNow = block.timestamp;

        if(timeNow >= crowdFund.voteStartTime && timeNow < crowdFund.voteEndTime){
            statusNext = eStatus.DIP;
        }else if(timeNow >= crowdFund.voteEndTime && timeNow < crowdFund.startTime) {
            if(crowdFund.pros >= crowdFund.cons){
                statusNext = eStatus.WAITING;
            }
            else{
                statusNext = eStatus.PENDING;
            }
        }else if(timeNow >= crowdFund.startTime && timeNow < crowdFund.endTime){
            if(statusPrev == eStatus.WAITING){
                statusNext = eStatus.FUNDING;
            }
            else{
                statusNext = eStatus.PENDING;
            }
        } else if(timeNow >= crowdFund.endTime && timeNow < crowdFund.endTime + 3 days){
            statusNext = eStatus.PENDING;
        } else if(timeNow >= crowdFund.endTime + 3 days) {
            uint totalAmount = fContract.getTotalPriceByFilmName(_filmName);
            if(totalAmount >= getTargetAmount(_filmName)){
                statusNext = eStatus.SUCCESS;
                payable(crowdFund.director).transfer(totalAmount);
// CHANGE ALL FUNDING RECORDS STATUS "PENDING" TO "PAID"
            } else {
                statusNext = eStatus.FAIL;
            }
        }
        require(statusPrev!=statusNext,"ERROR : STATUS NOT CHANGED");
        (bool tmp, uint idx) = findIdxStatusCrowdfund(statusPrev, _filmName);
        require(tmp, "ERROR : CANNOT FIND CROWDFUND");
        changeStatusCrowdfund(statusPrev, idx, statusNext);
        aCrowdfundList[mCrowdfundIdxList[_filmName]].status = statusNext;
    }

    function setFundStatusForced(string memory _filmName, eStatus _status) public onlyOwner {
        aCrowdfundList[mCrowdfundIdxList[_filmName]].status = _status;
    }

    function getStartTime(string memory _filmName) public view returns(uint) {
        return aCrowdfundList[mCrowdfundIdxList[_filmName]].startTime;
    }
    
    function getEndTime(string memory _filmName) public view returns(uint) {
        return aCrowdfundList[mCrowdfundIdxList[_filmName]].endTime;
    }

    function getTargetAmount(string memory _filmName) public view returns(uint) {
        return aCrowdfundList[mCrowdfundIdxList[_filmName]].targetAmount;
    }

    function voteCrowdfund(string memory _filmName, bool _vote, uint _count) public returns(uint, uint){
        require(uContract.getUser(msg.sender).points >= _count,"ERROR : NOT ENOUGH POINTS");
        require(_count > 0, "ERROR : INVALID COUNT");
        require(aCrowdfundList[mCrowdfundIdxList[_filmName]].status == eStatus.DIP,"ERROR : STATUS ERROR");
        if(_vote){
            aCrowdfundList[mCrowdfundIdxList[_filmName]].aPros.push(msg.sender);
            aCrowdfundList[mCrowdfundIdxList[_filmName]].pros += _count;

        } else{
            aCrowdfundList[mCrowdfundIdxList[_filmName]].aCons.push(msg.sender);
            aCrowdfundList[mCrowdfundIdxList[_filmName]].cons += _count;
        }
        uContract.setVotingInfo(msg.sender, _filmName, _vote, _count);
        return (aCrowdfundList[mCrowdfundIdxList[_filmName]].aPros.length, aCrowdfundList[mCrowdfundIdxList[_filmName]].aCons.length);
    }

    function getStatusCrowdfundList(eStatus _status) public view returns(sCrowdfund[] memory) {
        return mStatusCrowdfundList[_status];
    }

    function stringCompare(string memory _str1, string memory _str2) public pure returns(bool) {
        if(keccak256(abi.encodePacked(_str1)) == keccak256(abi.encodePacked(_str2))){
            return true;
        } else{
            return false;
        }
    }
}
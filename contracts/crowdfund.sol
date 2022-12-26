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

contract CrowdfundContract is Ownable {
    UserContract uContract;
    RewardContract rContract;
    address uContractAddr;
    address rContractAddr;

    function setContracts(address _userContract, address _rewardContract) public onlyOwner {
        uContract = UserContract(_userContract);
        rContract = RewardContract(_rewardContract);
        uContractAddr = _userContract;
        rContractAddr = _rewardContract;
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

    constructor() {
        aCrowdfundList.push(
            sCrowdfund("title__directorName",0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,"ImgUrl","Synopsis",
            1*10**18,652287600,block.timestamp,block.timestamp, block.timestamp + 7 days,
            eStatus.SUCCESS,99,1, new address[](0), new address[](0)));
    }

    // pay to set crowdfund for avoiding bots 
    // 0.0001 ether // 100,000 Gwei
    function setCrowdfund(string memory _filmName, string memory _imgUrl, string memory _synopsis, 
     uint _tgAmt,  uint _startTime, uint _endTime, uint _voteStartTime, uint _voteEndTime)
     public payable{
        require(msg.value == (1*10**18) / (10**4),"YOU MUST PAY 0.0001 ETHER TO CREATE CROWDFUND");
        require(_startTime < _endTime, "CHECK YOUR START & END TIME");
        require(mCrowdfundIdxList[_filmName] == 0,"SAME FILMNAME EXIST");
        mCrowdfundIdxList[_filmName] = aCrowdfundList.length;
        aCrowdfundList.push(sCrowdfund(_filmName, msg.sender,_imgUrl, _synopsis, _tgAmt, _startTime, _endTime, _voteStartTime, _voteEndTime, eStatus.BD, 0, 0, new address[](0), new address[](0)));
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
            uint totalAmount = getTotalPriceByFilmName(_filmName);
            if(totalAmount >= getTargetAmount(_filmName)){
                statusNext = eStatus.SUCCESS;
                payable(crowdFund.director).transfer(totalAmount);
// CHANGE ALL FUNDING RECORDS STATUS "PENDING" TO "PAID"
            } else {
                statusNext = eStatus.FAIL;
            }
        }
        require(statusPrev!=statusNext,"STATUS NOT CHANGED");
        aCrowdfundList[mCrowdfundIdxList[_filmName]].status = statusNext;
    }

    // When Fund DIP is end. Change Status to WAITING until startTime.
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
        require(uContract.getUser(msg.sender).points >= _count,"NOT ENOUGH POINTS");
        require(_count > 0, "INVALID COUNT");
        require(aCrowdfundList[mCrowdfundIdxList[_filmName]].status == eStatus.DIP,"STATUS ERROR");
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
    
// =====================
// fund items
// =====================
    struct sFundingItem {
        string[] content;
        eOptions[] rewards;
        uint price;
        uint totalAmount;
        uint remainAmount;
    }
    enum eOptions {NO_REWARDS, ENDING_CREDIT, IMG_NFT, VIDEO_NFT_10, VIDEO_NFT_20, VIDEO_NFT_30, INVITATION, MY_PROPS}

    mapping(string => sFundingItem[]) mFundingItemList;
    mapping(string => mapping(eOptions => uint)) mOptionAmountList;

    function setFundingItems(string memory _filmName, string[] memory _content, uint _price, uint _amount ,eOptions[] memory _options) public {
        require(mCrowdfundIdxList[_filmName] != 0, "CROWDFUND IS NOT EXIST");
        require(msg.sender == getsCrowdfundByKeyValue(_filmName).director,"DIRECTOR ONLY");
        mFundingItemList[_filmName].push(sFundingItem(_content, _options, _price, _amount, _amount));
        for(uint i=0; i<_options.length; i++){
            mOptionAmountList[_filmName][_options[i]] += _amount;
        }
    }

    function delFundingItems(string memory _filmName, uint _idx) public {
        require(msg.sender == getsCrowdfundByKeyValue(_filmName).director,"DIRECTOR ONLY");
        require(_idx >= 0 && _idx < mFundingItemList[_filmName].length, "INVALID IDX VALUE");
        for(uint i=_idx; i< mFundingItemList[_filmName].length-1; i++){
            mFundingItemList[_filmName][i] = mFundingItemList[_filmName][i+1];
        }
        mFundingItemList[_filmName].pop();
    }

    function getFundingItems(string memory _filmName) public view returns(sFundingItem[] memory) {
        return mFundingItemList[_filmName];
    }

    function getRewardItemAmount(string memory _filmName, eOptions _opt) public view returns(uint) {
        return mOptionAmountList[_filmName][_opt];
    }

// =====================
// funding record
// =====================
    struct sFund {
      address user;
      uint itemIndex;
      uint amount;
      uint totalPrice;
      uint timestamp;
      eFundStatus status;
    }

    enum eFundStatus {PENDING, PAIED, REJECTED}
    // PENDING : Wait for Start(?)
    // PAIED : Already Paid
    // REJECTED : Didn't paid by any reason

    // CrowdfundContract.crowdfundsArr INDEX => sFundList
    mapping(string => sFund[]) mFundList;

    function recordFunding(string memory _filmName, uint _itemIndex, uint _amount) public payable{
        require(mCrowdfundIdxList[_filmName] != 0, "ERROR : CROWDFUNDING DOES NOT EXIST");
        require(mFundingItemList[_filmName][_itemIndex].totalAmount > 0, "ERROR : ITEM DOES NOT EXIST");
        require(mFundingItemList[_filmName][_itemIndex].remainAmount > _amount, "CHECK AVAILABLE STOCK");
        require(block.timestamp <= getEndTime(_filmName),"ERROR : CROWDFUND IS CLOSED");
        require(block.timestamp >= getStartTime(_filmName) && aCrowdfundList[mCrowdfundIdxList[_filmName]].status == eStatus.FUNDING,"ERROR : CROWDFUND IS NOT OPENED YET");
        require(msg.value == mFundingItemList[_filmName][_itemIndex].price * _amount, "PAY EXACT PRICE");
        mFundList[_filmName].push(sFund(msg.sender, _itemIndex, _amount, msg.value, block.timestamp, eFundStatus.PENDING));
        uContract.pushFundInfoToUser(_filmName, msg.sender, _itemIndex, _amount, msg.value);
        mFundingItemList[_filmName][_itemIndex].remainAmount -= _amount;
    }

    function getTotalPriceByFilmName(string memory _filmName) public view returns(uint) {
        uint totalAmt;
        for(uint i=0; i<mFundList[_filmName].length; i++){
            totalAmt += mFundList[_filmName][i].totalPrice;
        }
        return totalAmt;
    }

    function getFundList(string memory _filmName) public view returns(sFund[] memory) {
        return mFundList[_filmName];
    }
}
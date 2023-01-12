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
import "./DataStore.sol";
import "./DataStoreUser.sol";

contract CrowdfundContract is Ownable {
    DBContract DBCont;
    address DBContAddr;
    DBUserContract DBUserCont;
    address DBUserContAddr;

    constructor(address _DBCont, address _DBUserCont) {
        DBCont = DBContract(_DBCont);
        DBContAddr = _DBCont;
        DBUserCont = DBUserContract(_DBUserCont);
        DBUserContAddr = _DBUserCont;
    }
    
    modifier isCrowdfundExist(string memory _filmName) {
        require(DBCont.getCrowdfundIdxByFilmName(_filmName) > 0, "CROWDFUND NOT EXIST");
        _;
    }

    // pay to set crowdfund for avoiding bots
    // 0.001 ether // 1,000,000 Gwei
    function makeCrowdfund(string memory _filmName, string memory _imgUrl, string memory _synopsis, 
     uint _tgAmt, uint _voteStartTime, uint _voteEndTime, uint _startTime, uint _endTime)
     public payable{
        require(msg.value == 0.001 ether,"ERROR : YOU MUST PAY 0.001 ETHER TO CREATE CROWDFUND");
        DBCont.setNewCrowdfund(msg.sender, _filmName, _imgUrl, _synopsis, _tgAmt, _voteStartTime, _voteEndTime, _startTime, _endTime);
        DBUserCont.pushCrowdfundMakeList(msg.sender, _filmName);
    }

    function setCrowdfundStatus(string memory _filmName)
     public onlyOwner {
        DBContract.sCrowdfund memory crowdFund = DBCont.getCrowdfundByFilmName(_filmName);
        DBContract.eStatus statusPrev = crowdFund.status;
        DBContract.eStatus statusNext = statusPrev;
        uint timeNow = block.timestamp;

        if(timeNow >= crowdFund.voteStartTime && timeNow < crowdFund.voteEndTime){
            statusNext = DBContract.eStatus.DIP;
        }else if(timeNow >= crowdFund.voteEndTime && timeNow < crowdFund.startTime) {
            if(crowdFund.pros >= crowdFund.cons){
                statusNext = DBContract.eStatus.WAITING;
            }
            else{
                statusNext = DBContract.eStatus.PENDING;
            }
        }else if(timeNow >= crowdFund.startTime && timeNow < crowdFund.endTime){
            if(statusPrev == DBContract.eStatus.WAITING){
                statusNext = DBContract.eStatus.FUNDING;
            }
            else{
                statusNext = DBContract.eStatus.PENDING;
            }
        } else if(timeNow >= crowdFund.endTime && timeNow < crowdFund.endTime + 3 days){
            statusNext = DBContract.eStatus.PENDING;
        } else if(timeNow >= crowdFund.endTime + 15 minutes) {
            uint totalAmount = getTotalPriceByFilmName(_filmName);
            if(totalAmount >= DBCont.getCrowdfundByFilmName(_filmName).targetAmount){
                statusNext = DBContract.eStatus.SUCCESS;
                payable(crowdFund.director).transfer(totalAmount);
// CHANGE ALL FUNDING RECORDS STATUS "PENDING" TO "PAID"
            } else {
                statusNext = DBContract.eStatus.FAIL;
            }
        }
        require(statusPrev!=statusNext,"ERROR : STATUS NOT CHANGED");
        uint idx = DBCont.getCrowdfundIdxByFilmName(_filmName);
        require(idx > 0, "ERROR : CANNOT FIND CROWDFUND");
        DBCont.changeStatusCrowdfund(_filmName, statusNext);
    }

    function ForceChangeCrowdfundStatus(string memory _filmName, DBContract.eStatus _status)
     public onlyOwner {
        uint idx = DBCont.getCrowdfundIdxByFilmName(_filmName);
        require(idx > 0, "ERROR : CANNOT FIND CROWDFUND");
        DBCont.changeStatusCrowdfund(_filmName, _status);
    }

    function voteCrowdfund(address _userAddr, string memory _filmName, bool _side, uint _count)
     public {
        require(DBUserCont.getUser(_userAddr).points >= _count,"ERROR : NOT ENOUGH POINTS");
        require(_count > 0, "ERROR : INVALID COUNT");
        require(DBCont.getCrowdfundByFilmName(_filmName).status == DBContract.eStatus.DIP,"ERROR : STATUS IS NOT DIP");
        // (uint _vst, uint _vet, uint _fst, uint _fet) = DBCont.getTimes(_filmName);
        // require(block.timestamp >= _vst, "NOT OPENED YET");
        // require(block.timestamp < _vet, "ALREADY CLOSED");
        // require(_fst < _fet);
        
        DBCont.setProsCons(_userAddr, _filmName, _side, _count);
        setUserVoteInfo(_userAddr, _filmName, _side, _count);
    }

/////////////////////////////////////////////
/////////////// FUNDING ITEMS ///////////////
/////////////////////////////////////////////
    function makeFundingItem(string memory _filmName, string[] memory _content, DBContract.eOptions[] memory _options, uint _price, uint _amount)
     public {
        require(msg.sender == DBCont.getCrowdfundByFilmName(_filmName).director,"ERROR : DIRECTOR ONLY");
 
        DBCont.setFundingItemList(_filmName, DBCont.setFundingItem(_price, _amount, _content, _options));
        DBCont.setOptionAmountList(_filmName, _options, _amount);
    }

    function deleteFundingItem(string memory _filmName, uint _idx)
     public {
        require(msg.sender == DBCont.getCrowdfundByFilmName(_filmName).director, "ERROR : DIRECTOR ONLY");
        require(_idx >= 0 && _idx < DBCont.getFundingItemList(_filmName).length, "ERROR : INVALID IDX VALUE");
        DBCont.removeFundingItem(_filmName, _idx);
    }

/////////////////////////////////////////////
////////////// FUNDING RECORDS //////////////
/////////////////////////////////////////////
    function buyFundItem(string memory _filmName, uint _itemIndex, uint _amount)
     public payable {
        require(DBCont.getCrowdfundIdxByFilmName(_filmName) > 0, "ERROR : CROWDFUND NOT EXIST");
        require(DBCont.getFundingItemList(_filmName)[_itemIndex].totalAmount > 0, "ERROR : ITEM DOES NOT EXIST");
        require(_amount > 0, "ERROR: INPUT AMOUNT MUST BE GT 0");
        require(DBCont.getFundingItemList(_filmName)[_itemIndex].remainAmount >= _amount, "ERROR : CHECK AVAILABLE STOCK");
        // (uint _vst, uint _vet, uint _startTime, uint _endTime) = DBCont.getTimes(_filmName);
        // require(block.timestamp >= _vst && block.timestamp >= _vet,"CHECK VST VET TIME");
        // require(block.timestamp <= _endTime,"ERROR : CROWDFUND IS CLOSED");
        require(DBCont.getCrowdfundByFilmName(_filmName).status == DBContract.eStatus.FUNDING, "ERROR : CROWDFUND IS NOT OPENED YET");
        require(msg.value == DBCont.getFundingItemList(_filmName)[_itemIndex].price * _amount, "ERROR : PAY EXACT PRICE");
        
        DBCont.pushFundReceiptList(_filmName, msg.sender, _itemIndex, _amount, msg.value, block.timestamp, DBContract.eReceiptStatus.PENDING);
        DBCont.pushUserToFundReceiptList(msg.sender, _itemIndex, _amount, msg.value, block.timestamp, DBContract.eReceiptStatus.PENDING);
        DBUserCont.pushUserFundedList(msg.sender, _filmName);
        DBCont.subRemainItemAmount(_filmName, _itemIndex, _amount);

        DBCont.rContract().mintReward(msg.sender, _filmName,DBContract.eOptions.IMG_NFT);
    }

    function getTotalPriceByFilmName(string memory _filmName)
     public view isCrowdfundExist(_filmName) returns(uint) {
        uint totalAmt;
        for(uint i=0; i < DBCont.getFundReceiptLength(_filmName); i++){
            totalAmt += DBCont.getFundReceiptList(_filmName)[i].totalPrice;
        }
        return totalAmt;
    }

/////////////////////////////////////////////
////////////////// USER /////////////////////
/////////////////////////////////////////////
    modifier isUserExist(address _userAddr) {
        require(DBUserCont.getUser(_userAddr).timestamp != 0, "USER NOT EXIST");
        _;
    }

    function getUser(address _userAddr) public view returns(DBUserContract.sUser memory) {
        return DBUserCont.getUser(_userAddr);
    }
    
    function getUserReceiptList(address _userAddr) public view returns(DBContract.sFundReceipt[] memory) {
        return DBCont.getUserToFundRecordList(_userAddr);
    }

    function getUserVoteCount(address _userAddr, string memory _filmName) public view returns(uint, uint) {
        return DBUserCont.getUserVoteList(_userAddr, _filmName);
    }

    function registUser(string memory _nickName) public {
        DBUserCont.setUser(msg.sender, _nickName);
    }

    function setUserVoteInfo(address _userAddr, string memory _filmName, bool _side, uint _count) public {
        DBUserCont.pushUserVoteList(_userAddr, _filmName);
        DBUserCont.setUserVoteList(_userAddr, _filmName, _side, _count);
        DBUserCont.setPointSub(_userAddr, _count);
    }

    function addPoints(address _userAddr, uint _points) public onlyOwner {
        DBUserCont.setPointAdd(_userAddr, _points);
    }
}
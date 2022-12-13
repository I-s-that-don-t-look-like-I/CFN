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


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CrowdfundContract is ERC721Enumerable, Ownable {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}
    
    struct sCrowdfund {
        string filmName; // title + "__" + directorName // ex) "Avatar 2__James Cameron"
        address director;
        uint targetAmount;
        uint maxAmount;
        uint minAmount;
        string imgUrl;
        uint startTime;
        uint endTime;
        eStatus status;
        address[] aPros;
        address[] aCons;
    }
    enum eStatus {DIP, WAITING, FUNDING, PENDING, SUCCESS, FAIL}
    // DIP Decision in process
    // WAITING -> before startTime
    // FUNDING -> funding on going
    // PENDING -> after endTime or Pausing
    // SUCCESS -> after endTime && reach targetAmount
    // FAIL    -> after endTime && !reach targetAmount

    //filmName(title+directorName) => crowdfundsArrIdx
    mapping(string => uint) mCrowdfundIdxList;
    //crowdfundsArr[crowdfundIdxMapping[_filmName]]
    sCrowdfund[] aCrowdfundList;
    // Use getCrowdfundByFilmName() to get Crowdfund by filmName

    // pay to set crowdfund for avoiding bots 
    // 0.0001 ether // 100,000 Gwei
    function setCrowdfund(string memory _filmName, uint _tgAmt, uint _mxAmt, uint _mnAmt,
     string memory _imgUrl, uint _startTime, uint _endTime)
     public payable{
        require(msg.value == (1*10**18) / (10**4),"YOU MUST PAY 0.0001 ETHER TO SET CROWDFUND DIP");
        require(_startTime < _endTime, "CHECK YOUR START & END TIME");
        mCrowdfundIdxList[_filmName] = aCrowdfundList.length + 1;
        aCrowdfundList.push(sCrowdfund(_filmName, msg.sender, _tgAmt, _mxAmt, _mnAmt, _imgUrl, _startTime, _endTime, eStatus.DIP, new address[](0), new address[](0)));
    }

    function getsCrowdfundByKeyValue(string memory _filmName) public view returns(sCrowdfund memory) {
        return aCrowdfundList[mCrowdfundIdxList[_filmName]];
    }

    function getCrowdfundIdxByFilmName(string memory _filmName) public view returns(uint) {
        return mCrowdfundIdxList[_filmName];
    }

    function setCrowdfundStatusByTime(string memory _filmName) public onlyOwner {
        uint timeNow = block.timestamp;
        if(timeNow >= aCrowdfundList[mCrowdfundIdxList[_filmName]].startTime){
            aCrowdfundList[mCrowdfundIdxList[_filmName]].status = eStatus.FUNDING;
        } else if(timeNow >= aCrowdfundList[mCrowdfundIdxList[_filmName]].endTime){
            aCrowdfundList[mCrowdfundIdxList[_filmName]].status = eStatus.PENDING;
        } else if(timeNow >= aCrowdfundList[mCrowdfundIdxList[_filmName]].endTime + 3 days) {
            uint totalAmount = getTotalAmountByFilmname(_filmName);
            if(totalAmount >= getTargetAmount(_filmName)){
                aCrowdfundList[mCrowdfundIdxList[_filmName]].status = eStatus.SUCCESS;
                payable(aCrowdfundList[mCrowdfundIdxList[_filmName]].director).transfer(totalAmount);
            } else {
                aCrowdfundList[mCrowdfundIdxList[_filmName]].status = eStatus.FAIL;
            }
        }
    }

    // When Fund DIP is end. Change Status to WAITING until startTime.
    function setFundStatusToWaiting(string memory _filmName) public onlyOwner {
        aCrowdfundList[mCrowdfundIdxList[_filmName]].status = eStatus.WAITING;
    }

    function getMaxAmount(string memory _filmName) public view returns(uint) {
        return aCrowdfundList[mCrowdfundIdxList[_filmName]].maxAmount;
    }

    function getMinAmount(string memory _filmName) public view returns(uint) {
        return aCrowdfundList[mCrowdfundIdxList[_filmName]].minAmount;
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
        for(uint i=0; i<_count;i++){
            if(_vote){
                aCrowdfundList[mCrowdfundIdxList[_filmName]].aPros.push(msg.sender);
            } else{
                aCrowdfundList[mCrowdfundIdxList[_filmName]].aCons.push(msg.sender);
            }
        }
        return (aCrowdfundList[mCrowdfundIdxList[_filmName]].aPros.length, aCrowdfundList[mCrowdfundIdxList[_filmName]].aCons.length);
    }

// =====================
// fund
// =====================
    struct sFund {
      address user;
      uint amount;
      uint timestamp;
      eFundStatus status;
    }

    enum eFundStatus {PENDING, PAIED, REJECTED}
    // PENDING : Wait for Start(?)
    // PAIED : Already Paid
    // REJECTED : Didn't paid by any reason

    // CrowdfundContract.crowdfundsArr INDEX => sFundList
    mapping(uint => sFund[]) mFundList;

    function setFund(string memory _filmName) public payable{
        require(mCrowdfundIdxList[_filmName] != 0, "ERROR : CROWDFUNDING DOES NOT EXIST");
        require(msg.value >= getMinAmount(_filmName),"ERROR : MIN FUND AMOUNT");
        require(msg.value <= getMaxAmount(_filmName),"ERROR : MAX FUND AMOUNT");
        require(msg.value + getTotalAmountByFilmname(_filmName) <= getTargetAmount(_filmName), "ERROR : EXCEEDS TARGET AMOUNT");
        require(block.timestamp >= getStartTime(_filmName),"ERROR : CROWDFUND IS NOT OPENED YET");
        require(block.timestamp <= getEndTime(_filmName),"ERROR : CROWDFUND IS CLOSED");
        uint idx = getCrowdfundIdxByFilmName(_filmName);
        mFundList[idx].push(sFund(msg.sender, msg.value, block.timestamp, eFundStatus.PENDING));
        pushFundInfoToUser(msg.sender, _filmName, msg.value);
    }

    function getTotalAmountByFilmname(string memory _filmName) public view returns(uint) {
        uint crowdfundIdx = mCrowdfundIdxList[_filmName];
        uint totalAmt;
        for(uint i=0; i<mFundList[crowdfundIdx].length; i++){
            totalAmt += mFundList[crowdfundIdx][i].amount;
        }
        return totalAmt;
    }

// =====================
// user
// =====================
    struct sUser {
        string nickName;
        string email;
        string[] aFundedList;
        string[] aProCrowdfundList;
    }

    mapping(address => sUser) mUserList;
    mapping(address => sFund[]) mUserToFundList;
    

    function setUser(string memory _nickName, string memory _email) public {
        mUserList[msg.sender] = sUser(_nickName, _email, new string[](0), new string[](0));
    }

    function getUser(address _userAddr) public view returns(sUser memory){
        return mUserList[_userAddr];
    }

    function pushFundInfoToUser(address _userAddr, string memory _filmName, uint _amount) public {
        mUserList[_userAddr].aFundedList.push(_filmName);
        mUserToFundList[_userAddr].push(sFund(_userAddr, _amount, block.timestamp, eFundStatus.PENDING));
    }
}
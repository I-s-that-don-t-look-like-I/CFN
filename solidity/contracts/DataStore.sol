// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
import "./util.sol";

contract DBContract is UtilContract {
    constructor() {
        aCrowdfundList.push(
            sCrowdfund("",address(this),"","",1,eStatus.SUCCESS,0,0,0,0,1,1, new address[](0), new address[](0)));
    }

/////////////////////////////////////////////
///////////////// CROWDFUND /////////////////
/////////////////////////////////////////////
    struct sCrowdfund {
        string filmName; // title + "__" + directorName // ex) "Avatar 2__James Cameron"
        address director;
        string imgUrl;
        string synopsis;
        uint targetAmount;
        eStatus status;
        uint voteStartTime;
        uint voteEndTime;
        uint startTime;
        uint endTime;
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
    // mapping(eStatus => sCrowdfund[]) mStatusCrowdfundList;
    mapping(eStatus => uint[]) mStatusCrowdfundList;

    function getCrowdfundByFilmName(string memory _filmName)
     public view returns(sCrowdfund memory) {
        require(mCrowdfundIdxList[_filmName] > 0, "ERROR : CROWDFUND NOT FOUND");
        require(stringCompare(_filmName, aCrowdfundList[mCrowdfundIdxList[_filmName]].filmName), "ERROR : WRONG DATA READED");
        return aCrowdfundList[mCrowdfundIdxList[_filmName]];
    }

    function getCrowdfundIdxByFilmName(string memory _filmName)
     public view returns(uint) {
        require(mCrowdfundIdxList[_filmName] > 0, "ERROR : CROWDFUND NOT FOUND");
        return mCrowdfundIdxList[_filmName];
    }

    function getCrowdfundByIdx(uint _index)
     public view returns(sCrowdfund memory) {
        require(_index < aCrowdfundList.length,"ERROR : INPUT VALUE EXCEEDS THE ARRAY LENGTH");
        require(_index > 0,"ERROR : INPUT VALUE MUST BE GREATER THAN 0");
        return aCrowdfundList[_index];
    }

    function getCrowdfundIdxListByStatus(eStatus _status)
     public view returns(uint[] memory) {
        require(mStatusCrowdfundList[_status].length > 0, "ERROR : DATA NOT FOUND");
        return mStatusCrowdfundList[_status];
    }

    function getCrowdfundListByStatus(eStatus _status)
     public view returns(sCrowdfund[] memory) {
        require(mStatusCrowdfundList[_status].length > 0, "ERROR : DATA NOT FOUND");
        
        uint len = mStatusCrowdfundList[_status].length;
        sCrowdfund[] memory resArr = new sCrowdfund[](len);
        for(uint i=0;i < len; i++){
            resArr[i] = getCrowdfundByIdx(mStatusCrowdfundList[_status][i]);
        }
        return resArr;
    }

    function getTimes(string memory _filmName)
     public view returns(uint, uint, uint, uint) {
        require(mCrowdfundIdxList[_filmName] > 0, "ERROR : CROWDFUND NOT FOUND");
        return (
            aCrowdfundList[mCrowdfundIdxList[_filmName]].voteStartTime,
            aCrowdfundList[mCrowdfundIdxList[_filmName]].voteEndTime,
            aCrowdfundList[mCrowdfundIdxList[_filmName]].startTime,
            aCrowdfundList[mCrowdfundIdxList[_filmName]].endTime
        );
    }

    function setCrowdfund(string memory _filmName, address _director, string memory _imgUrl, string memory _synopsis, 
     uint _tgAmt, uint _voteStartTime, uint _voteEndTime, uint _startTime, uint _endTime)
     private pure returns(sCrowdfund memory){
         return(sCrowdfund(_filmName, _director,_imgUrl, _synopsis, _tgAmt, eStatus.BD, _voteStartTime, _voteEndTime, _startTime, _endTime, 0, 0, new address[](0), new address[](0)));
     }

    function setCrowdfundIdxList(string memory _filmName, uint _idx)
     private {
        require(mCrowdfundIdxList[_filmName] == 0,"ERROR : CROWDFUND INDEX ALREADY EXIST");
        mCrowdfundIdxList[_filmName] = _idx;
    }

    function setCrowdfundList(string memory _filmName, address _director, string memory _imgUrl, string memory _synopsis, 
     uint _tgAmt, uint _voteStartTime, uint _voteEndTime, uint _startTime, uint _endTime) private {
        require(_tgAmt * _voteStartTime * _voteEndTime * _startTime * _endTime > 0, "ERROR : CHECK UINT VALUE");
        require(_voteStartTime < _voteEndTime, "ERROR : CHECK YOUR VOTE START & VOTE END TIME");
        require(_startTime < _endTime, "ERROR : CHECK YOUR START & END TIME");
        
        aCrowdfundList.push(setCrowdfund(_filmName, _director,_imgUrl, _synopsis, _tgAmt, _voteStartTime, _voteEndTime, _startTime, _endTime));
    }

    function setStatusCrowdfundList(string memory _filmName) private {
        require(mCrowdfundIdxList[_filmName] > 0, "ERROR : CROWDFUND NOT FOUND");
        mStatusCrowdfundList[eStatus.BD].push(mCrowdfundIdxList[_filmName]); 
    }

    function setNewCrowdfund(address _director, string memory _filmName, string memory _imgUrl, string memory _synopsis, 
     uint _tgAmt, uint _voteStartTime, uint _voteEndTime, uint _startTime, uint _endTime)
     external payable onlyCContract {
        setCrowdfundIdxList(_filmName, aCrowdfundList.length);
        setStatusCrowdfundList(_filmName);
        setCrowdfundList(_filmName, _director,_imgUrl, _synopsis, _tgAmt, _voteStartTime, _voteEndTime, _startTime, _endTime);
    }

    function removeStatusCrowdfund(eStatus _status, string memory _filmName) private {
        require(mStatusCrowdfundList[_status].length > 0, "ERROR : NO DATA TO REMOVE");
        bool flag = false;
        uint len = mStatusCrowdfundList[_status].length;
        for(uint i=0; i < mStatusCrowdfundList[_status].length; i++) {
            if(mStatusCrowdfundList[_status][i] == mCrowdfundIdxList[_filmName]) {
                flag = true;
                mStatusCrowdfundList[_status][i] = mStatusCrowdfundList[_status][len-1];
                mStatusCrowdfundList[_status].pop();
                break;
            }
        }
        require(flag, "ERROR : CROWDFUND STATUS NOT FOUND");        
    }

    function changeStatusCrowdfund(string memory _filmName, eStatus _AfterStatus)
     external onlyCContract {
        require(mCrowdfundIdxList[_filmName] > 0, "ERROR : CROWDFUND NOT FOUND");
        mStatusCrowdfundList[_AfterStatus].push(mCrowdfundIdxList[_filmName]);
        removeStatusCrowdfund(aCrowdfundList[mCrowdfundIdxList[_filmName]].status, _filmName);
        aCrowdfundList[mCrowdfundIdxList[_filmName]].status = _AfterStatus;
    }
    
    function setProsCons(address _sender, string memory _filmName, bool _side, uint _count) external {
        if(_side) {
            aCrowdfundList[mCrowdfundIdxList[_filmName]].aPros.push(_sender);
            aCrowdfundList[mCrowdfundIdxList[_filmName]].pros += _count;

        } else{
            aCrowdfundList[mCrowdfundIdxList[_filmName]].aCons.push(_sender);
            aCrowdfundList[mCrowdfundIdxList[_filmName]].cons += _count;
        }
    }

    function changeCrowdfundData(string memory _filmName, string memory _imgUrl, string memory _synopsis, 
     uint _tgAmt, uint _voteStartTime, uint _voteEndTime, uint _startTime, uint _endTime)
      public onlyOwner {
        require(mCrowdfundIdxList[_filmName] > 0, "ERROR : CROWDFUND NOT FOUND");
        mStatusCrowdfundList[eStatus.BD].push(mCrowdfundIdxList[_filmName]);
        removeStatusCrowdfund(aCrowdfundList[mCrowdfundIdxList[_filmName]].status, _filmName);
        aCrowdfundList[mCrowdfundIdxList[_filmName]] = setCrowdfund(_filmName, msg.sender, _imgUrl, _synopsis, 
        _tgAmt, _voteStartTime, _voteEndTime, _startTime, _endTime);
    }

/////////////////////////////////////////////
//////////////// FUND ITEMS /////////////////
/////////////////////////////////////////////
    struct sFundingItem {
        uint price;
        uint totalAmount;
        uint remainAmount;
        string[] content;
        eOptions[] rewards;
    }
    enum eOptions {NO_REWARDS, ENDING_CREDIT, IMG_NFT, VIDEO_NFT_10, VIDEO_NFT_20, VIDEO_NFT_30, INVITATION, MY_PROPS}

    mapping(string => sFundingItem[]) mFundingItemList;
    mapping(string => mapping(eOptions => uint)) mOptionAmountList;

    function getFundingItemList(string memory _filmName)
     public view returns(sFundingItem[] memory) {
        return mFundingItemList[_filmName];
    }

    function getRewardOptionAmount(string memory _filmName, eOptions _opt)
     public view returns(uint) {
        return mOptionAmountList[_filmName][_opt];
    }

    function setFundingItem(uint _price, uint _amount, string[] memory _content, eOptions[] memory _options)
     public pure returns(sFundingItem memory) {
        return sFundingItem(_price, _amount, _amount, _content, _options);
    }

    function setFundingItemList(string memory _filmName, sFundingItem memory _fundingItem)
     external {
        mFundingItemList[_filmName].push(_fundingItem);
    }

    function setOptionAmountList(string memory _filmName, eOptions[] memory _options, uint _amount)
     external {
        for(uint i=0; i<_options.length; i++){
            mOptionAmountList[_filmName][_options[i]] += _amount;
        }
    }

    function removeFundingItem(string memory _filmName, uint _idx)
     external {
        for(uint i=_idx; i< mFundingItemList[_filmName].length-1; i++) {
            mFundingItemList[_filmName][i] = mFundingItemList[_filmName][i+1];
        }
        mFundingItemList[_filmName].pop();
    }

    function subRemainItemAmount(string memory _filmName, uint _idx, uint _amount) external {
        mFundingItemList[_filmName][_idx].remainAmount -= _amount;
    }

/////////////////////////////////////////////
///////////// FUNDING RECEIPTS //////////////
/////////////////////////////////////////////
    struct sFundReceipt {
      address user;
      uint itemIndex;
      uint amount;
      uint totalPrice;
      uint timestamp;
      eReceiptStatus status;
    }

    enum eReceiptStatus {PENDING, PAIED, REJECTED}
    // PENDING : Wait for Start
    // PAIED : Already Paid
    // REJECTED : Didn't paid by any reason

    mapping(string => sFundReceipt[]) mFundReceiptList;
    mapping(address => sFundReceipt[]) mUserToFundReceiptList;

    function getFundReceiptList(string memory _filmName) public view returns(sFundReceipt[] memory) {
        return mFundReceiptList[_filmName];
    }
    
    function getFundReceiptLength(string memory _filmName) public view returns(uint) {
        return mFundReceiptList[_filmName].length;
    }

    function getUserToFundRecordList(address _userAddr) public view returns(sFundReceipt[] memory) {
        return mUserToFundReceiptList[_userAddr];
    }
    
    function setFundReceipt(address _userAddr, uint _itemIndex, uint _amount, uint _totalPrice, uint _timestamp, eReceiptStatus _status)
     private pure returns(sFundReceipt memory) {
        return sFundReceipt(_userAddr, _itemIndex, _amount, _totalPrice, _timestamp, _status);
    }

    function pushFundReceiptList(string memory _filmName, address _userAddr, uint _itemIndex, uint _amount, uint _totalPrice, uint _timestamp, eReceiptStatus _status)
     external {
        mFundReceiptList[_filmName].push(setFundReceipt(_userAddr, _itemIndex, _amount, _totalPrice, _timestamp, _status));
    }

    function pushUserToFundReceiptList(address _userAddr, uint _itemIndex, uint _amount, uint _totalPrice, uint _timestamp, eReceiptStatus _status)
     external {
        mUserToFundReceiptList[_userAddr].push(setFundReceipt(_userAddr, _itemIndex, _amount, _totalPrice, _timestamp, _status));
    }
}
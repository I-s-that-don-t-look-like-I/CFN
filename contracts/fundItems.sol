// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./crowdfund.sol";
import "./user.sol";
import "./reward.sol";

// =====================
// fund items
// =====================

contract FundItemsContract is Ownable{
    CrowdfundContract cContract;
    UserContract uContract;
    RewardContract rContract;
    address cContractAddr;
    address uContractAddr;
    address rContractAddr;

    constructor(address _crowdfundAddr) {
        cContract = CrowdfundContract(_crowdfundAddr);
        cContractAddr = _crowdfundAddr;
    }

    function setContracts(address _userContract, address _rewardContract) public onlyOwner {
        uContract = UserContract(_userContract);
        rContract = RewardContract(_rewardContract);
        uContractAddr = _userContract;
        rContractAddr = _rewardContract;
    }

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

    modifier isCrowdfundExist(string memory _filmName) {
        require(cContract.getCrowdfundIdxByFilmName(_filmName) != 0, "ERROR : CROWDFUNDING DOES NOT EXIST");
        _;
    }

    function setFundingItems(string memory _filmName, string[] memory _content, uint _price, uint _amount ,eOptions[] memory _options)
     public isCrowdfundExist(_filmName) {
        require(msg.sender == cContract.getsCrowdfundByKeyValue(_filmName).director,"ERROR : DIRECTOR ONLY");
        mFundingItemList[_filmName].push(sFundingItem(_content, _options, _price, _amount, _amount));
        for(uint i=0; i<_options.length; i++){
            mOptionAmountList[_filmName][_options[i]] += _amount;
        }
    }

    function delFundingItems(string memory _filmName, uint _idx) public {
        require(msg.sender == cContract.getsCrowdfundByKeyValue(_filmName).director,"ERROR : DIRECTOR ONLY");
        require(_idx >= 0 && _idx < mFundingItemList[_filmName].length, "ERROR : INVALID IDX VALUE");
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
    // PENDING : Wait for Start
    // PAIED : Already Paid
    // REJECTED : Didn't paid by any reason

    mapping(string => sFund[]) mFundList;

    function recordFunding(string memory _filmName, uint _itemIndex, uint _amount) public payable isCrowdfundExist(_filmName) {
        require(mFundingItemList[_filmName][_itemIndex].totalAmount > 0, "ERROR : ITEM DOES NOT EXIST");
        require(_amount > 0, "ERROR: INPUT AMOUNT MUST BE GT 0");
        require(mFundingItemList[_filmName][_itemIndex].remainAmount >= _amount, "ERROR : CHECK AVAILABLE STOCK");
        require(block.timestamp <= cContract.getEndTime(_filmName),"ERROR : CROWDFUND IS CLOSED");
        require(block.timestamp >= cContract.getStartTime(_filmName) && cContract.getsCrowdfundByKeyValue(_filmName).status == CrowdfundContract.eStatus.FUNDING,"ERROR : CROWDFUND IS NOT OPENED YET");
        require(msg.value == mFundingItemList[_filmName][_itemIndex].price * _amount, "ERROR : PAY EXACT PRICE");
        mFundList[_filmName].push(sFund(msg.sender, _itemIndex, _amount, msg.value, block.timestamp, eFundStatus.PENDING));
        uContract.pushFundInfoToUser(_filmName, msg.sender, _itemIndex, _amount, msg.value);
        mFundingItemList[_filmName][_itemIndex].remainAmount -= _amount;
    }

    function getTotalPriceByFilmName(string memory _filmName) public view isCrowdfundExist(_filmName) returns(uint) {
        uint totalAmt;
        for(uint i=0; i<mFundList[_filmName].length; i++){
            totalAmt += mFundList[_filmName][i].totalPrice;
        }
        return totalAmt;
    }

    function getFundList(string memory _filmName) public view isCrowdfundExist(_filmName) returns(sFund[] memory) {
        return mFundList[_filmName];
    }
}
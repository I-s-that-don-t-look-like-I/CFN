// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CrowdfundContract is ERC721Enumerable, Ownable {

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}
    
    struct Crowdfund {
        string filmName;
        address director;
        uint targetAmount;
        uint maxAmount;
        uint minAmount;
        string imgUrl;
        uint startTime;
        uint endTime;
        Status status;
    }
    enum Status {DIP, NOTOPEN, FUNDING, PENDING, SUCCESS, FAIL}
    // DIP Decision in process
    // NOTOPEN -> before startTime
    // FUNDING -> funding on going
    // PENDING -> after endTime or Pausing
    // SUCCESS -> after endTime && reach targetAmount
    // FAIL    -> after endTime && !reach targetAmount

    Crowdfund[] crowdfundsArr;
    //filmName => crowdfundsArrIdx
    //crowdfundsArr[crowdfundIdxMapping[_filmName]]
    mapping(string => uint) crowdfundIdxMapping;

    // pay for make crowdfund and payback after fund endTime
    // 0.0001 ether
    function setCrowdfund(string memory _filmName, uint _tgAmt, 
     uint _mxAmt, uint _mnAmt, string memory _imgUrl, uint _startTime, uint _endTime)
     public payable{
        require(msg.value >= 10**14,"YOU MUST PAY 0.0001 ETHER TO MAKE CROWDFUND");
        crowdfundIdxMapping[_filmName] = crowdfundsArr.length;
        crowdfundsArr.push(Crowdfund(_filmName, msg.sender, _tgAmt, _mxAmt, _mnAmt, _imgUrl, _startTime, _endTime, Status.DIP));
    }

    function getCrowdfund(string memory _filmName) public view returns(Crowdfund memory) {
        return crowdfundsArr[crowdfundIdxMapping[_filmName]];
    }

    function setFundStatus(string memory _filmName, Status _status) public onlyOwner {
        crowdfundsArr[crowdfundIdxMapping[_filmName]].status = _status;
    }

}

contract Film is Ownable{
    constructor(){
        
    }
}
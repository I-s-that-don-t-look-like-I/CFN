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
    address userContractAddr;
    address fundContractAddr;
    function setUContractAddr(address _uContAddr) public onlyOwner {
        userContractAddr = _uContAddr;
    }
    function setFundContractAddr(address _fContAddr) public onlyOwner {
        fundContractAddr = _fContAddr;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}
    
    struct sCrowdfund {
        string filmName; // title + "#" + directorName + "#"
        address director;
        uint targetAmount;
        uint maxAmount;
        uint minAmount;
        string imgUrl;
        uint startTime;
        uint endTime;
        eStatus status;
        string[] stringData;
    }
    enum eStatus {DIP, WAITING, FUNDING, PENDING, SUCCESS, FAIL}
    // DIP Decision in process
    // WAITING -> before startTime
    // FUNDING -> funding on going
    // PENDING -> after endTime or Pausing
    // SUCCESS -> after endTime && reach targetAmount
    // FAIL    -> after endTime && !reach targetAmount

    //filmName(title+directorName) => crowdfundsArrIdx
    mapping(string => uint) crowdfundIdxMapping;
    //crowdfundsArr[crowdfundIdxMapping[_filmName]]
    sCrowdfund[] crowdfundsArr;
    // Use getCrowdfundByFilmName() to get Crowdfund by filmName

    // pay to set crowdfund for avoiding bots 
    // 0.0001 ether // 100,000 Gwei
    function setCrowdfund(string memory _filmName, uint _tgAmt, uint _mxAmt, uint _mnAmt,
     string memory _imgUrl, uint _startTime, uint _endTime)
     public payable{
        require(msg.value == (1*10**18) / (10**4),"YOU MUST PAY 0.0001 ETHER TO SET CROWDFUND DIP");
        require(_startTime < _endTime, "CHECK YOUR START & END TIME");
        crowdfundIdxMapping[_filmName] = crowdfundsArr.length;
        crowdfundsArr.push(sCrowdfund(_filmName, msg.sender, _tgAmt, _mxAmt, _mnAmt, _imgUrl, _startTime, _endTime, eStatus.DIP, new string[](0)));
    }

    function getsCrowdfundByKeyValue(string memory _filmName) public view returns(sCrowdfund memory) {
        return crowdfundsArr[crowdfundIdxMapping[_filmName]];
    }

    function getCrowdfundIdxByFilmName(string memory _filmName) public view returns(uint) {
        return crowdfundIdxMapping[_filmName];
    }

    function setFundStatus(string memory _filmName, eStatus _status) public onlyOwner {
        crowdfundsArr[crowdfundIdxMapping[_filmName]].status = _status;
    }

    // When Fund DIP is end. Change Status to WAITING until startTime.
    function setFundStatusToWaiting(string memory _filmName) public onlyOwner {
        setFundStatus(_filmName, eStatus.WAITING);
    }

    function setStringData(string memory _filmName, string memory _strData) private onlyOwner {
        crowdfundsArr[crowdfundIdxMapping[_filmName]].stringData.push(_strData);
    }

    function helloWorld() public pure returns(string memory){
        return string.concat("Hello, World!");
    }

    function get
}

contract UserContract is Ownable {
    address fContractAddr;
    function setFContractAddr(address _fundContractAddr) public onlyOwner {
        fContractAddr = _fundContractAddr;
    }

    address cContractAddr;

    constructor(address _crowdfundContractAaddr) {
        cContractAddr = _crowdfundContractAaddr;
    }

    struct sUser {
        string nickName;
        string email;
        uint[] fundedArr;
        string[] stringData;
    }

    mapping(address => sUser) mUserList;

    function setUser(string memory _nickName, string memory _email) public {
        mUserList[msg.sender] = sUser(_nickName, _email, new uint[](0), new string[](0));
    }

    function getUser(address _userAddr) public view returns(sUser memory){
        return mUserList[_userAddr];
    }

    function pushFundedArr(address _userAddr, uint _fundIdx) public {
        require(msg.sender == fContractAddr, "ONLY FUNDCONTRACT CAN PUSH");
        mUserList[_userAddr].fundedArr.push(_fundIdx);
    }
}

// fund list
contract Funding is Ownable {
    CrowdfundContract cContract;
    address cContractAddr;
    UserContract uContract;
    address uContractAddr;

    constructor(address _crowdContractAddr, address _userContractAddr) {
        cContractAddr = _crowdContractAddr;
        cContract = CrowdfundContract(_crowdContractAddr);
        uContractAddr = _userContractAddr;
        uContract = UserContract(_userContractAddr);
    }
    struct sFund {
      address user;
      uint amount;
      uint timestamp;
      eStatus status;
      string[] stringData;
    }

    enum eStatus {PENDING, PAIED, REJECTED}
    // PENDING : Wait for Start(?)
    // PAIED : Already Paid
    // REJECTED : Didn't paid by any reason

    // CrowdfundContract.crowdfundsArr INDEX => sFundList
    mapping(uint => sFund[]) mFundList;

    function setFund(string memory _filmName) public payable{
        uint idx = cContract.getCrowdfundIdxByFilmName(_filmName);
        require(msg.value >= 0);
        // mFundList[idx].push(sFund(msg.sender, _amount, block.timestamp, eStatus.PENDING));
        mFundList[idx].push(sFund(msg.sender, msg.value, block.timestamp, eStatus.PENDING, new string[](0)));
        uContract.pushFundedArr(msg.sender, idx);
    }

}
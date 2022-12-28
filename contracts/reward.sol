// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./crowdfund.sol";
import "./user.sol";
import "./fundItems.sol";

// =====================
// reward
// =====================

contract RewardContract is ERC721Enumerable, Ownable {
    CrowdfundContract cContract;
    FundItemsContract fContract;
    UserContract uContract;
    address cContractAddr;
    address fContractAddr;
    address uContractAddr;

    constructor(string memory _name, string memory _symbol, address _crowdfundAddr, address _userAddr, address _fundContractAddr) ERC721(_name, _symbol) {
        cContract = CrowdfundContract(_crowdfundAddr);
        fContract = FundItemsContract(_fundContractAddr);
        uContract = UserContract(_userAddr);
        cContractAddr = _crowdfundAddr;
        fContractAddr = _fundContractAddr;
        uContractAddr = _userAddr;
    }

    modifier isCrowdfundContract(address _addr) {
        require(_addr == cContractAddr, "ONLY CROWDFUND CONTRACT CAN CALL");
        _;
    }

// filmName => Reward Option => tokenId
    mapping(string => mapping(FundItemsContract.eOptions => uint[])) mtokenIdList;
// filmName => MetadataURI
    mapping(string => string) mFilmNameToMetadataURI;
    mapping(uint => string) tokenIdToFilmName;

    function setMetadataURI(string memory _filmName, string memory _metadataURI) public {
        mFilmNameToMetadataURI[_filmName] = _metadataURI;
    }

    function tokenURI(uint _tokenId) public override view returns(string memory) {
        string memory metaURI = mFilmNameToMetadataURI[tokenIdToFilmName[_tokenId]];
        return string.concat(metaURI,"/",Strings.toString(_tokenId),".json");
    }

    function mintReward(string memory _filmName, FundItemsContract.eOptions _opt) public onlyOwner {
        require(fContract.getRewardItemAmount(_filmName, _opt) > 0,"ITEM DOES NOT EXIST");
        require(fContract.getRewardItemAmount(_filmName, _opt) >= mtokenIdList[_filmName][_opt].length,
         "CANNOT MINT MORE");
        uint tokenId = totalSupply() + 1;
        tokenIdToFilmName[tokenId] = _filmName;
        mtokenIdList[_filmName][_opt].push(tokenId);
        _mint(msg.sender, tokenId);
    }
}
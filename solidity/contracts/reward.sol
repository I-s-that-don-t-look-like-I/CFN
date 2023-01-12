// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./DataStore.sol";
import "./DataStoreUser.sol";
import "./crowdfund.sol";

/////////////////////////////////////////////
////////////////// REWARD ///////////////////
/////////////////////////////////////////////
contract RewardContract is ERC721Enumerable, Ownable {
    DBContract DBCont;
    address DBContAddr;
    DBUserContract DBUserCont;
    address DBUserContAddr;

    constructor(string memory _name, string memory _symbol, address _dbc, address _dbuc) ERC721(_name, _symbol) {
        DBCont = DBContract(_dbc);
        DBContAddr = _dbc;
        DBUserCont = DBUserContract(_dbuc);
        DBUserContAddr = _dbuc;
    }

// filmName => Reward Option => tokenId
    mapping(string => mapping(DBContract.eOptions => uint[])) mtokenIdList;
// filmName => MetadataURI
    mapping(string => string) mFilmNameToMetadataURI;
    mapping(uint => string) tokenIdToFilmName;

    function setMetadataURI(string memory _filmName, string memory _metadataURI) public {
        mFilmNameToMetadataURI[_filmName] = _metadataURI;
    }

    function tokenURI(uint _tokenId) public override view returns(string memory) {
        string memory metaURI = mFilmNameToMetadataURI[tokenIdToFilmName[_tokenId]];
        return string.concat(metaURI, Strings.toString(_tokenId), ".json");
    }

    function mintReward(address userAddr, string memory _filmName, DBContract.eOptions _opt) public {
        require(DBCont.getRewardOptionAmount(_filmName, _opt) > 0,"ITEM DOES NOT EXIST");
        require(DBCont.getRewardOptionAmount(_filmName, _opt) >= mtokenIdList[_filmName][_opt].length,
         "CANNOT MINT MORE");
        uint tokenId = totalSupply() + 1;
        tokenIdToFilmName[tokenId] = _filmName;
        mtokenIdList[_filmName][_opt].push(tokenId);
        _mint(userAddr, tokenId);
    }
}
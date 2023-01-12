// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DataStore.sol";

contract FundingReward is ERC1155 {
    string public name;
    string public symbol;
    mapping(uint => string) metadataUri;
    struct RewardNFT{
        uint[] NFTId;
        uint[] NFTAmount;
    }
    DataStore datastoreContract
    RewardNFT rewardnft;
    
    constructor(string memory _name, string memory _symbol) ERC1155("") {
        name = _name;
        symbol = _symbol;
     
    }
    function setNameSymbol(string memory _name, string memory _symbol) public {
        name = _name;
        symbol = _symbol;    
    }

    function setPostNFT(uint _nftID, uint _amount) public {
        rewardnft.NFTId.push(_nftID);
        rewardnft.NFTAmount.push(_amount);
    }

    function setVideoNFT(uint _nftID, uint _vNFTAmount) public {
        require(_nftID > rewardnft.NFTId.length);
        for(uint i = 1; i <= _vNFTAmount; i ++) {
           rewardnft.NFTId.push(_nftID + i);
           rewardnft.NFTAmount.push(1);
       }
    }
    
    function fundingNFTMint() public {
        for(uint i = 0; i < rewardnft.NFTId.length; i++) {
            _mint(msg.sender, rewardnft.NFTId[i], rewardnft.NFTAmount[i], "");
        }
    }

    function setUri(uint _tokenId, string memory _metadataUri) public {
        metadataUri[_tokenId] = _metadataUri;
    }

    function uri(uint _tokenId) public override view returns(string memory) {
        return metadataUri[_tokenId];
    }
    
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not token owner or approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
    }

    
}
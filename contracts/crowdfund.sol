// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CrowdfundContract is ERC721Enumerable, Ownable {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    struct Crowdfund {
        string film_name;
        address director;
        
        
    }
}
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CrowdfundContract is ERC721Enumerable, Ownable {
    address owner;
    constructor(string memory _name, string memory _symbol, address _idleContract) ERC721(_name, _symbol) {
        owner = _idleContract;
    }

    uint index;

    struct Crowdfund {
        uint index;
        string film_name;
        address director;
        uint target_amount;
        uint start_time;
        uint end_time;
        string imgUrl;
        STATUS status;
        uint min_amount;
        uint max_amount;
    }
    enum STATUS {PENDING, FUNDING, DONE, SUCCESS, FAILURE}
    // mapping()
}
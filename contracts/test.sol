// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract A {
    function pubFunction() public pure returns(string memory) {
        return "public function";
    }
    function priFunction() private pure returns(string memory) {
        return "private function";
    }
    function interFunction() internal pure returns(string memory) {
        return "internal function";
    }
    function exterFunction() external pure returns(string memory) {
        return "external function";
    }
}

contract B {
    A contA;
    address contAAddr;
    constructor(address _A){
        contA = A(_A);
        contAAddr = _A;
    }

    function pub() public view {
        contA.pubFunction();
    }
    // function pri() public view {
    //     contA.priFunction();
    // }
    // function inter() public view {
    //     contA.interFunction();
    // }
    function exter() public view {
        contA.exterFunction();
    }
}

contract C is A{
    // A contA;
    // address contAAddr;
    // constructor(address _A){
    //     contA = A(_A);
    //     contAAddr = _A;
    // }

    // function pub() public pure {
    //     A.pubFunction();
    // }
    // function pri() public view {
    //     A.priFunction();
    // }
    // function inter() public pure {
    //     A.interFunction();
    // }
    // function exter() public view {
    //     A.exterFunction();
    // }
}
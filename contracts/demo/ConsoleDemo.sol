pragma solidity ^0.7.4;


import 'hardhat/console.sol';


contract ConsoleDemo {

    uint public demoNumber = 6;

    constructor() {
    }

    function increase() public {
        console.log("demoNumber before increase: %d", demoNumber);
        demoNumber = demoNumber + 5;
        string memory tag = "for debug";
        console.log("demoNumber: %d", demoNumber);
        console.log("tag: %s", tag);
    }
}

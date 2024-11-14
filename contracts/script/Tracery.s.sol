// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Tracery} from "../src/Tracery.sol";
import "@openzeppelin-contracts-5.1.0/token/ERC20/ERC20.sol";

contract GovernanceToken is ERC20 {
    constructor() ERC20("Governance Token", "GOV") {
        _mint(msg.sender, 1000000);
    }
}

contract TraceryScript is Script {
    Tracery public tracery;
    GovernanceToken public governanceToken;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Deploy a mock ERC20 token to use as the governance token

        // Deploy the Tracery contract with the governanceToken address
        governanceToken = new GovernanceToken();
        tracery = new Tracery(address(governanceToken));

        // Add members to the Tracery contract
        address alice = address(0x1);
        address bob = address(0x2);
        tracery.addMember(alice);
        tracery.addMember(bob);

        // Transfer some governance tokens to Bob
        governanceToken.transfer(bob, 500000);

        vm.stopBroadcast();
    }
}

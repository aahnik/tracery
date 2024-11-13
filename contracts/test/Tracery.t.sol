// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "forge-std/Test.sol";
import "./Tracery.sol";

contract GovernanceToken is ERC20 {
    constructor() ERC20("Governance Token", "GOV") {
        _mint(msg.sender, 1000000);
    }
}

contract DAOTreasuryTest is Test {
    DAOTreasury public treasury;
    GovernanceToken public governanceToken;
    address public alice = address(0x1);
    address public bob = address(0x2);
    address public carol = address(0x3);

    function setUp() public {
        governanceToken = new GovernanceToken();
        treasury = new DAOTreasury(address(governanceToken));
        treasury.addMember(alice);
        treasury.addMember(bob);
        governanceToken.transfer(bob, 500000);
    }

    function testProposalFlow() public {
        vm.deal(address(treasury), 10 ether);

        vm.startPrank(alice);
        treasury.createProposal(1 ether, carol, "Test Proposal");
        treasury.vote(0, true);
        vm.stopPrank();

        vm.startPrank(bob);
        treasury.vote(0, false);
        vm.stopPrank();

        // Assert that voting does not end before voting period ends
        vm.warp(block.timestamp + treasury.VOTING_PERIOD() - 1);
        vm.expectRevert("Voting period has not ended");
        treasury.executeProposal(0);

        // Assert that after voting period ends, no one can vote
        vm.warp(block.timestamp + 1);
        vm.expectRevert("Voting period has ended");
        treasury.vote(0, true);

        // Assert that funds are not deducted before waiting ends
        assertEq(address(treasury).balance, 10 ether);
        assertEq(address(carol).balance, 0);

        // Assert that funds are deducted after the waiting period is over
        vm.warp(block.timestamp + treasury.WAIT_BEFORE_EXEC());
        treasury.executeProposal(0);
        assertEq(address(treasury).balance, 9 ether);
        assertEq(address(carol).balance, 1 ether);
    }

    function testProposalQuorum() public {
        vm.startPrank(alice);
        treasury.createProposal(1 ether, carol, "Test Proposal 1");
        treasury.vote(0, true);
        vm.stopPrank();

        vm.startPrank(bob);
        treasury.vote(0, false);
        vm.stopPrank();

        vm.warp(
            block.timestamp +
                treasury.VOTING_PERIOD() +
                treasury.WAIT_BEFORE_EXEC()
        );
        vm.expectRevert("Proposal did not pass");
        treasury.executeProposal(0);

        vm.startPrank(alice);
        treasury.createProposal(1 ether, carol, "Test Proposal 2");
        treasury.vote(1, true);
        vm.stopPrank();

        vm.warp(
            block.timestamp +
                treasury.VOTING_PERIOD() +
                treasury.WAIT_BEFORE_EXEC()
        );
        treasury.executeProposal(1);
        assertEq(address(carol).balance, 1 ether);
    }

    function testProposalFailure() public {
        vm.startPrank(alice);
        treasury.createProposal(1 ether, carol, "Test Proposal");
        treasury.vote(0, false);
        vm.stopPrank();

        vm.startPrank(bob);
        treasury.vote(0, false);
        vm.stopPrank();

        vm.warp(
            block.timestamp +
                treasury.VOTING_PERIOD() +
                treasury.WAIT_BEFORE_EXEC()
        );
        vm.expectRevert("Proposal did not pass");
        treasury.executeProposal(0);
    }
}

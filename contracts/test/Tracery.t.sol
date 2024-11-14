// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin-contracts-5.1.0/token/ERC20/ERC20.sol";
import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/Tracery.sol";

contract GovernanceToken is ERC20 {
    constructor() ERC20("Governance Token", "GOV") {
        _mint(msg.sender, 1000000);
    }
}

contract TraceryTest is Test {
    Tracery public tracery;
    GovernanceToken public governanceToken;
    address public alice = address(0x1);
    address public bob = address(0x2);
    address public carol = address(0x3);

    function setUp() public {
        governanceToken = new GovernanceToken();
        governanceToken.transfer(alice, 10);
        governanceToken.transfer(bob, 10);
        tracery = new Tracery(address(governanceToken));
        tracery.addMember(alice);
        tracery.addMember(bob);
        governanceToken.transfer(bob, 500000);
        vm.deal(address(tracery), 10 ether);
    }

    // function testProposalFlow() public {
    //     vm.deal(address(tracery), 10 ether);

    //     vm.startPrank(alice);
    //     tracery.createProposal(1 ether, carol, "Test Proposal");
    //     tracery.vote(0, true);
    //     vm.stopPrank();

    //     vm.startPrank(bob);
    //     tracery.vote(0, false);
    //     vm.stopPrank();

    //     // Assert that voting does not end before voting period ends
    //     vm.warp(block.timestamp + tracery.VOTING_PERIOD() - 1);
    //     tracery.executeProposal(0);
    //     vm.expectRevert("Voting period has not ended");

    //     // Assert that after voting period ends, no one can vote
    //     vm.warp(block.timestamp + tracery.VOTING_PERIOD() + 2);
    //     vm.startPrank(alice);
    //     tracery.vote(0, true);
    //     vm.expectRevert("Voting period has ended");
    //     vm.stopPrank();

    //     // Assert that funds are not deducted before waiting ends
    //     assertEq(address(tracery).balance, 10 ether);
    //     assertEq(carol.balance, 0);

    //     // Assert that funds are deducted after the waiting period is over
    //     vm.warp(
    //         block.timestamp +
    //             tracery.VOTING_PERIOD() +
    //             tracery.WAIT_BEFORE_EXEC() +
    //             1
    //     );
    //     tracery.executeProposal(0);
    //     assertEq(address(tracery).balance, 9 ether);
    //     assertEq(carol.balance, 1 ether);
    // }

    function testProposalCreationAndVoting() public {
        vm.startPrank(alice);
        tracery.createProposal(1 ether, carol, "Test Proposal");

        tracery.vote(0, true);
        vm.stopPrank();

        vm.startPrank(bob);
        tracery.vote(0, false);
        vm.stopPrank();
    }

    function testVotingPeriodAndExecution() public {
        vm.startPrank(alice);
        tracery.createProposal(1 ether, carol, "Test Proposal");

        tracery.vote(0, true);
        vm.stopPrank();

        vm.startPrank(bob);
        tracery.vote(0, false);
        vm.stopPrank();

        // Assert that voting does not end before voting period ends
        vm.startPrank(alice);
        vm.warp(block.timestamp + tracery.VOTING_PERIOD() - 1);
        vm.expectRevert("Voting period has not ended");
        tracery.executeProposal(0);
        vm.stopPrank();

        // Assert that after voting period ends, no one can vote
        vm.warp(block.timestamp + tracery.VOTING_PERIOD() + 2);
        vm.startPrank(alice);
        vm.expectRevert("Voting period has ended");
        tracery.vote(0, true);
        vm.stopPrank();
    }

    function testFundDeductionAfterWaitingPeriod() public {
        vm.startPrank(alice);
        tracery.createProposal(1 ether, carol, "Test Proposal");
        tracery.vote(0, true);
        vm.stopPrank();

        vm.startPrank(bob);
        tracery.vote(0, false);
        vm.stopPrank();

        // Assert that funds are not deducted before waiting ends
        assertEq(address(tracery).balance, 10 ether);
        assertEq(carol.balance, 0);

        // Assert that funds are deducted after the waiting period is over
        vm.startPrank(alice);
        vm.warp(
            block.timestamp +
                tracery.VOTING_PERIOD() +
                tracery.WAIT_BEFORE_EXEC() +
                1
        );
        tracery.executeProposal(0);
        assertEq(address(tracery).balance, 9 ether);
        assertEq(carol.balance, 1 ether);
        vm.stopPrank();
    }

    function testProposalQuorum() public {
        vm.deal(address(tracery), 2 ether);

        vm.startPrank(alice);
        tracery.createProposal(1 ether, carol, "Test Proposal 1");
        tracery.vote(0, true);
        vm.stopPrank();

        vm.startPrank(bob);
        tracery.vote(0, false);
        vm.stopPrank();

        vm.startPrank(alice);
        vm.warp(
            block.timestamp +
                tracery.VOTING_PERIOD() +
                tracery.WAIT_BEFORE_EXEC() +
                1
        );
        tracery.executeProposal(0);
        vm.expectRevert("Proposal did not pass");
        console.log("DONE");
        vm.stopPrank();

        vm.startPrank(alice);
        tracery.createProposal(1 ether, carol, "Test Proposal 2");
        tracery.vote(1, true);
        vm.stopPrank();

        vm.startPrank(bob);
        tracery.vote(1, true);
        vm.stopPrank();

        vm.startPrank(alice);
        vm.warp(
            block.timestamp +
                tracery.VOTING_PERIOD() +
                tracery.WAIT_BEFORE_EXEC() +
                1
        );
        tracery.executeProposal(1);
        assertEq(carol.balance, 1 ether);
        vm.stopPrank();
    }

    function testProposalFailure() public {
        vm.startPrank(alice);
        tracery.createProposal(1 ether, carol, "Test Proposal");
        tracery.vote(0, false);
        vm.stopPrank();

        vm.startPrank(bob);
        tracery.vote(0, false);
        vm.stopPrank();

        vm.warp(
            block.timestamp +
                tracery.VOTING_PERIOD() +
                tracery.WAIT_BEFORE_EXEC() +
                1
        );
        vm.startPrank(alice);
        tracery.executeProposal(0);
        vm.expectRevert("Proposal did not pass");
        vm.stopPrank();
    }
}

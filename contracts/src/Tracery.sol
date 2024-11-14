// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin-contracts-5.1.0/token/ERC20/IERC20.sol";
import "@openzeppelin-contracts-5.1.0/access/Ownable.sol";
import "forge-std/console.sol";

contract Tracery is Ownable(msg.sender) {
    IERC20 public governanceToken;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant WAIT_BEFORE_EXEC = 2 days;

    struct Proposal {
        address proposer;
        uint256 amount;
        address destination;
        string title;
        uint256 votingDeadline;
        uint256 execDeadline;
        mapping(address => int8) votes;
        uint256 positiveVoteCount;
        uint256 negativeVoteCount;
        bool executed;
    }

    Proposal[] public proposals;
    mapping(address => bool) public members;

    event NewProposal(
        uint256 proposalId,
        address proposer,
        uint256 amount,
        address destination,
        string title
    );
    event ProposalExecuted(
        uint256 proposalId,
        uint256 amount,
        address destination
    );
    event NewMember(address member);
    event MemberRemoved(address member);
    event VoteCast(
        address indexed voter,
        uint256 indexed proposalId,
        bool vote,
        uint256 weight
    );

    modifier onlyMember() {
        require(members[msg.sender], "Not a Tracery member");
        _;
    }

    constructor(address _governanceToken) {
        governanceToken = IERC20(_governanceToken);
    }

    function createProposal(
        uint256 _amount,
        address _destination,
        string memory _title
    ) external onlyMember {
        uint256 proposalId = proposals.length;
        Proposal storage newProposal = proposals.push();
        newProposal.proposer = msg.sender;
        newProposal.amount = _amount;
        newProposal.destination = _destination;
        newProposal.title = _title;
        newProposal.votingDeadline = block.timestamp + VOTING_PERIOD;
        newProposal.execDeadline =
            newProposal.votingDeadline +
            WAIT_BEFORE_EXEC;
        emit NewProposal(proposalId, msg.sender, _amount, _destination, _title);
    }

    function vote(uint256 _proposalId, bool _vote) external onlyMember {
        Proposal storage proposal = proposals[_proposalId];
        require(
            block.timestamp <= proposal.votingDeadline,
            "Voting period has ended"
        );
        require(proposal.votes[msg.sender] == 0, "Already voted");

        uint256 voterBalance = governanceToken.balanceOf(msg.sender);
        if (_vote) {
            proposal.votes[msg.sender] = 1;
            proposal.positiveVoteCount += voterBalance;
        } else {
            proposal.votes[msg.sender] = -1;
            proposal.negativeVoteCount += voterBalance;
        }
        emit VoteCast(msg.sender, _proposalId, _vote, voterBalance);
    }

    function executeProposal(uint256 _proposalId) external onlyMember {
        Proposal storage proposal = proposals[_proposalId];
        require(
            block.timestamp > proposal.votingDeadline,
            "Voting period has not ended"
        );
        require(
            block.timestamp > proposal.execDeadline,
            "Waiting period has not ended"
        );
        require(!proposal.executed, "Proposal already executed");
        console.log("positiveVoteCount: %d", proposal.positiveVoteCount);
        console.log("negativeVoteCount: %d", proposal.negativeVoteCount);
        require(
            proposal.positiveVoteCount > proposal.negativeVoteCount,
            "Proposal did not pass"
        );

        proposal.executed = true;
        payable(proposal.destination).transfer(proposal.amount);
        emit ProposalExecuted(
            _proposalId,
            proposal.amount,
            proposal.destination
        );
    }

    function addMember(address _member) external onlyOwner {
        require(!members[_member], "Already a member");
        members[_member] = true;
        emit NewMember(_member);
    }

    function removeMember(address _member) external onlyOwner {
        require(members[_member], "Not a member");
        members[_member] = false;
        emit MemberRemoved(_member);
    }

    receive() external payable {}
}

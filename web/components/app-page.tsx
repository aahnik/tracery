"use client";

import { useState } from "react";
import CreateProposalModal from "./proposals/create";
import ProposalDetailsModal from "./proposals/details";
import ProposalCard from "./proposals/card";
import { Dialog, DialogTrigger } from "./ui/dialog";

// This would typically come from your API or database
const proposals = [
  {
    id: 1,
    title: "Increase community fund by 10%",
    summary:
      "Proposal to increase the community fund allocation by 10% to support more projects.",
    description: `
# Increase Community Fund by 10%

## Background
Our community fund has been instrumental in supporting various projects and initiatives within our DAO. However, as our community grows, we've seen an increase in the number of high-quality proposals that we're unable to fund due to budget constraints.

## Proposal
This proposal suggests increasing our community fund allocation by 10% to better support the growing needs of our community.

### Key Points:
1. Increase the community fund by 10% from its current allocation.
2. This increase will be sourced from the DAO's treasury.
3. The additional funds will be used exclusively for community-driven projects.
4. A quarterly report will be published to show how the additional funds are being utilized.

## Expected Outcomes
1. Support for more community-driven projects
2. Increased engagement from community members
3. Accelerated growth and development within the DAO ecosystem

## Risks and Mitigations
- Risk: Depletion of the DAO's treasury
  Mitigation: Regular financial audits and adjustments to ensure long-term sustainability

- Risk: Misuse of additional funds
  Mitigation: Implement stricter proposal review process and require milestone-based fund releases

## Conclusion
By increasing our community fund, we can foster more innovation, engage more members, and ultimately strengthen our DAO. We encourage all members to consider this proposal carefully and cast their vote.
    `,
    votes: { for: 75, against: 25 },
    passed: true,
    executed: true,
    proposalDate: "2023-05-01",
    passingDate: "2023-05-15",
    executionDate: "2023-05-20",
    lastDateToVote: "2023-05-14",
  },
  {
    id: 2,
    title: "Add new governance token",
    summary:
      "Introduce a new governance token to increase participation in the DAO.",
    description: "Detailed description of the new governance token proposal...",
    votes: { for: 60, against: 40 },
    passed: true,
    executed: false,
    proposalDate: "2023-05-10",
    passingDate: "2023-05-25",
    executionDate: null,
    lastDateToVote: "2023-05-24",
  },
  {
    id: 3,
    title: "Modify voting period",
    summary:
      "Change the voting period from 14 days to 7 days to speed up decision making.",
    description:
      "Detailed description of the voting period modification proposal...",
    votes: { for: 45, against: 55 },
    passed: false,
    executed: false,
    proposalDate: "2023-05-20",
    passingDate: null,
    executionDate: null,
    lastDateToVote: "2023-06-03",
  },
];

export function ProposalsPage() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (proposal: any) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tracery Proposals</h1>
      <CreateProposalModal />
      <div>
        {proposals.map((proposal) => (
          <Dialog
            key={proposal.id}
            open={isModalOpen && selectedProposal?.id === proposal.id}
            onOpenChange={(open) => {
              if (!open) {
                setIsModalOpen(false);
                setSelectedProposal(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <div onClick={() => openModal(proposal)}>
                <ProposalCard proposal={proposal} onClick={undefined} />
              </div>
            </DialogTrigger>
            {selectedProposal && (
              <ProposalDetailsModal proposal={selectedProposal} />
            )}
          </Dialog>
        ))}
      </div>
    </div>
  );
}

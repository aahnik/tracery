"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Bitcoin, Hash } from "lucide-react";

export default function ProposalCard({ proposal, onClick }) {
  return (
    <Card className="mb-4 cursor-pointer hover:bg-accent" onClick={onClick}>
      <CardHeader>
        <CardTitle>{proposal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{proposal.summary}</p>
        <div className="flex justify-between items-center mb-2">
          <span>
            Votes: {proposal.votes.for} For / {proposal.votes.against} Against
          </span>
          <Badge variant={proposal.passed ? "default" : "destructive"}>
            {proposal.passed ? "Passed" : "Failed"}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Proposed: {proposal.proposalDate}
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Bitcoin className="mr-2 h-4 w-4" />
          Amount: {proposal.amount} ETH
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Hash className="mr-2 h-4 w-4" />
          Destination Address: <code>{proposal.destinationAddress} </code>
        </div>
      </CardContent>
    </Card>
  );
}

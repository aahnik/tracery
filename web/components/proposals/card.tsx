"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Bitcoin,
  Hash,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function Component({
  proposal,
  onClick,
}: {
  proposal: any;
  onClick: () => void;
}) {
  return (
    <Card className="mb-4 cursor-pointer hover:bg-accent" onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          {proposal.title}
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center text-green-600">
              <ThumbsUp className="mr-1 h-8 w-4" />
              <span>{proposal.votes.for}</span>
            </div>
            <div className="flex items-center text-red-600">
              <ThumbsDown className="mr-1 h-8 w-4" />
              <span>{proposal.votes.against}</span>
            </div>
          </div>
        </CardTitle>

        <div className="flex flex-col items-end space-y-1">
          <Badge
            variant={proposal.passed ? "default" : "destructive"}
            className="ml-2"
          >
            {proposal.passed ? "Passed" : "Failed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{proposal.summary}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Proposed: {proposal.proposalDate}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Bitcoin className="mr-2 h-4 w-4" />
              Amount: {proposal.amount} ETH
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Hash className="mr-2 h-4 w-4" />
              <span className="font-mono text-xs">
                Destination: {proposal.destinationAddress.slice(0, 10)}...
                {proposal.destinationAddress.slice(-8)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

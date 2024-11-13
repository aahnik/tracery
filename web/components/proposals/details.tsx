"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  FlagIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  XCircleIcon,
  ZapIcon,
} from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { Separator } from "../ui/separator";

export default function ProposalDetailsModal({ proposal }) {
  const [vote, setVote] = useState(null);

  if (!proposal) {
    return null;
  }

  const currentDate = new Date();
  const lastDateToVote = new Date(proposal.lastDateToVote);
  const canVote = currentDate <= lastDateToVote;

  const handleVote = (voteType) => {
    setVote(voteType);
    console.log(`Voted ${voteType} for proposal ${proposal.id}`);
  };

  return (
    <DialogContent className="max-w-4xl h-[80vh]">
      <DialogHeader>
        <DialogTitle>{proposal.title}</DialogTitle>
      </DialogHeader>
      <div className="flex h-full">
        <div className="w-2/3 pr-4 overflow-hidden">
          <ScrollArea className="h-[calc(80vh-8rem)]">
            <ReactMarkdown className="prose dark:prose-invert">
              {proposal.description}
            </ReactMarkdown>
          </ScrollArea>
        </div>
        <div className="w-1/3 pl-4 border-l">
          <ScrollArea className="h-[calc(80vh-8rem)]">
            <h3 className="text-lg font-semibold mb-4">Proposal Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsUpIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span>Votes For</span>
                </div>
                <span className="font-semibold">{proposal.votes.for}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsDownIcon className="w-5 h-5 text-red-500 mr-2" />
                  <span>Votes Against</span>
                </div>
                <span className="font-semibold">{proposal.votes.against}</span>
              </div>
              <Separator />
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm">
                  Proposed: {proposal.proposalDate}
                </span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm">
                  Last Date to Vote: {proposal.lastDateToVote}
                </span>
              </div>
              {proposal.passingDate && (
                <div className="flex items-center">
                  <FlagIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm">
                    Passed: {proposal.passingDate}
                  </span>
                </div>
              )}
              {proposal.executionDate && (
                <div className="flex items-center">
                  <ZapIcon className="w-5 h-5 text-purple-500 mr-2" />
                  <span className="text-sm">
                    Executed: {proposal.executionDate}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Status</span>
                <Badge variant={proposal.passed ? "success" : "destructive"}>
                  {proposal.passed ? "Passed" : "Failed"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Executed</span>
                {proposal.executed ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircleIcon className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
            {canVote && (
              <div className="mt-8">
                <h4 className="text-md font-semibold mb-4">Cast Your Vote</h4>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleVote("for")}
                    variant={vote === "for" ? "default" : "outline"}
                    className="w-full"
                  >
                    <ThumbsUpIcon className="w-4 h-4 mr-2" />
                    Vote For
                  </Button>
                  <Button
                    onClick={() => handleVote("against")}
                    variant={vote === "against" ? "default" : "outline"}
                    className="w-full"
                  >
                    <ThumbsDownIcon className="w-4 h-4 mr-2" />
                    Vote Against
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </DialogContent>
  );
}

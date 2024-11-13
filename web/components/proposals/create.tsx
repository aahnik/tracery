"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProposalModal() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log({ title, summary, description });
    // Reset form fields
    setTitle("");
    setSummary("");
    setDescription("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-8">Create New Proposal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] sm:h-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Proposal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter proposal title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Enter a brief summary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              rows={10}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a detailed description"
              required
            />
          </div>
          <Button type="submit" className="w-full mt-4">
            Create Proposal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

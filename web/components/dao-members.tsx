"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, User } from "lucide-react";

// Mock data for demonstration
const initialMembers = [
  { name: "Alice", address: "0x1234...5678" },
  { name: "Bob", address: "0xabcd...efgh" },
  { name: "Charlie", address: "0x9876...5432" },
  { name: "David", address: "0x1111...2222" },
  { name: "Eve", address: "0x3333...4444" },
  { name: "Frank", address: "0x5555...6666" },
  { name: "Grace", address: "0x7777...8888" },
  { name: "Heidi", address: "0x9999...aaaa" },
  { name: "Ivan", address: "0xbbbb...cccc" },
  { name: "Judy", address: "0xdddd...eeee" },
  { name: "Mallory", address: "0xffff...0000" },
  { name: "Niaj", address: "0xaaaa...bbbb" },
  { name: "Olivia", address: "0xcccc...dddd" },
];
export function DaoMembers({ isOwner = false }: { isOwner?: boolean }) {
  const [members, setMembers] = useState(initialMembers);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberAddress, setNewMemberAddress] = useState("");

  const addMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberName && newMemberAddress) {
      setMembers([
        ...members,
        { name: newMemberName, address: newMemberAddress },
      ]);
      setNewMemberName("");
      setNewMemberAddress("");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl py-8">
      <h1 className="text-4xl font-bold mb-6">Tracery Members</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-2">
              <User className="h-6 w-6" />
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground break-all">
                {member.address}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isOwner && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Add New Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addMember} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Enter member name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-1"
                >
                  Wallet Address
                </label>
                <Input
                  id="address"
                  value={newMemberAddress}
                  onChange={(e) => setNewMemberAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Member
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

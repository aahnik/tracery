'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from 'lucide-react'

// Mock data for DAO transactions
const transactions = [
  { id: 1, type: "inflow", amount: 5000, description: "Member contribution", date: "2023-11-10" },
  { id: 2, type: "outflow", amount: 1500, description: "Developer payment", date: "2023-11-09" },
  { id: 3, type: "inflow", amount: 10000, description: "Grant received", date: "2023-11-08" },
  { id: 4, type: "outflow", amount: 2000, description: "Marketing expenses", date: "2023-11-07" },
  { id: 5, type: "inflow", amount: 3000, description: "NFT sale proceeds", date: "2023-11-06" },
]

export function DaoCashFlow() {
  const totalInflow = transactions.filter(t => t.type === "inflow").reduce((sum, t) => sum + t.amount, 0)
  const totalOutflow = transactions.filter(t => t.type === "outflow").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="container mx-auto p-4 max-w-4xl py-8">
      <h1 className="text-4xl font-bold mb-6">Tracery Cash Flow</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inflow</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInflow.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outflow</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOutflow.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.type === "inflow" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {transaction.type === "inflow" ? "Inflow" : "Outflow"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {transaction.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
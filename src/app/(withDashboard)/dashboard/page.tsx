"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AdminDashboard() {
  const user_data = [
    {
      customerName: "John Doe",
      customerId: "CUST001",
      dateOfSubmission: "2024-03-15T10:00:00Z",
      typeOfSubmission: "Deposit",
      bankName: "Bank A",
      bankBranch: "Branch X",
      amountPaid: "5000",
      penaltyAmount: "0",
      created_at: "2023-11-25T08:30:00Z",
    },
    {
      customerName: "Jane Smith",
      customerId: "CUST002",
      dateOfSubmission: "2024-06-20T12:30:00Z",
      typeOfSubmission: "Withdrawal",
      bankName: "Bank B",
      bankBranch: "Branch Y",
      amountPaid: "3000",
      penaltyAmount: "50",
      created_at: "2024-01-10T14:00:00Z",
    },
    {
      customerName: "Alice Johnson",
      customerId: "CUST003",
      dateOfSubmission: "2024-09-05T09:15:00Z",
      typeOfSubmission: "Penalty Payment",
      bankName: "Bank C",
      bankBranch: "Branch Z",
      amountPaid: "0",
      penaltyAmount: "100",
      created_at: "2024-04-18T11:45:00Z",
    },
    {
      customerName: "Michael Brown",
      customerId: "CUST004",
      dateOfSubmission: "2025-01-25T15:45:00Z",
      typeOfSubmission: "Deposit",
      bankName: "Bank D",
      bankBranch: "Branch W",
      amountPaid: "7000",
      penaltyAmount: "0",
      created_at: "2024-07-22T09:20:00Z",
    },
    {
      customerName: "Emily Davis",
      customerId: "CUST005",
      dateOfSubmission: "2025-04-10T08:00:00Z",
      typeOfSubmission: "Withdrawal",
      bankName: "Bank E",
      bankBranch: "Branch V",
      amountPaid: "2500",
      penaltyAmount: "30",
      created_at: "2024-12-05T17:10:00Z",
    },
    {
      customerName: "Robert Wilson",
      customerId: "CUST006",
      dateOfSubmission: "2025-07-02T09:00:00Z",
      typeOfSubmission: "Penalty Payment",
      bankName: "Bank F",
      bankBranch: "Branch U",
      amountPaid: "0",
      penaltyAmount: "200",
      created_at: "2025-06-15T13:35:00Z",
    },
  ];

  // Group by month and year
  function groupByMonthYear(data: typeof user_data) {
    return data.reduce<Record<string, typeof user_data>>((acc, user) => {
      const date = new Date(user.dateOfSubmission);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`; // e.g. "2025-07"
      if (!acc[key]) acc[key] = [];
      acc[key].push(user);
      return acc;
    }, {});
  }

  const grouped = groupByMonthYear(user_data);
  const sortedMonthYears = Object.keys(grouped).sort();

  return (
    <div>
      <p className="text-center text-4xl font-semibold my-8">
        Welcome to Dashboard
      </p>
      <Accordion type="single" collapsible className="space-y-4 rounded-lg ">
        {sortedMonthYears.map((monthYear) => {
          const [year, month] = monthYear.split("-");
          const label = new Date(
            Number(year),
            Number(month) - 1
          ).toLocaleString("default", {
            month: "long",
            year: "numeric",
          }); // e.g. "July 2025"
          return (
            <AccordionItem
              value={monthYear}
              key={monthYear}
              className=" rounded-lg"
            >
              <AccordionTrigger className="px-4 py-3 bg-amber-100 font-bold text-lg">
                {label}
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-white">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead>Amount Paid</TableHead>
                        <TableHead>Penalty</TableHead>
                        <TableHead>Created At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grouped[monthYear].map((user) => (
                        <TableRow key={user.customerId + user.dateOfSubmission}>
                          <TableCell>{user.customerName}</TableCell>
                          <TableCell>{user.customerId}</TableCell>
                          <TableCell>
                            {new Date(user.dateOfSubmission).toLocaleString()}
                          </TableCell>
                          <TableCell>{user.typeOfSubmission}</TableCell>
                          <TableCell>
                            {user.bankName} ({user.bankBranch})
                          </TableCell>
                          <TableCell>{user.amountPaid}</TableCell>
                          <TableCell>{user.penaltyAmount}</TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

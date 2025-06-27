"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PaymentData {
  amountPaid: string;
  bankBranch?: string;
  bankName?: string;
  customerId: string;
  customerName: string;
  dateOfSubmission: string;
  penaltyAmount: string;
  typeOfSubmission: string;
}

const initialData: PaymentData[] = [
  {
    amountPaid: "21300",
    bankBranch: "qeqwe",
    bankName: "awesdeq",
    customerId: "CUST001",
    customerName: "John Doe",
    dateOfSubmission: "06-26-25",
    penaltyAmount: "31300",
    typeOfSubmission: "BEFTN",
  },
  {
    amountPaid: "15000",
    bankBranch: "branch2",
    bankName: "bank2",
    customerId: "CUST002",
    customerName: "Jane Smith",
    dateOfSubmission: "06-25-25",
    penaltyAmount: "5000",
    typeOfSubmission: "BEFTN",
  },
  {
    amountPaid: "18000",
    customerId: "CUST003",
    customerName: "Alice Johnson",
    dateOfSubmission: "06-24-25",
    penaltyAmount: "8000",
    typeOfSubmission: "Cash",
  },
];

export default function History() {
  const [data, setData] = useState<PaymentData[]>(initialData);

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(Number.parseInt(amount));
  };

  const getSubmissionTypeBadge = (type: string) => {
    const variant = type === "Cash" ? "secondary" : "default";
    return <Badge variant={variant}>{type}</Badge>;
  };

  return (
    <Card className="w-full mt-12 md:mt-24 lg:mt-32">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Customer ID</TableHead>
                  <TableHead className="min-w-[150px]">Customer Name</TableHead>
                  <TableHead className="text-right w-32">Amount Paid</TableHead>
                  <TableHead className="text-right w-32">
                    Penalty Amount
                  </TableHead>
                  <TableHead className="w-28">Date of Submission</TableHead>
                  <TableHead className="w-32">Type of Submission</TableHead>
                  <TableHead className="min-w-[200px]">Bank Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((payment) => (
                  <TableRow key={payment.customerId}>
                    <TableCell className="font-medium w-24">
                      {payment.customerId}
                    </TableCell>
                    <TableCell className="min-w-[150px]">
                      {payment.customerName}
                    </TableCell>
                    <TableCell className="text-green-600 font-semibold text-right w-32">
                      ৳{Number.parseInt(payment.amountPaid).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-red-600 font-semibold text-right w-32">
                      ৳{Number.parseInt(payment.penaltyAmount).toLocaleString()}
                    </TableCell>
                    <TableCell className="w-28">
                      {payment.dateOfSubmission}
                    </TableCell>
                    <TableCell className="w-32">
                      {getSubmissionTypeBadge(payment.typeOfSubmission)}
                    </TableCell>
                    <TableCell className="min-w-[200px]">
                      {payment.typeOfSubmission === "Cash" ? (
                        <span className="text-gray-500 italic">N/A</span>
                      ) : (
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">Bank:</span>{" "}
                            {payment.bankName || "Not specified"}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Branch:</span>{" "}
                            {payment.bankBranch || "Not specified"}
                          </div>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                ৳
                {data
                  .reduce(
                    (sum, item) => sum + Number.parseInt(item.amountPaid),
                    0
                  )
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total Amount Paid</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">
                ৳
                {data
                  .reduce(
                    (sum, item) => sum + Number.parseInt(item.penaltyAmount),
                    0
                  )
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total Penalty Amount
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{data.length}</div>
              <p className="text-xs text-muted-foreground">Total Submissions</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

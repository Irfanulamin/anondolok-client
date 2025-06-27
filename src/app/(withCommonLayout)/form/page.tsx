"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const FormSchema = z
  .object({
    customerName: z.string().min(2, {
      message: "Customer name must be at least 2 characters.",
    }),
    customerId: z.string().min(1, {
      message: "Customer ID is required.",
    }),
    dateOfSubmission: z.date({
      required_error: "Date of submission is required.",
    }),
    typeOfSubmission: z.enum(["Cash", "BEFTN", "NPSB"], {
      required_error: "Please select a submission type.",
    }),
    bankName: z.string().optional(),
    bankBranch: z.string().optional(),
    amountPaid: z.string().min(1, {
      message: "Amount Paid is required.",
    }),
    penaltyAmount: z.string().min(1, {
      message: "Penalty amount is required.",
    }),
  })
  .refine(
    (data) => {
      if (
        data.typeOfSubmission === "BEFTN" ||
        data.typeOfSubmission === "NPSB"
      ) {
        return data.bankName && data.bankName.length > 0;
      }
      return true;
    },
    {
      message: "Bank name is required for BEFTN/NPSB submissions.",
      path: ["bankName"],
    }
  )
  .refine(
    (data) => {
      if (
        data.typeOfSubmission === "BEFTN" ||
        data.typeOfSubmission === "NPSB"
      ) {
        return data.bankBranch && data.bankBranch.length > 0;
      }
      return true;
    },
    {
      message: "Bank branch is required for BEFTN/NPSB submissions.",
      path: ["bankBranch"],
    }
  );

export default function FormPage() {
  const today = new Date().toISOString().split("T")[0];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customerName: "",
      customerId: "",
      dateOfSubmission: undefined,
      typeOfSubmission: undefined,
      bankName: "",
      bankBranch: "",
      amountPaid: "",
      penaltyAmount: "",
    },
  });

  const watchedSubmissionType = form.watch("typeOfSubmission");
  const showBankFields =
    watchedSubmissionType === "BEFTN" || watchedSubmissionType === "NPSB";

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = {
      ...data,
      dateOfSubmission: format(data.dateOfSubmission, "MM-dd-yy"),
    };

    console.log("Form submitted with data:", formattedData);
    // You can now send `formattedData` to your API
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
      <Card className="w-full max-w-4xl py-8">
        <CardHeader className="mb-8">
          <CardTitle className="text-2xl font-bold">
            Customer Submission Form
          </CardTitle>
          <CardDescription className="text-sm font-medium text-muted-foreground">
            Fill out the submission details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Customer Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer name" {...field} />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Customer ID
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer ID" {...field} />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dateOfSubmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Date of Submission
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd-MM-yy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-amber-300"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="typeOfSubmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Type of Submission
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select submission type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-amber-300">
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="BEFTN">BEFTN</SelectItem>
                          <SelectItem value="NPSB">NPSB</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
              </div>

              {showBankFields && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          Bank Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter bank name" {...field} />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankBranch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          Bank Branch
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter bank branch" {...field} />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="amountPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Amount Paid
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="100"
                        min="0"
                        placeholder="Enter The Amount You Paid"
                        {...field}
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="penaltyAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Penalty Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="100"
                        min="0"
                        placeholder="Enter penalty amount"
                        {...field}
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-amber-300 ease-in-out transition hover:bg-amber-400 rounded-lg"
              >
                Submit Form
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

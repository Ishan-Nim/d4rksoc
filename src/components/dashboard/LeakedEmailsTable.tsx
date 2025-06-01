import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail } from "lucide-react";
import { supabase } from "../../../supabase/supabase";
import { SOCRADAR_API_KEY } from "../../../supabase/functions/_shared/constants";

interface LeakedEmail {
  email: string;
  discoveryDate: string;
  breachDate: string;
  password: string;
  source: string;
  employee: string;
  severity: "High" | "Medium" | "Low";
  status: "New" | "Investigating" | "Resolved";
}

interface LeakedEmailsTableProps {
  isLoading?: boolean;
}

const LeakedEmailsTable = ({ isLoading = false }: LeakedEmailsTableProps) => {
  const [loading, setLoading] = useState(isLoading);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [severityFilter, setSeverityFilter] = useState("All Severity");
  const [leakedEmails, setLeakedEmails] = useState<LeakedEmail[]>([]);
  const [totalLeaks, setTotalLeaks] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const fetchLeakedEmails = async () => {
      setLoading(true);
      try {
        // Call the SOCRadar API through our edge function
        const { data, error } = await supabase.functions.invoke(
          "supabase-functions-socradar-leaks",
          {
            body: {
              apiKey: SOCRADAR_API_KEY,
              filters: {
                status:
                  statusFilter !== "All Status" ? statusFilter : undefined,
                severity:
                  severityFilter !== "All Severity"
                    ? severityFilter
                    : undefined,
                search: searchQuery || undefined,
              },
            },
          },
        );

        if (error) {
          console.error("Error fetching leaked emails:", error);
          return;
        }

        if (data) {
          setLeakedEmails(data.leaks || []);
          setTotalLeaks(data.totalCount || 0);
        }
      } catch (error) {
        console.error("Error in fetchLeakedEmails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeakedEmails();
  }, [searchQuery, statusFilter, severityFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Card className="bg-navy-800/90 backdrop-blur-sm border border-navy-700 rounded-xl shadow-md overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-red-400" />
          <CardTitle className="text-xl font-medium text-gray-200">
            Leaked Email Accounts
          </CardTitle>
        </div>
        <div className="bg-red-900/30 text-red-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-red-800">
          {totalLeaks} Total Leaks
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-4">
          Monitor and manage exposed employee credentials from data breaches
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              placeholder="Search by email address..."
              className="bg-navy-700 border-navy-600 text-gray-300 placeholder:text-gray-500 rounded-lg"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-navy-700 border-navy-600 text-gray-300">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-navy-700 border-navy-600 text-gray-300">
                <SelectItem value="All Status">All Status</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Investigating">Investigating</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[150px] bg-navy-700 border-navy-600 text-gray-300">
                <SelectValue placeholder="All Severity" />
              </SelectTrigger>
              <SelectContent className="bg-navy-700 border-navy-600 text-gray-300">
                <SelectItem value="All Severity">All Severity</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-navy-700">
              <tr>
                <th scope="col" className="px-4 py-3 rounded-l-lg">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Discovery Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Breach Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Password
                </th>
                <th scope="col" className="px-4 py-3">
                  Source
                </th>
                <th scope="col" className="px-4 py-3">
                  Employee
                </th>
                <th scope="col" className="px-4 py-3">
                  Severity
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 rounded-r-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="border-b border-navy-700">
                  <td colSpan={9} className="px-4 py-10 text-center">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full border-4 border-navy-600 border-t-blue-500 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-4 w-4 rounded-full bg-blue-500/20 animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-400">
                      Loading leaked email data...
                    </p>
                  </td>
                </tr>
              ) : leakedEmails.length > 0 ? (
                leakedEmails.map((email, index) => (
                  <tr
                    key={index}
                    className="border-b border-navy-700 hover:bg-navy-700/50"
                  >
                    <td className="px-4 py-3 font-medium">{email.email}</td>
                    <td className="px-4 py-3">{email.discoveryDate}</td>
                    <td className="px-4 py-3">{email.breachDate}</td>
                    <td className="px-4 py-3">••••••••</td>
                    <td className="px-4 py-3">{email.source}</td>
                    <td className="px-4 py-3">{email.employee}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          email.severity === "High"
                            ? "bg-red-900/30 text-red-400 border border-red-800"
                            : email.severity === "Medium"
                              ? "bg-amber-900/30 text-amber-400 border border-amber-800"
                              : "bg-green-900/30 text-green-400 border border-green-800"
                        }`}
                      >
                        {email.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          email.status === "New"
                            ? "bg-blue-900/30 text-blue-400 border border-blue-800"
                            : email.status === "Investigating"
                              ? "bg-purple-900/30 text-purple-400 border border-purple-800"
                              : "bg-gray-900/30 text-gray-400 border border-gray-800"
                        }`}
                      >
                        {email.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-200 hover:bg-navy-600"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-navy-700">
                  <td colSpan={9} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Mail className="h-16 w-16 text-gray-600 mb-4" />
                      <p className="text-gray-400 text-lg">
                        No leaked emails found matching your criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeakedEmailsTable;

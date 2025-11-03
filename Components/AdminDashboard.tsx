"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Search, Download, LogOut } from "lucide-react";
import { RegistrationData } from "./RegistrationForm";

interface AdminDashboardProps {
  registrations: RegistrationData[];
  onLogout: () => void;
}

export function AdminDashboard({
  registrations,
  onLogout,
}: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    RegistrationData[]
  >([]);

  // ✅ Filter function runs on every search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredRegistrations(registrations);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = registrations.filter((reg) => {
      const fullName = `${reg.firstName} ${reg.middleName} ${reg.lastName}`.toLowerCase();
      return (
        fullName.includes(query) ||
        reg.email.toLowerCase().includes(query) ||
        reg.phone.includes(query) ||
        reg.specialty.toLowerCase().includes(query)
      );
    });
    setFilteredRegistrations(filtered);
  }, [searchQuery, registrations]);

  // ✅ Export CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert("No registrations to export");
      return;
    }

    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Specialty",
      "Registration Date",
    ];
    const csvData = registrations.map((reg) => {
      const fullName = `${reg.firstName} ${reg.middleName} ${reg.lastName}`.trim();
      const date = new Date(reg.registrationDate).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return [fullName, reg.email, reg.phone, reg.specialty, date];
    });

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ANGOMREC_Registrations_${new Date()
      .toISOString()
      .split("T")[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-yellow-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-amber-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              ANGOMREC 10th Anniversary Registrations
            </p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2 border-amber-200 text-amber-800 hover:bg-amber-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: "Total Registrations", count: registrations.length },
            {
              label: "Singers",
              count: registrations.filter((r) => r.specialty === "Singer").length,
            },
            {
              label: "Instrumentalists",
              count: registrations.filter((r) => r.specialty === "Instrumentalist")
                .length,
            },
            {
              label: "Producers",
              count: registrations.filter((r) => r.specialty === "Producer").length,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-amber-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-gray-500 text-sm">{stat.label}</div>
              <div className="text-2xl font-semibold text-amber-900 mt-1">
                {stat.count}
              </div>
            </div>
          ))}
        </section>

        {/* Search + Export */}
        <section className="bg-white rounded-xl border border-amber-100 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, email, phone, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-black placeholder:text-gray-400 bg-white border border-amber-200 focus:ring-amber-400 focus:border-amber-400 rounded-lg shadow-sm"
              />
            </div>
            <Button
              onClick={handleExportCSV}
              className="bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-medium rounded-lg shadow-md transition-all"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </section>

        {/* Table */}
       {/* Table */}
{/* Table */}
<section className="bg-white rounded-xl border border-amber-100 overflow-hidden shadow-sm">
  <div className="overflow-x-auto">
    <Table className="min-w-full table-auto">
      <TableHeader>
        <TableRow className="bg-amber-50">
          <TableHead className="font-semibold text-amber-900 w-1/3">First Name</TableHead>
          <TableHead className="font-semibold text-amber-900 w-1/3">Last Name</TableHead>
          <TableHead className="font-semibold text-amber-900 w-1/3">Specialty</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredRegistrations.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-gray-500 py-8">
              {searchQuery
                ? "No registrations found matching your search"
                : "No registrations yet"}
            </TableCell>
          </TableRow>
        ) : (
          filteredRegistrations.map((reg, index) => (
            <TableRow
              key={index}
              className="hover:bg-amber-50 transition border-b border-amber-50"
            >
              <TableCell className="font-medium text-gray-800 whitespace-nowrap">
                {reg.firstName}
              </TableCell>
              <TableCell className="font-medium text-gray-800 whitespace-nowrap">
                {reg.lastName}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                  {reg.specialty}
                </span>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
</section>


      </div>
    </div>
  );
}

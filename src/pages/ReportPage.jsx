import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { DataTable } from "../components/ui/data-table";
import { useState } from "react";

const columns = [
  { accessorKey: "timestamp", header: "Timestamp", cell: ({ row }) => (
    <span className="text-gray-600">{row.original.timestamp}</span>
  ) },
  { accessorKey: "description", header: "Issue Description", cell: ({ row }) => (
    <span className="text-gray-800 font-medium">{row.original.description}</span>
  ) },
  {
    accessorKey: "cveId",
    header: "CVE ID",
    cell: ({ row }) => (
      <a
        href={`https://nvd.nist.gov/vuln/detail/${row.original.cveId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {row.original.cveId}
      </a>
    ),
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.original.severity?.toLowerCase() || "low";
      const colorClass =
        severity === "critical" ? "bg-red-100 text-red-800" :
        severity === "high" ? "bg-orange-100 text-orange-800" :
        severity === "medium" ? "bg-yellow-100 text-yellow-800" :
        "bg-green-100 text-green-800";
      return <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}>{row.original.severity || "Low"}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <button className="text-blue-600 hover:underline text-sm">View Details</button>
    ),
  },
];

const remediationData = [
  { issue: "Apache Log4j Remote Code Execution", fix: "Update Apache Log4j to version 2.17.1 or later", cveId: "CVE-2021-44228", time: "30 minutes" },
  { issue: "OpenSSL Buffer Overflow", fix: "Upgrade OpenSSL to version 3.0.7", cveId: "CVE-2022-3786", time: "45 minutes" },
  { issue: "Linux Kernel Privilege Escalation", fix: "Apply Linux kernel security patches", cveId: "CVE-2021-4034", time: "1 hour", note: "Requires reboot" },
];

export default function ReportPage({ deviceInfo = {}, summaryData = {}, findings = [] }) {
  const [severityFilter, setSeverityFilter] = useState("All Severities");

  const filteredFindings = severityFilter === "All Severities"
    ? findings
    : findings.filter(f => f.severity?.toLowerCase() === severityFilter.toLowerCase());

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <Card className="mb-8 shadow-md rounded-lg border border-gray-200">
        <CardHeader className="bg-navy-800 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">{deviceInfo.name || "Device Name"}</CardTitle>
            <button className="bg-white text-navy-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
              Export Report
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <p className="text-gray-700"><strong>IP Address:</strong> {deviceInfo.IP || "N/A"}</p>
            <p className="text-gray-700"><strong>Last Scan:</strong> {deviceInfo.lastScan || "N/A"}</p>
            <p className="text-gray-700"><strong>OS:</strong> {deviceInfo.os || "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="mb-8 shadow-md rounded-lg border border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-navy-800">Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Issues</p>
              <p className="text-2xl font-bold text-navy-800">{summaryData.issuesCount || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">CVEs Found</p>
              <p className="text-2xl font-bold text-navy-800">{summaryData.cvesCount || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Exploitable Issues</p>
              <p className="text-2xl font-bold text-navy-800">{summaryData.exploitable || "N/A"}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">High Severity</p>
              <p className="text-2xl font-bold text-orange-600">{summaryData.severityBreakdown?.high || 0}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-600 text-sm">Severity Breakdown</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-2">
              <p className="text-sm">Critical: <span className="text-red-600 font-semibold">{summaryData.severityBreakdown?.critical || 0}</span></p>
              <p className="text-sm">High: <span className="text-orange-600 font-semibold">{summaryData.severityBreakdown?.high || 0}</span></p>
              <p className="text-sm">Medium: <span className="text-yellow-600 font-semibold">{summaryData.severityBreakdown?.medium || 0}</span></p>
              <p className="text-sm">Low: <span className="text-green-600 font-semibold">{summaryData.severityBreakdown?.low || 0}</span></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Findings Table */}
      <Card className="mb-8 shadow-md rounded-lg border border-gray-200">
        <CardHeader className="border-b border-gray-200 flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-navy-800">Security Findings</CardTitle>
          <select
            className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option>All Severities</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={filteredFindings} />
        </CardContent>
      </Card>

      {/* Remediation */}
      <Card className="shadow-md rounded-lg border border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-navy-800">Remediation Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {remediationData.map((item, index) => (
            <div key={index} className="mb-6 p-4 bg-white shadow-sm rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-800 text-lg">{item.issue}</p>
              <p className="text-gray-600 mt-1">{item.fix}</p>
              <p className="text-gray-600 mt-1"><strong>Related CVE:</strong> {item.cveId}</p>
              <p className="text-gray-600 mt-1"><strong>Estimated Time:</strong> {item.time}</p>
              {item.note && <p className="text-gray-600 mt-1"><strong>Note:</strong> {item.note}</p>}
              <button className="mt-3 bg-navy-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-700 transition">
                Apply Fix
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
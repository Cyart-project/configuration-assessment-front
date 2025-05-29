import { Card, CardHeader, CardTitle, CardContent } from "../Components/ui/card";
import { DataTable } from "../Components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const columns = [
  { accessorKey: "timestamp", header: "Timestamp" },
  { accessorKey: "description", header: "Issue Description" },
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
        severity === "critical" ? "text-red-600" :
        severity === "high" ? "text-orange-600" :
        severity === "medium" ? "text-yellow-600" :
        "text-green-600";
      return <span className={`inline-block px-2 py-1 rounded ${colorClass} bg-opacity-10`}>{row.original.severity || "Low"}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <button className="text-blue-600 hover:underline">View Details</button>
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
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-navy-800">{deviceInfo.name || "Device Name"}</CardTitle>
          <button className="bg-navy-800 text-white px-4 py-2 rounded hover:bg-navy-700">
            Export Report
          </button>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700"><strong>IP Address:</strong> {deviceInfo.IP || "N/A"}</p>
          <p className="text-gray-700"><strong>Last Scan:</strong> {deviceInfo.lastScan || "N/A"}</p>
          <p className="text-gray-700"><strong>OS:</strong> {deviceInfo.os || "N/A"}</p>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-navy-800">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-700"><strong>Total Issues:</strong></p>
              <p className="text-2xl font-bold">{summaryData.issuesCount || 0}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>CVEs Found:</strong></p>
              <p className="text-2xl font-bold">{summaryData.cvesCount || 0}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Exploitable Issues:</strong></p>
              <p className="text-2xl font-bold">{summaryData.exploitable || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>High Severity:</strong></p>
              <p className="text-2xl font-bold text-orange-600">{summaryData.severityBreakdown?.high || 0}</p>
            </div>
          </div>
          <p className="text-gray-700 mt-4"><strong>Severity Breakdown:</strong></p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Critical: <span className="text-red-600">{summaryData.severityBreakdown?.critical || 0}</span></li>
            <li>High: <span className="text-orange-600">{summaryData.severityBreakdown?.high || 0}</span></li>
            <li>Medium: <span className="text-yellow-600">{summaryData.severityBreakdown?.medium || 0}</span></li>
            <li>Low: <span className="text-green-600">{summaryData.severityBreakdown?.low || 0}</span></li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-navy-800">Security Findings</CardTitle>
          <select
            className="border rounded p-2"
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
        <CardContent>
          <DataTable columns={columns} data={filteredFindings} />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-navy-800">Remediation Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          {remediationData.map((item, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <p className="font-semibold">{item.issue}</p>
              <p>{item.fix}</p>
              <p className="text-gray-700"><strong>Related CVE:</strong> {item.cveId}</p>
              <p className="text-gray-700"><strong>Estimated Time:</strong> {item.time}</p>
              {item.note && <p className="text-gray-700"><strong>Note:</strong> {item.note}</p>}
              <button className="mt-2 bg-navy-800 text-white px-4 py-2 rounded hover:bg-navy-700">
                Apply Fix
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
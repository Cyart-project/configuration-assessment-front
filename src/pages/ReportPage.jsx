
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../Components/ui/card";
import { DataTable } from "../Components/ui/data-table";
import { useState } from "react";

const columns = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => (
      <span className="text-sm text-gray-500">{new Date(row.original.timestamp).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Issue Description",
    cell: ({ row }) => (
      <div>
        <div className="text-sm font-medium text-gray-900">
          {row.original.description}
        </div>
        <div className="text-sm text-gray-500">
          Vulnerability details and impact information
        </div>
      </div>
    ),
  },
  {
    accessorKey: "cveId",
    header: "CVE ID",
    cell: ({ row }) => (
      <a
        href={`https://nvd.nist.gov/vuln/detail/${row.original.cveId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
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
      const severityConfig = {
        critical: {
          bg: "bg-purple-100",
          text: "text-purple-800",
          icon: "fas fa-bolt"
        },
        high: {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: "fas fa-exclamation-circle"
        },
        medium: {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          icon: "fas fa-exclamation"
        },
        low: {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: "fas fa-info-circle"
        }
      };
      
      const config = severityConfig[severity] || severityConfig.low;
      
      return (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}
        >
          <i className={`${config.icon} mr-1`}></i>
          {row.original.severity || "Low"}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <div className="text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
          <i className="fas fa-eye"></i>
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
    ),
  },
];

const remediationData = [
  {
    issue: "Apache Log4j Remote Code Execution",
    fix: "Update Apache Log4j to version 2.17.1 or later",
    cveId: "CVE-2021-44228",
    time: "30 minutes",
    description: "This will address the critical remote code execution vulnerability.",
  },
  {
    issue: "OpenSSL Buffer Overflow",
    fix: "Upgrade OpenSSL to version 3.0.7",
    cveId: "CVE-2022-3786",
    time: "45 minutes",
    description: "This will fix the buffer overflow vulnerability and other security issues.",
  },
  {
    issue: "Linux Kernel Privilege Escalation",
    fix: "Apply Linux kernel security patches",
    cveId: "CVE-2021-4034",
    time: "1 hour",
    note: "Requires reboot",
    description: "Install the latest security updates to address privilege escalation vulnerabilities.",
  },
];

function ReportPage({
  deviceInfo = {},
  summaryData = {},
  findings = [],
}) {
  const [severityFilter, setSeverityFilter] = useState("All Severities");

  const filteredFindings =
    severityFilter === "All Severities"
      ? findings
      : findings.filter(
          (f) => f.severity?.toLowerCase() === severityFilter.toLowerCase(),
        );

  // Add severity-based row styling
  const getRowClassName = (severity) => {
    const severityLower = severity?.toLowerCase() || "low";
    switch (severityLower) {
      case "critical":
        return "bg-purple-50 border-l-4 border-purple-500";
      case "high":
        return "bg-red-50 border-l-4 border-red-500";
      case "medium":
        return "bg-yellow-50 border-l-4 border-yellow-500";
      case "low":
        return "bg-green-50 border-l-4 border-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <i className="fas fa-shield-alt text-indigo-600 text-xl mr-2"></i>
              <span className="text-xl font-semibold text-gray-900">Security Dashboard</span>
            </div>
            <div className="flex items-center">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                <i className="fas fa-download mr-2"></i> Export Report
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Device Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-desktop mr-3 text-indigo-600"></i>
                Device Security Report
              </h1>
              <div className="mt-2 flex flex-wrap gap-y-2">
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <i className="fas fa-tag mr-1.5"></i>
                  <span>Device: <span className="font-medium text-gray-700">{deviceInfo.name || "N/A"}</span></span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <i className="fas fa-network-wired mr-1.5"></i>
                  <span>IP: <span className="font-medium text-gray-700">{deviceInfo.IP || "N/A"}</span></span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <i className="fas fa-calendar-alt mr-1.5"></i>
                  <span>Last Scan: <span className="font-medium text-gray-700">{deviceInfo.lastScan || "N/A"}</span></span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="fas fa-microchip mr-1.5"></i>
                  <span>OS: <span className="font-medium text-gray-700">{deviceInfo.os || "N/A"}</span></span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <i className="fas fa-exclamation-triangle mr-1.5"></i>
                Critical Risk
              </span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Issues */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <i className="fas fa-bug text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Issues</p>
                <p className="text-2xl font-bold text-gray-900">{summaryData.issuesCount || 0}</p>
              </div>
            </div>
            <div className="mt-4 border-t pt-3">
              <p className="text-xs text-gray-500">+3 from last scan</p>
            </div>
          </div>

          {/* CVEs Found */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                <i className="fas fa-shield-virus text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">CVEs Found</p>
                <p className="text-2xl font-bold text-gray-900">{summaryData.cvesCount || 0}</p>
              </div>
            </div>
            <div className="mt-4 border-t pt-3">
              <p className="text-xs text-gray-500">5 new vulnerabilities</p>
            </div>
          </div>

          {/* High Severity */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                <i className="fas fa-fire text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">High Severity</p>
                <p className="text-2xl font-bold text-gray-900">{summaryData.severityBreakdown?.high || 0}</p>
              </div>
            </div>
            <div className="mt-4 border-t pt-3">
              <p className="text-xs text-gray-500">+2 critical since last scan</p>
            </div>
          </div>

          {/* Exploitable */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <i className="fas fa-bomb text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Exploitable</p>
                <p className="text-2xl font-bold text-gray-900">{summaryData.exploitable || "N/A"}</p>
              </div>
            </div>
            <div className="mt-4 border-t pt-3">
              <p className="text-xs text-gray-500">Public exploits available</p>
            </div>
          </div>
        </div>

        {/* Severity Breakdown */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-chart-pie mr-2 text-indigo-600"></i>
            Severity Breakdown
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-purple-600">Critical</span>
                  <span className="text-sm font-medium text-gray-900">{summaryData.severityBreakdown?.critical || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{width: "15%"}}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-red-500">High</span>
                  <span className="text-sm font-medium text-gray-900">{summaryData.severityBreakdown?.high || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{width: "30%"}}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-yellow-500">Medium</span>
                  <span className="text-sm font-medium text-gray-900">{summaryData.severityBreakdown?.medium || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{width: "40%"}}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-green-500">Low</span>
                  <span className="text-sm font-medium text-gray-900">{summaryData.severityBreakdown?.low || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{width: "15%"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Findings Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <i className="fas fa-list-ul mr-2 text-indigo-600"></i>
              Security Findings
            </h2>
            <div className="mt-2 md:mt-0">
              <div className="relative">
                <select
                  className="block appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 text-sm"
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                >
                  <option>All Severities</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>
            </div>
          </div>
          <DataTable columns={columns} data={filteredFindings} />
        </div>

        {/* Remediation Recommendations */}
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-lightbulb mr-2 text-indigo-600"></i>
            Remediation Recommendations
          </h2>
          <div className="space-y-4">
            {remediationData.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <i className="fas fa-check-circle text-green-500 text-xl"></i>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.fix}</h3>
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <i className="fas fa-clock mr-1"></i> Estimated time: {item.time}
                      </span>
                      {item.note && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 ml-1">
                          <i className="fas fa-redo mr-1"></i> {item.note}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                      Apply Fix
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-shield-alt text-indigo-600 text-xl mr-2"></i>
              <span className="text-lg font-semibold text-gray-900">Security Dashboard</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">
                &copy; 2023 Security Team. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ReportPage;

import ReportPage from "./pages/ReportPage";

const sampleDeviceInfo = {
  name: "Web Server #1 (Production)",
  IP: "192.168.1.45",
  lastScan: "Today, 10:45 AM",
  os: "Windows Server 2022",
};

const sampleSummaryData = {
  issuesCount: 27,
  cvesCount: 19,
  exploitable: 4,
  severityBreakdown: { critical: 4, high: 8, medium: 11, low: 4 },
};

const sampleFindings = [
  { timestamp: "2025-05-29T10:45:00Z", description: "Apache Log4j Remote Code Execution", cveId: "CVE-2021-44228", severity: "Critical" },
  { timestamp: "2025-05-29T10:45:00Z", description: "OpenSSL Buffer Overflow", cveId: "CVE-2022-3786", severity: "High" },
  { timestamp: "2025-05-29T10:45:00Z", description: "Linux Kernel Privilege Escalation", cveId: "CVE-2021-4034", severity: "High" },
  { timestamp: "2025-05-29T10:45:00Z", description: "Nginx HTTP Request Smuggling", cveId: "CVE-2022-41741", severity: "Medium" },
  { timestamp: "2025-05-29T10:45:00Z", description: "Bash Information Disclosure", cveId: "CVE-2019-18276", severity: "Low" },
];

function App() {
  return (
    <div className="App">
      <ReportPage
        deviceInfo={sampleDeviceInfo}
        summaryData={sampleSummaryData}
        findings={sampleFindings}
      />
    </div>
  );
}

export default App;
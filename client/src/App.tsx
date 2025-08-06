import { Switch, Route } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GenerateReportForm } from "@/components/ui/GenerateReportForm";
import SecurityDashboard from "@/pages/security-dashboard";
import NotFound from "@/pages/not-found";

// function Router() {
//   return (
//     <Switch>
//       <Route path="/dashboard">
//   <SecurityDashboard reportData={reportData} />
// </Route>
//       <Route component={NotFound} />
//     </Switch>
//   );
// }

function App() {
  const [reportData, setReportData] = useState(null);
  const defaultReport = {
  device_info: {
    agent_id: "N/A",
    device_name: "No Device Selected",
    ip: "0.0.0.0",
    os: "Unknown",
    last_seen: "N/A"
  },
  os_details: {
    build: "N/A",
    display_version: "N/A",
    major: "N/A",
    minor: "N/A",
    name: "N/A",
    version: "N/A"
  },
  summary: {
    software_analyzed: 0,
    alerts_found: 0,
    syscheck_entries: 0,
    total_cves: 0,
    severity_breakdown: {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0
    }
  },
  findings: []
};


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* GenerateReportForm calls setReportData when a report is generated */}
        <GenerateReportForm onReportData={setReportData} />
        <Switch>
          <Route path="/dashboard">
            {reportData ? (
              <SecurityDashboard reportData={reportData} />
            ) : (
              <SecurityDashboard reportData={defaultReport} />
            )}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

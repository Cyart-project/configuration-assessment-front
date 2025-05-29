import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ReportPage({ deviceInfo = {}, summaryData = {}, findings = [] }) {
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
    </div>
  );
}
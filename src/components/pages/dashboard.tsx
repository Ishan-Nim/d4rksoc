import React, { useState, useEffect } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import SecurityMetricsGrid from "../dashboard/SecurityMetricsGrid";
import LeakedEmailsTable from "../dashboard/LeakedEmailsTable";
import SecurityTabs from "../dashboard/SecurityTabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [liveActive, setLiveActive] = useState(true);

  // Function to trigger loading state for demonstration
  const handleRefresh = () => {
    setLoading(true);
    // Reset loading after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const toggleLiveFeed = () => {
    setLiveActive(!liveActive);
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 pt-6 pb-2">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <h1 className="text-2xl font-semibold text-gray-100">
                    Security Operations Center
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Real-time threat monitoring and incident response
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={toggleLiveFeed}
                  variant="outline"
                  className={`border ${liveActive ? "border-green-600 bg-green-900/20 text-green-400" : "border-gray-700 bg-navy-800 text-gray-400"} rounded-full px-4 h-9 transition-colors flex items-center gap-2`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${liveActive ? "bg-green-500 animate-pulse" : "bg-gray-600"}`}
                  ></span>
                  Live Feed {liveActive ? "Active" : "Inactive"}
                </Button>
                <Button
                  onClick={handleRefresh}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 h-9 shadow-md transition-colors flex items-center gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                  {loading ? "Loading..." : "Refresh Data"}
                </Button>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "container mx-auto px-6 space-y-8",
              "transition-all duration-300 ease-in-out",
            )}
          >
            <SecurityMetricsGrid isLoading={loading} />

            <div className="my-6">
              <SecurityTabs />
            </div>

            <LeakedEmailsTable isLoading={loading} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

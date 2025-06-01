import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Users, Globe, Mail, Wifi } from "lucide-react";

interface SecurityTabsProps {
  onTabChange?: (tab: string) => void;
}

const SecurityTabs = ({ onTabChange = () => {} }: SecurityTabsProps) => {
  const [activeTab, setActiveTab] = useState("incidents");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <Tabs
      defaultValue="incidents"
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList className="bg-navy-700 border border-navy-600 p-1 rounded-xl w-full grid grid-cols-5 h-auto">
        <TabsTrigger
          value="incidents"
          className={`py-2.5 text-sm font-medium rounded-lg ${activeTab === "incidents" ? "bg-navy-600 text-blue-400" : "text-gray-400 hover:text-gray-300"}`}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Incidents
        </TabsTrigger>
        <TabsTrigger
          value="employees"
          className={`py-2.5 text-sm font-medium rounded-lg ${activeTab === "employees" ? "bg-navy-600 text-blue-400" : "text-gray-400 hover:text-gray-300"}`}
        >
          <Users className="h-4 w-4 mr-2" />
          Employees
        </TabsTrigger>
        <TabsTrigger
          value="darkweb"
          className={`py-2.5 text-sm font-medium rounded-lg ${activeTab === "darkweb" ? "bg-navy-600 text-blue-400" : "text-gray-400 hover:text-gray-300"}`}
        >
          <Globe className="h-4 w-4 mr-2" />
          Dark Web
        </TabsTrigger>
        <TabsTrigger
          value="infections"
          className={`py-2.5 text-sm font-medium rounded-lg ${activeTab === "infections" ? "bg-navy-600 text-blue-400" : "text-gray-400 hover:text-gray-300"}`}
        >
          <Wifi className="h-4 w-4 mr-2" />
          Infections
        </TabsTrigger>
        <TabsTrigger
          value="domains"
          className={`py-2.5 text-sm font-medium rounded-lg ${activeTab === "domains" ? "bg-navy-600 text-blue-400" : "text-gray-400 hover:text-gray-300"}`}
        >
          <Mail className="h-4 w-4 mr-2" />
          Domains
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SecurityTabs;

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Users, Globe, Mail } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { supabase } from "../../../supabase/supabase";
import { SOCRADAR_API_KEY } from "../../../supabase/functions/_shared/constants";

interface SecurityMetric {
  title: string;
  count: number;
  icon: React.ReactNode;
  subtext: string;
  iconColor: string;
  iconBgColor: string;
}

interface SecurityMetricsGridProps {
  isLoading?: boolean;
}

const SecurityMetricsGrid = ({
  isLoading = false,
}: SecurityMetricsGridProps) => {
  const [loading, setLoading] = useState(isLoading);
  const [metrics, setMetrics] = useState<SecurityMetric[]>([
    {
      title: "Active Incidents",
      count: 0,
      icon: <AlertTriangle className="h-5 w-5" />,
      subtext: "+0 today",
      iconColor: "text-red-500",
      iconBgColor: "bg-red-100",
    },
    {
      title: "Exposed Employees",
      count: 0,
      icon: <Users className="h-5 w-5" />,
      subtext: "0% password reuse",
      iconColor: "text-amber-500",
      iconBgColor: "bg-amber-100",
    },
    {
      title: "Dark Web Mentions",
      count: 0,
      icon: <Globe className="h-5 w-5" />,
      subtext: "+0 this week",
      iconColor: "text-purple-500",
      iconBgColor: "bg-purple-100",
    },
    {
      title: "Compromised Domains",
      count: 0,
      icon: <Mail className="h-5 w-5" />,
      subtext: "0 at risk",
      iconColor: "text-yellow-500",
      iconBgColor: "bg-yellow-100",
    },
  ]);

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
    const fetchSecurityData = async () => {
      setLoading(true);
      try {
        // Call the SOCRadar API through our edge function
        const { data, error } = await supabase.functions.invoke(
          "supabase-functions-socradar-data",
          {
            body: { apiKey: SOCRADAR_API_KEY },
          },
        );

        if (error) {
          console.error("Error fetching security data:", error);
          return;
        }

        if (data) {
          // Update metrics with real data
          setMetrics([
            {
              title: "Active Incidents",
              count: data.incidents?.count || 0,
              icon: <AlertTriangle className="h-5 w-5" />,
              subtext: `+${data.incidents?.today || 0} today`,
              iconColor: "text-red-500",
              iconBgColor: "bg-red-100",
            },
            {
              title: "Exposed Employees",
              count: data.employees?.count || 0,
              icon: <Users className="h-5 w-5" />,
              subtext: `${data.employees?.passwordReuse || 0}% password reuse`,
              iconColor: "text-amber-500",
              iconBgColor: "bg-amber-100",
            },
            {
              title: "Dark Web Mentions",
              count: data.darkWeb?.count || 0,
              icon: <Globe className="h-5 w-5" />,
              subtext: `+${data.darkWeb?.thisWeek || 0} this week`,
              iconColor: "text-purple-500",
              iconBgColor: "bg-purple-100",
            },
            {
              title: "Compromised Domains",
              count: data.domains?.count || 0,
              icon: <Mail className="h-5 w-5" />,
              subtext: `${data.domains?.atRisk || 0} at risk`,
              iconColor: "text-yellow-500",
              iconBgColor: "bg-yellow-100",
            },
          ]);
        }
      } catch (error) {
        console.error("Error in fetchSecurityData:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityData();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card
            key={index}
            className="bg-navy-800/90 backdrop-blur-sm border border-navy-700 rounded-xl shadow-md overflow-hidden"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-gray-300 animate-pulse">
                Loading...
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-navy-700 flex items-center justify-center animate-pulse">
                <div className="h-4 w-4 bg-navy-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-gray-200 animate-pulse">
                -
              </div>
              <p className="text-sm text-gray-400 mt-1 animate-pulse">
                Loading data...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="bg-navy-800/90 backdrop-blur-sm border border-navy-700 rounded-xl shadow-md overflow-hidden"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-300">
              {metric.title}
            </CardTitle>
            <div
              className={`h-8 w-8 rounded-full ${metric.iconBgColor} flex items-center justify-center`}
            >
              <span className={metric.iconColor}>{metric.icon}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-200">
              {metric.count}
            </div>
            <p className="text-sm text-gray-400 mt-1">{metric.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SecurityMetricsGrid;

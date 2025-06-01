import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  FolderKanban,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
}

interface SidebarProps {
  items?: NavItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

const defaultNavItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Home" },
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", isActive: true },
  { icon: <FolderKanban size={20} />, label: "Threats" },
  { icon: <Calendar size={20} />, label: "Reports" },
  { icon: <Users size={20} />, label: "Team" },
];

const defaultBottomItems: NavItem[] = [
  { icon: <Settings size={20} />, label: "Settings" },
  { icon: <HelpCircle size={20} />, label: "Help" },
];

const Sidebar = ({
  items = defaultNavItems,
  activeItem = "Home",
  onItemClick = () => {},
}: SidebarProps) => {
  return (
    <div className="w-[280px] h-full bg-navy-800/80 backdrop-blur-md border-r border-navy-700 flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-100">SOCRadar</h2>
        <p className="text-sm text-gray-400">Threat Intelligence Platform</p>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1.5">
          {items.map((item) => (
            <Button
              key={item.label}
              variant={"ghost"}
              className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? "bg-navy-700 text-blue-400 hover:bg-navy-600" : "text-gray-400 hover:bg-navy-700"}`}
              onClick={() => onItemClick(item.label)}
            >
              <span
                className={`${item.label === activeItem ? "text-blue-400" : "text-gray-500"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </Button>
          ))}
        </div>

        <Separator className="my-4 bg-navy-700" />

        <div className="space-y-3">
          <h3 className="text-xs font-medium px-4 py-1 text-gray-500 uppercase tracking-wider">
            Threat Categories
          </h3>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-400 hover:bg-navy-700"
          >
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            Critical Alerts
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-400 hover:bg-navy-700"
          >
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            Data Leaks
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-400 hover:bg-navy-700"
          >
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            Vulnerabilities
          </Button>
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-navy-700">
        {defaultBottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium text-gray-400 hover:bg-navy-700 mb-1.5"
            onClick={() => onItemClick(item.label)}
          >
            <span className="text-gray-500">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

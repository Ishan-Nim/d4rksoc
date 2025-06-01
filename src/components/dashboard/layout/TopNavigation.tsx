import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell, Home, Search, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../supabase/auth";

interface TopNavigationProps {
  onSearch?: (query: string) => void;
  notifications?: Array<{ id: string; title: string }>;
}

const TopNavigation = ({
  onSearch = () => {},
  notifications = [
    { id: "1", title: "New project assigned" },
    { id: "2", title: "Meeting reminder" },
  ],
}: TopNavigationProps) => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full h-16 border-b border-navy-700 bg-navy-800/80 backdrop-blur-md flex items-center justify-between px-6 fixed top-0 z-50 shadow-md">
      <div className="flex items-center gap-4 flex-1">
        <Link
          to="/"
          className="text-gray-300 hover:text-gray-100 transition-colors"
        >
          <Home className="h-5 w-5" />
        </Link>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search threats..."
            className="pl-9 h-10 rounded-full bg-navy-700 border-navy-600 text-gray-300 text-sm focus:ring-2 focus:ring-navy-600 focus-visible:ring-navy-600 focus-visible:ring-offset-0"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full h-9 w-9 bg-navy-700 hover:bg-navy-600 transition-colors"
                  >
                    <Bell className="h-4 w-4 text-gray-300" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium border border-navy-800">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-xl overflow-hidden p-2 border border-navy-700 bg-navy-800 shadow-lg"
                >
                  <DropdownMenuLabel className="text-sm font-medium text-gray-300 px-2">
                    Notifications
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 bg-navy-700" />
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="rounded-lg text-sm py-2 text-gray-300 focus:bg-navy-700"
                    >
                      {notification.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-navy-700 text-white text-xs px-3 py-1.5">
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 hover:cursor-pointer">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.email || ""}
              />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl border-navy-700 bg-navy-800 shadow-lg"
          >
            <DropdownMenuLabel className="text-xs text-gray-400">
              {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-navy-700" />
            <DropdownMenuItem className="cursor-pointer text-gray-300 focus:bg-navy-700">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-gray-300 focus:bg-navy-700">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-navy-700" />
            <DropdownMenuItem
              className="cursor-pointer text-gray-300 focus:bg-navy-700"
              onSelect={() => signOut()}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigation;

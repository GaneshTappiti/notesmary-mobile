
import { useAuth } from "@/contexts/AuthContext";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const DashboardTopbar = () => {
  const { user, profile } = useAuth();
  const name = profile?.full_name || user?.email || "User";

  return (
    <header className="flex items-center justify-between gap-4 px-6 pt-6 pb-2 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 shadow-none sticky top-0 z-20">
      <div>
        <h1 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900 dark:text-white">
          Hello, {name.split(" ")[0]} 👋
        </h1>
        <p className="text-xs text-gray-500">
          Here's your dashboard for today
        </p>
      </div>
      <div className="flex items-center gap-3 flex-1 justify-center">
        <Input
          placeholder="Search…"
          className="w-[240px] md:w-[350px] rounded-full px-4"
        />
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/notifications"
          aria-label="Notifications"
          className="relative p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-200" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
        </Link>
        <Avatar>
          <AvatarImage src={profile?.avatar_url || ""} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

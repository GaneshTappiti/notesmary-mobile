
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Lock, Unlock, Calendar, MoreHorizontal, User } from "lucide-react";

// Mock data for user's created rooms
const userRooms = [
  {
    id: 1,
    name: "Advanced Calculus",
    participants: 8,
    status: "active",
    isPrivate: true,
    nextSession: "Today, 6:00 PM"
  },
  {
    id: 2,
    name: "Programming Fundamentals",
    participants: 5,
    status: "scheduled",
    isPrivate: false,
    nextSession: "Tomorrow, 4:30 PM"
  }
];

export const YourRoomsSection = () => {
  if (userRooms.length === 0) {
    return null;
  }

  return (
    <Card className="border-none shadow-md mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Rooms You Created
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {userRooms.map((room) => (
            <div 
              key={room.id} 
              className="border rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium flex items-center gap-2">
                  {room.isPrivate ? (
                    <Lock className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Unlock className="h-4 w-4 text-green-500" />
                  )}
                  {room.name}
                  <Badge variant={room.status === "active" ? "default" : "outline"} className="ml-2">
                    {room.status === "active" ? "Active" : "Scheduled"}
                  </Badge>
                </h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm mt-2">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>{room.participants} participants</span>
                </div>
                {room.nextSession && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>{room.nextSession}</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="default" className="text-xs">
                  Manage Room
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Send Invites
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

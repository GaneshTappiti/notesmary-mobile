
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRight, ChevronLeft, Users, FileText, Pin, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Member {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  status: 'online' | 'offline';
}

interface Resource {
  id: string;
  title: string;
  type: string;
  uploadedBy: string;
  date: string;
}

interface RoomInfoSidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  room: {
    name: string;
    description: string;
    members: Member[];
    resources: Resource[];
  };
}

export const RoomInfoSidebar = ({ collapsed, toggleSidebar, room }: RoomInfoSidebarProps) => {
  return (
    <div className={cn(
      "h-full bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-all duration-300",
      collapsed ? "w-12" : "w-72"
    )}>
      <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>
      
      {!collapsed ? (
        <div className="p-4 h-full overflow-auto">
          <Tabs defaultValue="members" className="space-y-4">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="members" className="flex items-center gap-1">
                <Users size={14} />
                Members
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-1">
                <FileText size={14} />
                Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="members" className="space-y-4 mt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Members ({room.members.length})</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <UserPlus className="h-3.5 w-3.5 mr-1" />
                  Invite
                </Button>
              </div>
              
              <div className="space-y-2">
                {room.members.map(member => (
                  <div key={member.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {member.status === 'online' && (
                          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-1 ring-white dark:ring-gray-800" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={member.role === 'admin' ? "default" : "outline"} className="text-xs py-0 h-5">
                            {member.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium mb-2">About This Room</h3>
                <p className="text-xs text-muted-foreground">{room.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4 mt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Resources ({room.resources.length})</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <Pin className="h-3.5 w-3.5 mr-1" />
                  Pin
                </Button>
              </div>
              
              <div className="space-y-2">
                {room.resources.map(resource => (
                  <div key={resource.id} className="p-2 border rounded-md text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-blue-100 dark:bg-blue-900/40 p-1 rounded text-blue-700 dark:text-blue-300">
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <p className="font-medium text-xs">{resource.title}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{resource.type.toUpperCase()}</Badge>
                      <p className="text-xs text-muted-foreground">{resource.uploadedBy}</p>
                    </div>
                  </div>
                ))}
                
                {room.resources.length === 0 && (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    No resources shared yet.
                  </div>
                )}
              </div>
              
              <Button variant="outline" size="sm" className="w-full text-xs">
                Upload Resource
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
    </div>
  );
};


import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageCircle, FileText, Video, CheckSquare } from 'lucide-react';
import { RoomChat } from './RoomChat';
import { RoomNotes } from './RoomNotes';
import { RoomMeet } from './RoomMeet';
import { RoomTasks } from './RoomTasks';

interface RoomTabsProps {
  roomId: string;
  messages: Array<any>;
}

export const RoomTabs = ({ roomId, messages }: RoomTabsProps) => {
  return (
    <Tabs defaultValue="chat" className="w-full h-full flex flex-col">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="chat" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Chat</span>
        </TabsTrigger>
        <TabsTrigger value="notes" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Notes</span>
        </TabsTrigger>
        <TabsTrigger value="meet" className="flex items-center gap-2">
          <Video className="h-4 w-4" />
          <span className="hidden sm:inline">Meet</span>
        </TabsTrigger>
        <TabsTrigger value="tasks" className="flex items-center gap-2">
          <CheckSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Tasks</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="chat" className="flex-1 overflow-hidden mt-0 border-none p-0">
        <RoomChat roomId={roomId} messages={messages} />
      </TabsContent>
      
      <TabsContent value="notes" className="flex-1 overflow-hidden mt-0 border-none p-0">
        <RoomNotes roomId={roomId} />
      </TabsContent>
      
      <TabsContent value="meet" className="flex-1 overflow-hidden mt-0 border-none p-0">
        <RoomMeet roomId={roomId} />
      </TabsContent>
      
      <TabsContent value="tasks" className="flex-1 overflow-hidden mt-0 border-none p-0">
        <RoomTasks roomId={roomId} />
      </TabsContent>
    </Tabs>
  );
};

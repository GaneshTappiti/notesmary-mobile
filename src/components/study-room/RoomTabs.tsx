
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, FileText, Video, CheckSquare } from 'lucide-react';
import { RoomChat } from './RoomChat';
import { RoomNotes } from './RoomNotes';
import { RoomMeet } from './RoomMeet';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface RoomTabsProps {
  roomId: string;
  messages: Message[];
}

export const RoomTabs = ({ roomId, messages }: RoomTabsProps) => {
  const [activeTab, setActiveTab] = useState("chat");
  
  return (
    <Tabs 
      defaultValue="chat" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="h-full flex flex-col"
    >
      <TabsList className="px-4 pt-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <TabsTrigger 
          value="chat" 
          className="flex items-center gap-1.5 data-[state=active]:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none border-b-2 border-transparent"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Chat</span>
        </TabsTrigger>
        <TabsTrigger 
          value="notes" 
          className="flex items-center gap-1.5 data-[state=active]:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none border-b-2 border-transparent"
        >
          <FileText className="h-4 w-4" />
          <span>Notes</span>
        </TabsTrigger>
        <TabsTrigger 
          value="meet" 
          className="flex items-center gap-1.5 data-[state=active]:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none border-b-2 border-transparent"
        >
          <Video className="h-4 w-4" />
          <span>Meet</span>
        </TabsTrigger>
        <TabsTrigger 
          value="tasks" 
          className="flex items-center gap-1.5 data-[state=active]:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none border-b-2 border-transparent"
        >
          <CheckSquare className="h-4 w-4" />
          <span>Tasks</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="chat" className="flex-1 h-0 p-0 m-0 overflow-hidden">
        <RoomChat roomId={roomId} messages={messages} />
      </TabsContent>
      
      <TabsContent value="notes" className="flex-1 h-0 p-0 m-0 overflow-hidden">
        <RoomNotes roomId={roomId} />
      </TabsContent>
      
      <TabsContent value="meet" className="flex-1 h-0 p-0 m-0 overflow-hidden">
        <RoomMeet roomId={roomId} />
      </TabsContent>
      
      <TabsContent value="tasks" className="flex-1 h-0 p-0 m-0 overflow-hidden">
        <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-6">
            <CheckSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Tasks Coming Soon</h3>
            <p className="text-gray-500">
              Track and manage study tasks will be available in the next update.
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

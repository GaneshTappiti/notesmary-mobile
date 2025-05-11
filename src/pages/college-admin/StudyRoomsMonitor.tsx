
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Eye, 
  X, 
  Video, 
  Clock, 
  Users as UsersIcon,
  Tag,
  MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for demonstration
const mockStudyRooms = [
  {
    id: "1",
    title: "DSA Preparation - Trees & Graphs",
    tags: ["DSA", "Algorithms", "Computer Science"],
    participants: [
      { id: "u1", name: "Rahul Sharma", avatarUrl: "" },
      { id: "u2", name: "Priya Singh", avatarUrl: "" },
      { id: "u3", name: "Amit Kumar", avatarUrl: "" }
    ],
    status: "active",
    createdAt: "2025-05-11T10:30:00",
    duration: "01:45:23",
    messages: [
      { id: "m1", userId: "u1", userName: "Rahul Sharma", content: "Let's start with binary trees today", time: "10:30 AM" },
      { id: "m2", userId: "u2", userName: "Priya Singh", content: "Yes, I'm having trouble with balancing AVL trees", time: "10:31 AM" },
      { id: "m3", userId: "u3", userName: "Amit Kumar", content: "Can we also cover graph traversals?", time: "10:35 AM" }
    ]
  },
  {
    id: "2",
    title: "Database Management Systems - SQL Practice",
    tags: ["DBMS", "SQL", "Database"],
    participants: [
      { id: "u4", name: "Sneha Gupta", avatarUrl: "" },
      { id: "u5", name: "Vikram Patel", avatarUrl: "" }
    ],
    status: "active",
    createdAt: "2025-05-11T09:15:00",
    duration: "03:00:45",
    messages: [
      { id: "m4", userId: "u4", userName: "Sneha Gupta", content: "Who wants to practice joins today?", time: "9:15 AM" },
      { id: "m5", userId: "u5", userName: "Vikram Patel", content: "I'm working on a complex query with nested joins", time: "9:20 AM" }
    ]
  },
  {
    id: "3",
    title: "Machine Learning Fundamentals",
    tags: ["ML", "AI", "Data Science"],
    participants: [
      { id: "u6", name: "Neha Joshi", avatarUrl: "" },
      { id: "u7", name: "Ravi Teja", avatarUrl: "" },
      { id: "u8", name: "Divya Prakash", avatarUrl: "" }
    ],
    status: "active",
    createdAt: "2025-05-11T11:00:00",
    duration: "00:15:05",
    messages: [
      { id: "m6", userId: "u6", userName: "Neha Joshi", content: "Today we're covering gradient descent", time: "11:00 AM" },
      { id: "m7", userId: "u7", userName: "Ravi Teja", content: "Anyone good at implementing backpropagation from scratch?", time: "11:05 AM" }
    ]
  },
  {
    id: "4",
    title: "Operating Systems Concepts",
    tags: ["OS", "Computer Science"],
    participants: [
      { id: "u9", name: "Rohan Mehta", avatarUrl: "" }
    ],
    status: "inactive",
    createdAt: "2025-05-10T15:30:00",
    duration: "00:45:00",
    messages: [
      { id: "m8", userId: "u9", userName: "Rohan Mehta", content: "I've created this room to discuss process synchronization", time: "3:30 PM" }
    ]
  },
  {
    id: "5",
    title: "Web Development - React & Node.js",
    tags: ["Web Dev", "React", "Node.js"],
    participants: [
      { id: "u10", name: "Kavya Reddy", avatarUrl: "" },
      { id: "u11", name: "Sanjay Kumar", avatarUrl: "" }
    ],
    status: "inactive",
    createdAt: "2025-05-10T16:45:00",
    duration: "02:15:30",
    messages: [
      { id: "m9", userId: "u10", userName: "Kavya Reddy", content: "How do you handle state management in large apps?", time: "4:45 PM" },
      { id: "m10", userId: "u11", userName: "Sanjay Kumar", content: "I prefer Redux for complex state, Context for simpler apps", time: "4:50 PM" }
    ]
  }
];

const StudyRoomsMonitor: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewingRoom, setViewingRoom] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("participants");
  
  // Filter rooms based on search and status
  const filteredRooms = mockStudyRooms.filter(room => {
    const matchesSearch = 
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      room.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = selectedStatus === "All" || 
      (selectedStatus === "Active" && room.status === "active") ||
      (selectedStatus === "Inactive" && room.status === "inactive");
    
    return matchesSearch && matchesStatus;
  });

  const handleViewRoom = (room: any) => {
    setViewingRoom(room);
    setActiveTab("participants");
  };

  const handleCloseRoom = (roomId: string) => {
    console.log(`Closing room ${roomId}`);
    // In a real app, you would call an API to close the room
  };

  const formatDuration = (duration: string) => {
    const [hours, minutes, seconds] = duration.split(':');
    if (Number(hours) > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${seconds}s`;
  };
  
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>Study Rooms Monitor | College Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Study Rooms Monitor</h1>
          <p className="text-muted-foreground mt-1">View and manage active study rooms.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Video className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Rooms</p>
                <p className="text-2xl font-bold">
                  {mockStudyRooms.filter(room => room.status === "active").length}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <UsersIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Participants</p>
                <p className="text-2xl font-bold">
                  {mockStudyRooms.reduce((total, room) => total + room.participants.length, 0)}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-xl">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Study Time</p>
                <p className="text-2xl font-bold">8h 45m</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search rooms by title or tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="min-w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Rooms</SelectItem>
              <SelectItem value="Active">Active Only</SelectItem>
              <SelectItem value="Inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Study Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.length > 0 ? (
            filteredRooms.map(room => (
              <Card key={room.id} className={
                room.status === "active" 
                  ? "border-l-4 border-l-green-500" 
                  : "border-l-4 border-l-gray-300"
              }>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-base line-clamp-2">{room.title}</h3>
                      <Badge
                        variant={room.status === "active" ? "default" : "secondary"}
                        className={
                          room.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {room.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {room.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <UsersIcon className="h-3.5 w-3.5" />
                        <span>{room.participants.length} participants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{formatDuration(room.duration)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex -space-x-2 overflow-hidden">
                        {room.participants.slice(0, 3).map(participant => (
                          <Avatar key={participant.id} className="h-6 w-6 border-2 border-white">
                            <AvatarImage src={participant.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name)}&background=0D8ABC&color=fff`} />
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {room.participants.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                            +{room.participants.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-2">
                      <span className="text-xs text-gray-500">
                        Created: {formatDateTime(room.createdAt)}
                      </span>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8" onClick={() => handleViewRoom(room)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-red-600"
                          onClick={() => handleCloseRoom(room.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center p-8 border rounded-lg bg-gray-50">
              <p className="text-muted-foreground">No study rooms found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Room View Dialog */}
      {viewingRoom && (
        <Dialog open={!!viewingRoom} onOpenChange={(open) => !open && setViewingRoom(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{viewingRoom.title}</DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {viewingRoom.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Tag className="h-3.5 w-3.5 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <UsersIcon className="h-4 w-4" />
                <span>{viewingRoom.participants.length} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Duration: {formatDuration(viewingRoom.duration)}</span>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="participants">
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Participants
                </TabsTrigger>
                <TabsTrigger value="chat">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="participants" className="p-0 mt-4">
                <Card>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {viewingRoom.participants.map((participant: any) => (
                        <li key={participant.id} className="flex items-center gap-3 p-3">
                          <Avatar>
                            <AvatarImage src={participant.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name)}&background=0D8ABC&color=fff`} />
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="chat" className="p-0 mt-4">
                <Card className="border">
                  <CardContent className="p-0">
                    <div className="max-h-80 overflow-y-auto">
                      <ul className="divide-y">
                        {viewingRoom.messages.map((message: any) => (
                          <li key={message.id} className="p-3">
                            <div className="flex justify-between">
                              <p className="font-medium">{message.userName}</p>
                              <p className="text-xs text-gray-500">{message.time}</p>
                            </div>
                            <p className="text-sm mt-1">{message.content}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-gray-50 border-t text-center">
                      <p className="text-sm text-muted-foreground">
                        This is a read-only view of the chat for monitoring purposes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="destructive"
                onClick={() => {
                  handleCloseRoom(viewingRoom.id);
                  setViewingRoom(null);
                }}
              >
                Close Room
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default StudyRoomsMonitor;

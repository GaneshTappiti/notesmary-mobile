
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Helmet } from 'react-helmet-async';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search,
  MoreHorizontal,
  Eye,
  Flag,
  CheckSquare,
  Trash,
  MessageSquare
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Sender {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  content: string;
  sender: Sender;
  roomName: string;
  timestamp: string;
  flagged: boolean;
  flagReason: string | null;
  flaggedBy: string | null;
}

const AdminMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [flagStatusFilter, setFlagStatusFilter] = useState<'all' | 'flagged' | 'cleared'>('all');
  const [viewMessageId, setViewMessageId] = useState<string | null>(null);
  
  // Mock data for messages
  const messages: Message[] = [
    {
      id: '1',
      content: "Can anyone share their notes from yesterday's lecture on differential equations?",
      sender: {
        id: '101',
        name: 'Emma Thompson',
        avatar: ''
      },
      roomName: 'Advanced Mathematics',
      timestamp: '2023-04-15T10:23:15',
      flagged: true,
      flagReason: 'Possible academic misconduct',
      flaggedBy: 'Michael Williams'
    },
    {
      id: '2',
      content: 'I created a study guide for the upcoming exam. It covers all the topics Professor Johnson mentioned would be important.',
      sender: {
        id: '102',
        name: 'Sophia Chen',
        avatar: ''
      },
      roomName: 'Physics Group Study',
      timestamp: '2023-04-15T09:45:00',
      flagged: false,
      flagReason: null,
      flaggedBy: null
    },
    {
      id: '3',
      content: "This class is completely useless and the professor doesn't know what they're talking about.",
      sender: {
        id: '103',
        name: 'John Davis',
        avatar: ''
      },
      roomName: 'Chemistry 101',
      timestamp: '2023-04-14T16:30:22',
      flagged: true,
      flagReason: 'Inappropriate content',
      flaggedBy: 'Jessica Brown'
    },
    {
      id: '4',
      content: 'Thanks for sharing that resource, it was really helpful for understanding the concept!',
      sender: {
        id: '104',
        name: 'Jessica Brown',
        avatar: ''
      },
      roomName: 'Biology Research',
      timestamp: '2023-04-14T14:12:55',
      flagged: false,
      flagReason: null,
      flaggedBy: null
    },
    {
      id: '5',
      content: 'Does anyone have the answer key to the practice exam? I need it urgently.',
      sender: {
        id: '105',
        name: 'Michael Williams',
        avatar: ''
      },
      roomName: 'Computer Science 305',
      timestamp: '2023-04-13T18:05:10',
      flagged: true,
      flagReason: 'Potential academic dishonesty',
      flaggedBy: 'Emma Thompson'
    }
  ];

  // Find the currently viewed message
  const currentMessage = messages.find(message => message.id === viewMessageId);

  // Filter messages based on search and flag status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.roomName.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFlagStatus = 
      flagStatusFilter === 'all' || 
      (flagStatusFilter === 'flagged' && message.flagged) || 
      (flagStatusFilter === 'cleared' && !message.flagged);
    
    return matchesSearch && matchesFlagStatus;
  });
  
  const getFlagStatusBadge = (flagged: boolean) => {
    return flagged ? 
      <Badge variant="destructive" className="flex items-center gap-1">
        <Flag className="h-3 w-3" />
        <span>Flagged</span>
      </Badge> : 
      <Badge variant="outline" className="border-green-500 text-green-500">
        Cleared
      </Badge>;
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };
  
  const formatMessagePreview = (content: string, maxLength = 50) => {
    if (content.length <= maxLength) return content;
    return `${content.substring(0, maxLength)}...`;
  };
  
  const handleViewMessage = (id: string) => {
    setViewMessageId(id);
  };
  
  const handleClearFlag = (id: string) => {
    console.log(`Clearing flag on message with id: ${id}`);
    // In a real app, this would make an API call to update the message
  };
  
  const handleFlagMessage = (id: string) => {
    console.log(`Flagging message with id: ${id}`);
    // In a real app, this would open a dialog to enter flag reason
  };
  
  const handleDeleteMessage = (id: string) => {
    console.log(`Deleting message with id: ${id}`);
    // In a real app, this would make an API call to delete the message
  };

  return (
    <>
      <Helmet>
        <title>Message Moderation | Admin Dashboard</title>
      </Helmet>
      
      <AdminLayout>
        <PageContainer className="py-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
              
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {flagStatusFilter === 'all' ? 'All Messages' : 
                       flagStatusFilter === 'flagged' ? 'Flagged' : 'Cleared'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFlagStatusFilter('all')}>
                      All Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFlagStatusFilter('flagged')}>
                      Flagged Only
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFlagStatusFilter('cleared')}>
                      Cleared Only
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Message</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No messages found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span>{formatMessagePreview(message.content)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                              <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
                            </Avatar>
                            <span>{message.sender.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{message.roomName}</TableCell>
                        <TableCell>{formatDateTime(message.timestamp)}</TableCell>
                        <TableCell>{getFlagStatusBadge(message.flagged)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View Message"
                              onClick={() => handleViewMessage(message.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {message.flagged ? (
                                  <DropdownMenuItem onClick={() => handleClearFlag(message.id)}>
                                    <CheckSquare className="mr-2 h-4 w-4" />
                                    Clear Flag
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => handleFlagMessage(message.id)}>
                                    <Flag className="mr-2 h-4 w-4" />
                                    Flag Message
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                      className="text-red-500 focus:text-red-500"
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the message
                                        and remove it from the study room.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-red-500 hover:bg-red-600"
                                        onClick={() => handleDeleteMessage(message.id)}
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </PageContainer>
      </AdminLayout>
      
      {/* Message View Dialog */}
      <Dialog open={!!viewMessageId} onOpenChange={(open) => !open && setViewMessageId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              Sent in {currentMessage?.roomName}
            </DialogDescription>
          </DialogHeader>
          
          {currentMessage && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentMessage.sender.avatar} alt={currentMessage.sender.name} />
                  <AvatarFallback>{getInitials(currentMessage.sender.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{currentMessage.sender.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(currentMessage.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{currentMessage.content}</p>
                </div>
              </div>
              
              {currentMessage.flagged && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-900/50">
                  <div className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
                    <Flag className="h-4 w-4" />
                    <span>Flagged Message</span>
                  </div>
                  <p className="text-sm mt-1 text-red-600 dark:text-red-400">
                    <span className="font-medium">Reason:</span> {currentMessage.flagReason}
                  </p>
                  <p className="text-xs mt-1 text-red-600 dark:text-red-400">
                    Flagged by: {currentMessage.flaggedBy}
                  </p>
                </div>
              )}
              
              <div className="flex justify-between pt-4">
                {currentMessage.flagged ? (
                  <Button variant="outline" onClick={() => handleClearFlag(currentMessage.id)}>
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Clear Flag
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => handleFlagMessage(currentMessage.id)}>
                    <Flag className="mr-2 h-4 w-4" />
                    Flag Message
                  </Button>
                )}
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the message
                        and remove it from the study room.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => {
                          handleDeleteMessage(currentMessage.id);
                          setViewMessageId(null);
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminMessages;

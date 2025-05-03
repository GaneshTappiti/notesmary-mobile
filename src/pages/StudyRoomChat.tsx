
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Info, 
  Phone, 
  Video, 
  Users, 
  Send, 
  PaperclipIcon,
  Image,
  File,
  Smile
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Helper to format timestamps
const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Helper to format dates
const formatMessageDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString();
  }
};

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  avatar?: string;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}

const StudyRoomChat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  
  // Mock data for the room
  const room = {
    id,
    name: "Advanced Physics Study Group",
    memberCount: 5,
    onlineCount: 3
  };
  
  // Mock current user
  const currentUser = {
    id: "current-user",
    name: "You",
    avatar: ""
  };
  
  // Mock other users
  const otherUsers: User[] = [
    { id: "user1", name: "Alex Johnson", avatar: "", isOnline: true },
    { id: "user2", name: "Jamie Smith", avatar: "", isOnline: true },
    { id: "user3", name: "Taylor Brown", avatar: "", isOnline: false },
    { id: "user4", name: "Jordan Lee", avatar: "", isOnline: true }
  ];
  
  // Mock messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg1",
      senderId: "user1",
      senderName: "Alex Johnson",
      content: "Hey everyone! I just uploaded some notes on thermodynamics to the resources section.",
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      isRead: true
    },
    {
      id: "msg2",
      senderId: "user2",
      senderName: "Jamie Smith",
      content: "Thanks Alex! Those will be super helpful for the upcoming exam.",
      timestamp: new Date(Date.now() - 36000000), // 10 hours ago
      isRead: true
    },
    {
      id: "msg3",
      senderId: "current-user",
      senderName: "You",
      content: "I've been struggling with the concept of entropy. Could someone help explain it?",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true
    },
    {
      id: "msg4",
      senderId: "user4",
      senderName: "Jordan Lee",
      content: "Sure! Entropy is basically a measure of disorder or randomness in a system. The second law of thermodynamics states that entropy always increases in an isolated system.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: true
    },
    {
      id: "msg5",
      senderId: "user1",
      senderName: "Alex Johnson",
      content: "To add to what Jordan said, think of it like your room. It naturally gets messier over time unless you put in energy to clean it. That's entropy increasing!",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isRead: true
    }
  ]);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Simulate typing indicator
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      if (Math.random() > 0.7) {
        const randomUser = otherUsers.filter(user => user.isOnline)[Math.floor(Math.random() * otherUsers.filter(user => user.isOnline).length)];
        setIsTyping(true);
        setTypingUser(randomUser.name);
        
        // Clear after a few seconds
        setTimeout(() => {
          setIsTyping(false);
          setTypingUser(null);
        }, 3000);
      }
    }, 10000);
    
    return () => clearTimeout(typingTimeout);
  }, [messages, otherUsers]);
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: message,
      timestamp: new Date(),
      isRead: false
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate response after a delay
    setTimeout(() => {
      const randomUser = otherUsers.filter(user => user.isOnline)[Math.floor(Math.random() * otherUsers.filter(user => user.isOnline).length)];
      const responseMessage: Message = {
        id: `msg${Date.now() + 1}`,
        senderId: randomUser.id,
        senderName: randomUser.name,
        content: "That's a great point! Let me add that to my notes.",
        timestamp: new Date(),
        isRead: true
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 8000);
  };
  
  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  messages.forEach(msg => {
    const dateStr = formatMessageDate(msg.timestamp);
    if (!groupedMessages[dateStr]) {
      groupedMessages[dateStr] = [];
    }
    groupedMessages[dateStr].push(msg);
  });
  
  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Chat header - Discord inspired */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(`/study-room/${id}/info`)} 
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="font-semibold text-lg">{room.name}</h1>
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded-full">
                Live
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 bg-green-500 rounded-full"></span>
              {room.onlineCount} online • {room.memberCount} members
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Video className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => navigate(`/study-room/${id}/info`)}
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => navigate(`/study-room/${id}/info`)}
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Chat messages area - Discord inspired */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800"
      >
        {Object.entries(groupedMessages).map(([date, msgs], dateIndex) => (
          <div key={date} className="space-y-3">
            <div className="flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                {date}
              </div>
            </div>
            
            {msgs.map((msg, i) => {
              const isCurrentUser = msg.senderId === currentUser.id;
              const senderInitials = msg.senderName
                .split(' ')
                .map(n => n[0])
                .join('');
              
              // Group consecutive messages from same sender
              const isPreviousSameSender = i > 0 && msgs[i-1].senderId === msg.senderId;
              
              return (
                <div 
                  key={msg.id}
                  className={`flex gap-2 ${isPreviousSameSender ? 'mt-1 pt-0' : 'pt-2'}`}
                >
                  {!isCurrentUser && !isPreviousSameSender && (
                    <Avatar className="h-9 w-9 mt-0.5">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback className="bg-indigo-500 text-white text-xs">
                        {senderInitials}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  {!isCurrentUser && isPreviousSameSender && (
                    <div className="w-9"></div> // Spacer for alignment
                  )}
                  
                  <div className="flex-1">
                    {!isPreviousSameSender && !isCurrentUser && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{msg.senderName}</span>
                        <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                      </div>
                    )}
                    
                    {!isPreviousSameSender && isCurrentUser && (
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                        <span className="font-medium text-sm text-indigo-600">{msg.senderName}</span>
                      </div>
                    )}
                    
                    <div className={`rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${isCurrentUser ? 'bg-indigo-50 dark:bg-indigo-900/30 ml-auto' : ''}`}>
                      <p className="break-words">{msg.content}</p>
                    </div>
                    
                    {isPreviousSameSender && (
                      <span className="text-xs text-muted-foreground ml-3">{formatTime(msg.timestamp)}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && typingUser && (
          <div className="flex items-center gap-2 text-sm text-gray-500 ml-12">
            <div className="flex gap-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce delay-75">•</span>
              <span className="animate-bounce delay-150">•</span>
            </div>
            <span>{typingUser} is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input area - Discord inspired */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3">
        <div className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 overflow-hidden">
          <Textarea
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="min-h-[60px] max-h-[120px] py-3 px-4 rounded-none border-0 focus:ring-0 resize-none"
          />
          
          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-750">
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-600">
                <PaperclipIcon className="h-4 w-4 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-600">
                <Image className="h-4 w-4 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-600">
                <File className="h-4 w-4 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-600">
                <Smile className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
            
            <Button 
              onClick={sendMessage}
              disabled={!message.trim()}
              size="sm"
              className="rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyRoomChat;

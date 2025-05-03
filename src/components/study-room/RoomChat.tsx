
import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Send, PaperclipIcon, Image as ImageIcon, File, Smile } from 'lucide-react';

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

interface RoomChatProps {
  roomId: string;
  messages: Array<Message>;
}

export const RoomChat = ({ roomId, messages: initialMessages }: RoomChatProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  
  // Mock current user
  const currentUser = {
    id: "current-user",
    name: "You",
    avatar: ""
  };
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Simulate typing indicator
  useEffect(() => {
    if (initialMessages.length > 0) {
      const typingTimeout = setTimeout(() => {
        if (Math.random() > 0.7) {
          // Random user is typing
          setIsTyping(true);
          setTypingUser("Alex Johnson");
          
          // Clear after a few seconds
          setTimeout(() => {
            setIsTyping(false);
            setTypingUser(null);
          }, 3000);
        }
      }, 5000);
      
      return () => clearTimeout(typingTimeout);
    }
  }, [messages, initialMessages]);
  
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
      const responseMessage: Message = {
        id: `msg${Date.now() + 1}`,
        senderId: "user1",
        senderName: "Alex Johnson",
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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800">
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
      
      {/* Message input area */}
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
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <PaperclipIcon className="h-4 w-4 text-gray-500" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ImageIcon className="h-4 w-4 text-gray-500" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <File className="h-4 w-4 text-gray-500" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
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

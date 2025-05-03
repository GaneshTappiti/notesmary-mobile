
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomSidebar } from '@/components/study-room/RoomSidebar';
import { RoomHeader } from '@/components/study-room/RoomHeader';
import { RoomTabs } from '@/components/study-room/RoomTabs';
import { RoomInfoSidebar } from '@/components/study-room/RoomInfoSidebar';

// Mock data for the room
const mockRoom = {
  name: 'Advanced Physics Study Group',
  subject: 'Physics',
  isPrivate: false,
  memberCount: 5,
  onlineCount: 3,
  description: 'Collaborative study space for Advanced Physics concepts and problem-solving.',
  members: [
    { id: '1', name: 'Alex Johnson', avatar: '', role: 'Admin', status: 'online' },
    { id: '2', name: 'Sarah Chen', avatar: '', role: 'Member', status: 'online' },
    { id: '3', name: 'Michael Brown', avatar: '', role: 'Member', status: 'offline' },
    { id: '4', name: 'Jessica Lee', avatar: '', role: 'Member', status: 'online' },
    { id: '5', name: 'David Kim', avatar: '', role: 'Member', status: 'offline' },
  ],
  resources: [
    { id: '1', title: 'Physics Formula Sheet', type: 'PDF', uploadedBy: 'Alex Johnson', date: '2 days ago' },
    { id: '2', title: 'Week 4 Study Plan', type: 'Document', uploadedBy: 'Sarah Chen', date: '5 days ago' },
    { id: '3', title: 'Problem Set Solutions', type: 'PDF', uploadedBy: 'Michael Brown', date: '1 week ago' },
  ]
};

// Mock data for messages
const mockMessages = [
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
];

const StudyRoom = () => {
  const { id } = useParams<{ id: string }>();
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  
  const toggleLeftSidebar = () => {
    setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed);
  };
  
  const toggleRightSidebar = () => {
    setIsRightSidebarCollapsed(!isRightSidebarCollapsed);
  };

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <RoomSidebar
        collapsed={isLeftSidebarCollapsed}
        toggleSidebar={toggleLeftSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <RoomHeader 
          room={{
            id: id || '1',
            name: mockRoom.name,
            subject: mockRoom.subject,
            isPrivate: mockRoom.isPrivate,
            memberCount: mockRoom.memberCount,
            onlineCount: mockRoom.onlineCount
          }} 
        />
        
        <div className="flex-1 overflow-hidden">
          <RoomTabs roomId={id || '1'} messages={mockMessages} />
        </div>
      </div>
      
      <RoomInfoSidebar
        collapsed={isRightSidebarCollapsed}
        toggleSidebar={toggleRightSidebar}
        room={{
          name: mockRoom.name,
          description: mockRoom.description,
          members: mockRoom.members,
          resources: mockRoom.resources
        }}
      />
    </div>
  );
};

export default StudyRoom;

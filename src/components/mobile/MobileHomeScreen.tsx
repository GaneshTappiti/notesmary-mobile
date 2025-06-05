import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Users, 
  Brain, 
  Calculator, 
  Globe, 
  Zap,
  Share2,
  Heart,
  MessageCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { MobileHeader } from './MobileHeader';

interface CategoryItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

interface FeedItem {
  id: string;
  type: 'note' | 'room' | 'achievement';
  title: string;
  description: string;
  tags: string[];
  author: string;
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  isJoined?: boolean;
  isPopular?: boolean;
}

export const MobileHomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories: CategoryItem[] = [
    { id: 'all', title: 'All', icon: <Globe size={20} />, color: 'bg-blue-500', count: 234 },
    { id: 'notes', title: 'Notes', icon: <BookOpen size={20} />, color: 'bg-green-500', count: 156 },
    { id: 'rooms', title: 'Rooms', icon: <Users size={20} />, color: 'bg-purple-500', count: 42 },
    { id: 'ai', title: 'AI Help', icon: <Brain size={20} />, color: 'bg-orange-500', count: 89 },
    { id: 'math', title: 'Math', icon: <Calculator size={20} />, color: 'bg-red-500', count: 67 },
    { id: 'trending', title: 'Trending', icon: <TrendingUp size={20} />, color: 'bg-pink-500', count: 23 },
  ];

  const feedItems: FeedItem[] = [
    {
      id: '1',
      type: 'note',
      title: 'Advanced Calculus Study Guide',
      description: 'Comprehensive notes covering derivatives, integrals, and applications',
      tags: ['Mathematics', 'Calculus', 'Study Guide'],
      author: 'Sarah Chen',
      timestamp: '2 hours ago',
      engagement: { likes: 24, comments: 8, shares: 12 },
      isPopular: true
    },
    {
      id: '2',
      type: 'room',
      title: 'Physics Study Group - Quantum Mechanics',
      description: 'Join us for an interactive session on quantum mechanics fundamentals',
      tags: ['Physics', 'Quantum', 'Group Study'],
      author: 'Dr. Martinez',
      timestamp: '4 hours ago',
      engagement: { likes: 18, comments: 5, shares: 7 },
      isJoined: false
    },
    {
      id: '3',
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      description: 'You\'ve completed 10 study sessions this week. Keep it up!',
      tags: ['Achievement', 'Progress'],
      author: 'StudyPulse',
      timestamp: '1 day ago',
      engagement: { likes: 45, comments: 12, shares: 8 }
    },
    {
      id: '4',
      type: 'note',
      title: 'Organic Chemistry Reaction Mechanisms',
      description: 'Visual guide to understanding complex organic reactions',
      tags: ['Chemistry', 'Organic', 'Reactions'],
      author: 'Michael K.',
      timestamp: '1 day ago',
      engagement: { likes: 31, comments: 15, shares: 9 }
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchClick = () => {
    navigate('/find-notes');
  };

  const handleJoinRoom = (itemId: string) => {
    console.log('Joining room:', itemId);
    navigate('/study-rooms');
  };

  const handleShareItem = (itemId: string) => {
    console.log('Sharing item:', itemId);
    // Implement share functionality
  };

  const handleViewItem = (item: FeedItem) => {
    if (item.type === 'note') {
      navigate('/my-notes');
    } else if (item.type === 'room') {
      navigate('/study-rooms');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'note': return <BookOpen size={16} />;
      case 'room': return <Users size={16} />;
      case 'achievement': return <Zap size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'note': return 'bg-blue-100 text-blue-600';
      case 'room': return 'bg-purple-100 text-purple-600';
      case 'achievement': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Top Header - Simplified without menu button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StudyPulse
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchClick}
              className="h-10 w-10"
            >
              <Search size={20} />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user?.user_metadata?.full_name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 overflow-hidden">
        {/* Categories Horizontal Scroll */}
        <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleCategorySelect(category.id)}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`p-1 rounded-full ${selectedCategory === category.id ? 'bg-white/20' : category.color}`}>
                  <div className={selectedCategory === category.id ? 'text-white' : 'text-white'}>
                    {category.icon}
                  </div>
                </div>
                <span className="text-sm font-medium">{category.title}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Feed Section */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {feedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                {item.isPopular && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                      Trending
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1 rounded ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                    </div>
                  </div>
                  <CardTitle 
                    className="text-lg leading-tight cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => handleViewItem(item)}
                  >
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {item.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Author and Timestamp */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>By {item.author}</span>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                  
                  {/* Engagement and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart size={14} />
                        <span>{item.engagement.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        <span>{item.engagement.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 size={14} />
                        <span>{item.engagement.shares}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {item.type === 'room' && (
                        <Button
                          size="sm"
                          variant={item.isJoined ? "outline" : "default"}
                          className="text-xs px-3 py-1 h-7"
                          onClick={() => handleJoinRoom(item.id)}
                        >
                          {item.isJoined ? 'Joined' : 'Join'}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs px-2 py-1 h-7"
                        onClick={() => handleShareItem(item.id)}
                      >
                        <Share2 size={12} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {/* Load More Button */}
          <motion.div 
            className="flex justify-center pt-4 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="outline" className="w-full">
              Load More Content
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

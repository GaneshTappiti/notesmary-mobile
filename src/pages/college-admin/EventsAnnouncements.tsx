
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Calendar, 
  Megaphone, 
  Clock, 
  Users, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreateEventAnnouncementModal } from '@/components/college-admin/CreateEventAnnouncementModal';

// Mock data for events and announcements
const mockEvents = [
  {
    id: '1',
    title: 'Computer Science Symposium 2024',
    type: 'event',
    date: '2024-12-20',
    time: '09:00 AM',
    description: 'Annual tech symposium featuring industry speakers',
    audience: 'Computer Science',
    status: 'published',
    createdAt: '2024-12-01',
    author: 'Dr. Smith'
  },
  {
    id: '2',
    title: 'Final Exam Schedule Released',
    type: 'event',
    date: '2024-12-15',
    time: '10:00 AM',
    description: 'Final examination schedule for Winter 2024',
    audience: 'All Students',
    status: 'draft',
    createdAt: '2024-12-02',
    author: 'Admin Office'
  }
];

const mockAnnouncements = [
  {
    id: '1',
    title: 'Library Hours Extended During Finals',
    type: 'announcement',
    date: '2024-12-10',
    description: 'Library will be open 24/7 during final exam week',
    audience: 'All Students',
    status: 'published',
    createdAt: '2024-12-01',
    author: 'Library Staff'
  },
  {
    id: '2',
    title: 'New Parking Regulations',
    type: 'announcement',
    date: '2024-12-05',
    description: 'Updated parking policies effective January 2025',
    audience: 'All Students',
    status: 'scheduled',
    createdAt: '2024-12-03',
    author: 'Security Office'
  }
];

const EventsAnnouncements = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const [audienceFilter, setAudienceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCreateNew = (data: any) => {
    console.log('Creating new item:', data);
    toast({
      title: `${activeTab === 'events' ? 'Event' : 'Announcement'} Created`,
      description: `Successfully created "${data.title}".`,
    });
    setCreateModalOpen(false);
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Item",
      description: `Opening editor for item ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Item Deleted",
      description: `Successfully deleted item ${id}`,
    });
  };

  const handlePreview = (id: string) => {
    toast({
      title: "Preview",
      description: `Showing preview for item ${id}`,
    });
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAudience = audienceFilter === 'all' || event.audience === audienceFilter;
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesAudience && matchesStatus;
  });

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAudience = audienceFilter === 'all' || announcement.audience === audienceFilter;
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
    return matchesSearch && matchesAudience && matchesStatus;
  });

  const ItemCard = ({ item }: { item: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {item.date}
              </div>
              {item.time && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {item.time}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {item.audience}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.type}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handlePreview(item.id)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDelete(item.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-3">{item.description}</p>
        <div className="text-xs text-muted-foreground">
          Created by {item.author} on {item.createdAt}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Events & Announcements | College Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events & Announcements</h1>
          <p className="text-muted-foreground">
            Manage events and announcements for your institution
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events and announcements..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={audienceFilter} onValueChange={setAudienceFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Audiences</SelectItem>
                <SelectItem value="All Students">All Students</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              Announcements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6">
              {filteredEvents.map((event) => (
                <ItemCard key={event.id} item={event} />
              ))}
              {filteredEvents.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No events found</h3>
                  <p>No events match your current filters.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <div className="grid gap-6">
              {filteredAnnouncements.map((announcement) => (
                <ItemCard key={announcement.id} item={announcement} />
              ))}
              {filteredAnnouncements.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No announcements found</h3>
                  <p>No announcements match your current filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setCreateModalOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Create Modal */}
      <CreateEventAnnouncementModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleCreateNew}
        type={activeTab === 'events' ? 'event' : 'announcement'}
      />
    </>
  );
};

export default EventsAnnouncements;

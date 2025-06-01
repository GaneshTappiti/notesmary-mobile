
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PageContainer } from '@/components/PageContainer';
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
  Download,
  Filter,
  MoreHorizontal,
  Edit,
  Archive,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreateEventAnnouncementModal } from '@/components/admin/CreateEventAnnouncementModal';

// Mock data with enhanced properties
const mockEvents = [
  {
    id: '1',
    title: 'System Maintenance Window',
    date: '2024-12-15',
    time: '02:00 AM',
    description: 'Scheduled maintenance for database optimization',
    status: 'scheduled',
    attendees: 0,
    type: 'event',
    category: 'system_notice',
    tags: ['maintenance', 'database'],
    createdAt: '2024-12-01'
  },
  {
    id: '2',
    title: 'New College Onboarding Session',
    date: '2024-12-20',
    time: '10:00 AM',
    description: 'Training session for newly registered colleges',
    status: 'active',
    attendees: 15,
    type: 'event',
    category: 'info',
    tags: ['onboarding', 'training'],
    createdAt: '2024-12-02'
  }
];

const mockAnnouncements = [
  {
    id: '1',
    title: 'New Feature Release: Study Analytics',
    date: '2024-12-01',
    description: 'We are excited to announce the launch of our new Study Analytics feature',
    status: 'published',
    views: 1250,
    type: 'announcement',
    category: 'update',
    tags: ['feature', 'analytics'],
    createdAt: '2024-12-01'
  },
  {
    id: '2',
    title: 'Holiday Schedule Updates',
    date: '2024-12-10',
    description: 'Important updates regarding platform availability during holidays',
    status: 'draft',
    views: 0,
    type: 'announcement',
    category: 'info',
    tags: ['schedule', 'holidays'],
    createdAt: '2024-12-05'
  }
];

const AdminEventsAnnouncements = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'system_notice':
        return 'bg-purple-100 text-purple-800';
      case 'info':
        return 'bg-cyan-100 text-cyan-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateNew = (data: any) => {
    console.log('Creating new item:', data);
    toast({
      title: `${activeTab === 'events' ? 'Event' : 'Announcement'} Created`,
      description: `Successfully created "${data.title}".`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: `Exporting ${activeTab} data...`,
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Item",
      description: `Opening editor for item ${id}`,
    });
  };

  const handleArchive = (id: string) => {
    toast({
      title: "Item Archived",
      description: `Successfully archived item ${id}`,
    });
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || announcement.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const ItemCard = ({ item }: { item: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
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
                {item.attendees || item.views} {item.attendees ? 'attendees' : 'views'}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
              <Badge className={getCategoryColor(item.category)}>
                {item.category.replace('_', ' ')}
              </Badge>
              {item.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleArchive(item.id)}>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{item.description}</p>
        <div className="text-xs text-muted-foreground">
          Created: {item.createdAt}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Events & Announcements | Super Admin</title>
      </Helmet>
      
      <AdminLayout>
        <PageContainer className="py-6">
          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Events & Announcements</h1>
                <p className="text-muted-foreground">Manage system events and announcements</p>
              </div>
              <Button onClick={handleExport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events and announcements..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="system_notice">System Notice</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="announcements" className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4" />
                  Announcements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="events">
                <div className="grid gap-6">
                  {filteredEvents.map((event) => (
                    <ItemCard key={event.id} item={event} />
                  ))}
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No events found matching your criteria.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="announcements">
                <div className="grid gap-6">
                  {filteredAnnouncements.map((announcement) => (
                    <ItemCard key={announcement.id} item={announcement} />
                  ))}
                  {filteredAnnouncements.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No announcements found matching your criteria.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </PageContainer>

        {/* Floating Action Button */}
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>

        {/* Create Modal */}
        <CreateEventAnnouncementModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
          onSubmit={handleCreateNew}
          type={activeTab as 'event' | 'announcement'}
        />
      </AdminLayout>
    </>
  );
};

export default AdminEventsAnnouncements;

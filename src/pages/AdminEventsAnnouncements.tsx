
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Calendar, Megaphone, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'System Maintenance Window',
    date: '2024-12-15',
    time: '02:00 AM',
    description: 'Scheduled maintenance for database optimization',
    status: 'scheduled',
    attendees: 0,
    type: 'event'
  },
  {
    id: '2',
    title: 'New College Onboarding Session',
    date: '2024-12-20',
    time: '10:00 AM',
    description: 'Training session for newly registered colleges',
    status: 'active',
    attendees: 15,
    type: 'event'
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
    type: 'announcement'
  },
  {
    id: '2',
    title: 'Holiday Schedule Updates',
    date: '2024-12-10',
    description: 'Important updates regarding platform availability during holidays',
    status: 'draft',
    views: 0,
    type: 'announcement'
  }
];

const AdminEventsAnnouncements = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('events');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleCreateNew = () => {
    toast({
      title: `Create New ${activeTab === 'events' ? 'Event' : 'Announcement'}`,
      description: `Opening form to create a new ${activeTab === 'events' ? 'event' : 'announcement'}.`,
    });
  };

  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAnnouncements = mockAnnouncements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events and announcements..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {event.attendees} attendees
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Cancel</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="announcements">
                <div className="grid gap-6">
                  {filteredAnnouncements.map((announcement) => (
                    <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{announcement.title}</CardTitle>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {announcement.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {announcement.views} views
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(announcement.status)}>
                            {announcement.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{announcement.description}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                          {announcement.status === 'published' ? (
                            <Button variant="outline" size="sm">Unpublish</Button>
                          ) : (
                            <Button variant="outline" size="sm">Publish</Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </PageContainer>

        {/* Floating Action Button */}
        <Button
          onClick={handleCreateNew}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </AdminLayout>
    </>
  );
};

export default AdminEventsAnnouncements;

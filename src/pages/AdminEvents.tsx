
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Plus, Bell, Edit, Trash, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
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

// Define interfaces for our data structures
interface BaseItem {
  id: string;
  title: string;
  date: string;
  type: string;
  category: string;
  description: string;
}

interface EventItem extends BaseItem {
  type: 'event';
  location: string;
  importance?: never;
}

interface AnnouncementItem extends BaseItem {
  type: 'announcement';
  importance: string;
  location?: never;
}

type ItemType = EventItem | AnnouncementItem;

// Mock data for events and announcements
const eventsData: EventItem[] = [
  {
    id: 'evt-1',
    title: 'End of Semester Submission',
    date: '2025-05-15T15:00:00',
    type: 'event',
    category: 'academic',
    description: 'Deadline for final project submissions for all Computer Science courses.',
    location: 'Online Portal'
  },
  {
    id: 'evt-2',
    title: 'Summer Coding Camp',
    date: '2025-06-12T09:00:00',
    type: 'event',
    category: 'workshop',
    description: 'A two-week coding camp for all students interested in web development and AI.',
    location: 'Computer Lab Building'
  }
];

const announcementsData: AnnouncementItem[] = [
  {
    id: 'anc-1',
    title: 'System Maintenance',
    date: '2025-05-02T08:00:00',
    type: 'announcement',
    category: 'system',
    description: 'The note-sharing platform will be down for maintenance from 2AM to 4AM EST.',
    importance: 'high'
  },
  {
    id: 'anc-2',
    title: 'New AI Features',
    date: '2025-04-28T12:00:00',
    type: 'announcement',
    category: 'feature',
    description: 'Introducing new AI features to help grade and improve your study notes automatically.',
    importance: 'medium'
  }
];

const AdminEvents = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<EventItem[]>(eventsData);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(announcementsData);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    importance: 'medium',
    type: 'event' as 'event' | 'announcement'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateItem = () => {
    if (!formData.title || !formData.description || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === 'event') {
      const newEvent: EventItem = {
        id: `evt-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        date: date.toISOString(),
        type: 'event',
        category: formData.category,
        location: formData.location
      };
      setEvents(prev => [newEvent, ...prev]);
    } else {
      const newAnnouncement: AnnouncementItem = {
        id: `anc-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        date: date.toISOString(),
        type: 'announcement',
        category: formData.category,
        importance: formData.importance
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
    }

    toast({
      title: `${formData.type === 'event' ? 'Event' : 'Announcement'} Created`,
      description: `Successfully created "${formData.title}"`,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      importance: 'medium',
      type: 'event'
    });
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (id: string, type: string) => {
    toast({
      title: "Edit Item",
      description: `Opening editor for ${type} ${id}`,
    });
    // TODO: Implement edit functionality with pre-filled modal
  };

  const handleDelete = (id: string, type: string) => {
    if (type === 'event') {
      setEvents(events.filter(event => event.id !== id));
    } else {
      setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    }

    toast({
      title: "Item Deleted",
      description: `The ${type} has been successfully deleted.`,
      variant: "destructive"
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPP 'at' p");
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      academic: 'bg-blue-100 text-blue-800',
      workshop: 'bg-purple-100 text-purple-800',
      meetup: 'bg-green-100 text-green-800',
      system: 'bg-red-100 text-red-800',
      feature: 'bg-cyan-100 text-cyan-800',
      policy: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={colors[category] || colors.other}>
        {category}
      </Badge>
    );
  };

  const getImportanceBadge = (importance: string) => {
    const colors: Record<string, string> = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge className={colors[importance] || colors.medium}>
        {importance} priority
      </Badge>
    );
  };

  return (
    <>
      <Helmet>
        <title>Events & Announcements | Admin Dashboard</title>
      </Helmet>
      
      <div className="p-6">
        <PageContainer className="max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Events & Announcements</h1>
              <p className="text-muted-foreground">Manage system events and announcements</p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create {formData.type === 'event' ? 'Event' : 'Announcement'}</DialogTitle>
                  <DialogDescription>
                    Create a new {formData.type} for the platform.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value: 'event' | 'announcement') => handleSelectChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder={`${formData.type} title...`}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter description..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="feature">Feature</SelectItem>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Date & Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {formData.type === 'event' && (
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Event location..."
                      />
                    </div>
                  )}
                  
                  {formData.type === 'announcement' && (
                    <div>
                      <Label htmlFor="importance">Priority</Label>
                      <Select value={formData.importance} onValueChange={(value) => handleSelectChange('importance', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateItem}>
                    Create {formData.type === 'event' ? 'Event' : 'Announcement'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Events ({events.length})
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Announcements ({announcements.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events">
              <div className="grid gap-6">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span>{formatDate(event.date)}</span>
                            <span>📍 {event.location}</span>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getCategoryBadge(event.category)}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(event.id, 'event')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Event</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{event.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(event.id, 'event')}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
                {events.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No events yet</h3>
                      <p className="text-muted-foreground text-center">
                        Create your first event to get started.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="announcements">
              <div className="grid gap-6">
                {announcements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{announcement.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {formatDate(announcement.date)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getCategoryBadge(announcement.category)}
                          {getImportanceBadge(announcement.importance)}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(announcement.id, 'announcement')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{announcement.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(announcement.id, 'announcement')}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{announcement.description}</p>
                    </CardContent>
                  </Card>
                ))}
                {announcements.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No announcements yet</h3>
                      <p className="text-muted-foreground text-center">
                        Create your first announcement to get started.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </PageContainer>
      </div>
    </>
  );
};

export default AdminEvents;

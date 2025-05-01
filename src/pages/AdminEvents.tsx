
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { AdminLayout } from '@/components/admin/AdminLayout';
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

  const handleDelete = (id: string, type: string) => {
    if (type === 'event') {
      setEvents(events.filter(event => event.id !== id));
    } else {
      setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    }

    toast({
      title: "Item Deleted",
      description: `The ${type} has been successfully deleted.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPP 'at' p");
  };

  return (
    <>
      <Helmet>
        <title>Events & Announcements | Admin Dashboard</title>
      </Helmet>
      
      <AdminLayout>
        <PageContainer className="py-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Events & Announcements</h1>
                <p className="text-muted-foreground">Manage and create events and announcements for users.</p>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex gap-2">
                    <Plus size={16} />
                    <span>Create New</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Create New Item</DialogTitle>
                    <DialogDescription>
                      Add a new event or announcement for your users.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value: 'event' | 'announcement') => handleSelectChange('type', value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="announcement">Announcement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <div className="col-span-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.type === 'event' ? (
                            <>
                              <SelectItem value="academic">Academic</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="meetup">Meetup</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="system">System</SelectItem>
                              <SelectItem value="feature">Feature</SelectItem>
                              <SelectItem value="policy">Policy</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.type === 'event' && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                          Location
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="col-span-3"
                        />
                      </div>
                    )}

                    {formData.type === 'announcement' && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="importance" className="text-right">
                          Importance
                        </Label>
                        <Select 
                          value={formData.importance} 
                          onValueChange={(value) => handleSelectChange('importance', value)}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select importance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="col-span-3 min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateItem}>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="events" className="w-full">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Events</span>
                </TabsTrigger>
                <TabsTrigger value="announcements" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Announcements</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="events" className="mt-6">
                {events.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No events</h3>
                    <p className="text-sm text-muted-foreground mb-4">You haven't created any events yet.</p>
                    <Button onClick={() => setIsCreateDialogOpen(true)} variant="outline">
                      <Plus className="h-4 w-4 mr-2" /> Create Event
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {events.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{event.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{formatDate(event.date)}</span>
                                {event.category && (
                                  <Badge variant="secondary" className="ml-2">
                                    {event.category}
                                  </Badge>
                                )}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          {event.location && (
                            <div className="mt-2 text-sm flex items-center gap-2">
                              <span className="font-medium">Location:</span>
                              <span>{event.location}</span>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4 bg-muted/50 flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(event.id, 'event')}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="announcements" className="mt-6">
                {announcements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
                    <Bell className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No announcements</h3>
                    <p className="text-sm text-muted-foreground mb-4">You haven't created any announcements yet.</p>
                    <Button onClick={() => setIsCreateDialogOpen(true)} variant="outline">
                      <Plus className="h-4 w-4 mr-2" /> Create Announcement
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {announcements.map((announcement) => (
                      <Card key={announcement.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {announcement.title}
                                {announcement.importance === 'high' && (
                                  <Badge variant="destructive">High Priority</Badge>
                                )}
                                {announcement.importance === 'medium' && (
                                  <Badge variant="secondary">Medium Priority</Badge>
                                )}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{formatDate(announcement.date)}</span>
                                {announcement.category && (
                                  <Badge variant="outline" className="ml-2">
                                    {announcement.category}
                                  </Badge>
                                )}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{announcement.description}</p>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4 bg-muted/50 flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(announcement.id, 'announcement')}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </PageContainer>
      </AdminLayout>
    </>
  );
};

export default AdminEvents;


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
    // In a real app, this would open an edit modal with pre-filled data
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
                        placeholder="Enter title"
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
                          placeholder="Enter location"
                        />
                      </div>
                    )}

                    {formData.type === 'announcement' && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="importance" className="text-right">
                          Priority
                        </Label>
                        <Select 
                          value={formData.importance} 
                          onValueChange={(value) => handleSelectChange('importance', value)}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select priority" />
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
                        className="col-span-3"
                        placeholder="Enter description"
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleCreateItem}>
                      Create {formData.type === 'event' ? 'Event' : 'Announcement'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Tabs */}
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
                  {events.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No events found. Create your first event!
                    </div>
                  ) : (
                    events.map((event) => (
                      <Card key={event.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(event.date)}
                                </div>
                                <div className="flex items-center gap-1">
                                  📍 {event.location}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                {getCategoryBadge(event.category)}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(event.id, 'event')}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the event.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500 hover:bg-red-600"
                                      onClick={() => handleDelete(event.id, 'event')}
                                    >
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
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="announcements">
                <div className="grid gap-6">
                  {announcements.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No announcements found. Create your first announcement!
                    </div>
                  ) : (
                    announcements.map((announcement) => (
                      <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{announcement.title}</CardTitle>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(announcement.date)}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                {getCategoryBadge(announcement.category)}
                                {getImportanceBadge(announcement.importance)}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(announcement.id, 'announcement')}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the announcement.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500 hover:bg-red-600"
                                      onClick={() => handleDelete(announcement.id, 'announcement')}
                                    >
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
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </PageContainer>
      </div>
    </>
  );
};

export default AdminEvents;

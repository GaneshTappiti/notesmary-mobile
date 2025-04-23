import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Users, Plus, Search, ArrowRight, BookOpen, Lock } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface Room {
  id: string;
  name: string;
  description: string;
  created_by: string;
  is_private: boolean;
  created_at: string;
  member_count: number;
  online_count: number;
}

const createRoomSchema = z.object({
  name: z.string().min(3, "Room name must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  is_private: z.boolean().default(false),
  password: z.string().optional(),
  tags: z.string().optional(),
});

type CreateRoomFormValues = z.infer<typeof createRoomSchema>;

const StudyRooms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [joinPassword, setJoinPassword] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<CreateRoomFormValues>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
      is_private: false,
      password: "",
      tags: ""
    }
  });

  const watchIsPrivate = form.watch("is_private");

  useEffect(() => {
    const fetchRooms = async () => {
      if (!user) return;
      
      setIsLoadingRooms(true);
      try {
        const { data: roomsData, error: roomsError } = await supabase
          .from('rooms')
          .select(`
            *,
            members:room_members(count),
            online_users:room_members(count)
          `)
          .or(`is_private.eq.false,room_members.user_id.eq.${user.id}`);

        if (roomsError) throw roomsError;
        
        const formattedRooms = roomsData.map(room => ({
          ...room,
          member_count: room.members?.[0]?.count || 0,
          online_count: room.online_users?.[0]?.count || 0
        }));
        
        setRooms(formattedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast({
          variant: "destructive",
          title: "Failed to load rooms",
          description: "There was an error loading study rooms."
        });
      } finally {
        setIsLoadingRooms(false);
      }
    };

    if (user) {
      fetchRooms();
    }
  }, [user, toast]);
  
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createRoom = async (data: CreateRoomFormValues) => {
    if (!user) return;
    
    setIsCreatingRoom(true);
    try {
      const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];

      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .insert({
          name: data.name,
          description: data.description,
          created_by: user.id,
          is_private: data.is_private,
          password: data.is_private ? data.password : null,
          tags: tags.length > 0 ? tags : null
        })
        .select();

      if (roomError) throw roomError;

      if (roomData && roomData.length > 0) {
        const { error: memberError } = await supabase
          .from('room_members')
          .insert({
            room_id: roomData[0].id,
            user_id: user.id,
            role: 'admin'
          });

        if (memberError) throw memberError;

        toast({
          title: "Room created",
          description: "Your study room has been created successfully."
        });

        setShowCreateModal(false);
        form.reset();
        
        navigate(`/study-room/${roomData[0].id}`);
      }
    } catch (error) {
      console.error("Error creating room:", error);
      toast({
        variant: "destructive",
        title: "Failed to create room",
        description: "There was an error creating your study room."
      });
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const joinRoom = async (room: Room) => {
    if (!user) return;
    
    if (room.is_private) {
      setSelectedRoom(room);
      setShowJoinModal(true);
      return;
    }
    
    try {
      const { data: existingMember, error: memberCheckError } = await supabase
        .from('room_members')
        .select('*')
        .eq('room_id', room.id)
        .eq('user_id', user.id);

      if (memberCheckError) throw memberCheckError;
      
      if (existingMember && existingMember.length > 0) {
        navigate(`/study-room/${room.id}`);
        return;
      }

      const { error: joinError } = await supabase
        .from('room_members')
        .insert({
          room_id: room.id,
          user_id: user.id,
          role: 'member'
        });

      if (joinError) throw joinError;
      
      toast({
        title: "Joined room",
        description: "You have joined the study room successfully."
      });
      
      navigate(`/study-room/${room.id}`);
    } catch (error) {
      console.error("Error joining room:", error);
      toast({
        variant: "destructive",
        title: "Failed to join room",
        description: "There was an error joining the study room."
      });
    }
  };

  const joinPrivateRoom = async () => {
    if (!user || !selectedRoom) return;
    
    setIsJoining(true);
    try {
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('password')
        .eq('id', selectedRoom.id)
        .single();

      if (roomError) throw roomError;
      
      if (roomData.password !== joinPassword) {
        toast({
          variant: "destructive",
          title: "Incorrect password",
          description: "The password you entered is incorrect."
        });
        return;
      }

      const { error: joinError } = await supabase
        .from('room_members')
        .insert({
          room_id: selectedRoom.id,
          user_id: user.id,
          role: 'member'
        });

      if (joinError) throw joinError;
      
      toast({
        title: "Joined room",
        description: "You have joined the private study room successfully."
      });
      
      setShowJoinModal(false);
      setJoinPassword('');
      navigate(`/study-room/${selectedRoom.id}`);
    } catch (error) {
      console.error("Error joining private room:", error);
      toast({
        variant: "destructive",
        title: "Failed to join room",
        description: "There was an error joining the private study room."
      });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Study Rooms</h1>
          <p className="text-muted-foreground">Join or create collaborative study spaces</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="gap-2"
          >
            <Plus size={16} />
            Create New Room
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search study rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {isLoadingRooms ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border-dashed animate-pulse">
              <CardHeader className="pb-3">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map(room => (
            <Card key={room.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {room.name}
                      {room.is_private && (
                        <Lock size={14} className="text-amber-500" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{room.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>Study Room</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{room.member_count} members</span>
                  </div>
                  <div className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                    {room.online_count > 0 ? `${room.online_count} online` : 'No one online'}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => joinRoom(room)}
                  variant={room.is_private ? 'outline' : 'default'}
                >
                  {room.is_private ? 'Join with Password' : 'Enter'} 
                  <ArrowRight size={14} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/40 rounded-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No study rooms found</h3>
          <p className="text-muted-foreground mb-4">Create a room to start collaborating</p>
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="gap-2"
          >
            <Plus size={16} />
            Create New Room
          </Button>
        </div>
      )}
      
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Study Room</DialogTitle>
            <DialogDescription>
              Create a collaborative space for studying with others
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createRoom)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Physics Study Group" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="A collaborative space for discussing physics concepts and problems"
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="physics, quantum mechanics, thermodynamics" {...field} />
                    </FormControl>
                    <FormDescription>
                      Add tags to help others find your study room
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_private"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Private Room</FormLabel>
                      <FormDescription>
                        Make this room private and require a password to join
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              {watchIsPrivate && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isCreatingRoom}>
                  {isCreatingRoom ? "Creating..." : "Create Room"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Private Study Room</DialogTitle>
            <DialogDescription>
              Enter the password to join {selectedRoom?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <FormLabel>Room Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter room password"
                value={joinPassword}
                onChange={(e) => setJoinPassword(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowJoinModal(false);
                setJoinPassword('');
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={joinPrivateRoom} 
              disabled={!joinPassword || isJoining}
            >
              {isJoining ? "Joining..." : "Join Room"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudyRooms;

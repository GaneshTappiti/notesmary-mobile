
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollegeActivityFeed } from '@/components/admin/colleges/CollegeActivityFeed';
import { CollegeStats } from '@/components/admin/colleges/CollegeStats';
import { ArrowLeft, Pencil, School } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AddEditCollegeModal } from '@/components/admin/colleges/AddEditCollegeModal';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

// Mock data - would be replaced with API call using the id parameter
const getMockCollegeById = (id: string) => {
  const colleges = [
    {
      id: '1',
      name: 'Stanford University',
      domain: 'stanford.edu',
      adminEmail: 'admin@stanford.edu',
      studentsCount: 15000,
      notesCount: 5243,
      activeRooms: 37,
      createdAt: '2024-09-15',
      status: 'active',
      adminName: 'John Stanford',
      adminPhone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'MIT',
      domain: 'mit.edu',
      adminEmail: 'admin@mit.edu',
      studentsCount: 12500,
      notesCount: 6120,
      activeRooms: 42,
      createdAt: '2024-08-22',
      status: 'active',
      adminName: 'Jane Smith',
      adminPhone: '+1 (555) 987-6543'
    }
  ];
  
  return colleges.find(college => college.id === id);
};

const AdminCollegeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  
  // In a real app, fetch data from API based on ID
  const college = getMockCollegeById(id || '1');
  
  if (!college) {
    return (
      <>
        <Helmet>
          <title>College Not Found | Notex Admin</title>
        </Helmet>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <School className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">College Not Found</h2>
            <p className="text-gray-500 mb-6">The college you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/admin/colleges')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Colleges
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Handle accessing college admin view
  const handleAccessCollegeAdminView = () => {
    // Save the original user role/permissions in session storage to restore later
    if (user) {
      sessionStorage.setItem('adminViewingAs', JSON.stringify({
        originalUser: user.email,
        viewingCollege: college.domain
      }));
    }
    
    // Show toast and navigate to college admin dashboard
    toast({
      title: "Accessing College Admin View",
      description: `You are now viewing ${college.name} as a college administrator.`,
    });
    
    // Navigate to college admin dashboard
    navigate('/college-admin/dashboard');
  };

  return (
    <>
      <Helmet>
        <title>{college.name} | College Details | Notex Admin</title>
      </Helmet>
      
      <div className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Header with back button and edit */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/admin/colleges')}
                className="mr-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Colleges
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight">{college.name}</h1>
                  <Badge 
                    variant={college.status === 'active' ? 'outline' : 'destructive'}
                    className={
                      college.status === 'active' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : 'bg-red-100 text-red-800 hover:bg-red-100'
                    }
                  >
                    {college.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">{college.domain}</p>
              </div>
            </div>
            <Button onClick={() => setIsEditModalOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit College
            </Button>
          </div>
          
          {/* College overview section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>College Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <CollegeStats collegeId={college.id} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>College Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm text-gray-500">Domain</div>
                    <div className="col-span-2 text-sm font-medium">{college.domain}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm text-gray-500">Created</div>
                    <div className="col-span-2 text-sm font-medium">{new Date(college.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm text-gray-500">Admin</div>
                    <div className="col-span-2 text-sm font-medium">{college.adminName}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="col-span-2 text-sm font-medium">{college.adminEmail}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="col-span-2 text-sm font-medium">{college.adminPhone}</div>
                  </div>
                  <div className="pt-4">
                    <Button 
                      className="w-full" 
                      onClick={handleAccessCollegeAdminView}
                    >
                      <School className="mr-2 h-4 w-4" />
                      Access Admin View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs for different data views */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="rooms">Study Rooms</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <CollegeActivityFeed collegeId={college.id} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This tab would display a list of students for {college.name} with filtering and sorting options.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This tab would display a list of notes uploaded by {college.name} users.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rooms">
              <Card>
                <CardHeader>
                  <CardTitle>Study Rooms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This tab would display a list of active and scheduled study rooms for {college.name}.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Edit College Modal */}
          <AddEditCollegeModal 
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            collegeData={college}
          />
        </div>
      </div>
    </>
  );
};

export default AdminCollegeDetails;

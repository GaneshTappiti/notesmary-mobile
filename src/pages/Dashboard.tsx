
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Upload, Search, BrainCircuit, Users, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please login to access your dashboard",
      });
      navigate('/authentication');
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Upload Notes</h2>
            </div>
            <p className="text-gray-600 mb-4">Share your notes with classmates and earn rewards.</p>
            <Button className="w-full">Upload Now</Button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold">Find Notes</h2>
            </div>
            <p className="text-gray-600 mb-4">Discover comprehensive notes for your subjects and topics.</p>
            <Button className="w-full" variant="outline">Search Notes</Button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <BrainCircuit className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">AI Answers</h2>
            </div>
            <p className="text-gray-600 mb-4">Get smart answers to your questions using our AI.</p>
            <Button className="w-full" variant="outline">Ask AI</Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="text-gray-500 text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No recent activity yet. Start by uploading or searching for notes!</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-semibold">Group Study Rooms</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Create a Study Room</h3>
              <p className="text-gray-600 text-sm mb-3">Start a new collaborative study session with friends.</p>
              <Button size="sm" className="w-full">Create Room</Button>
            </div>
            
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Join Existing Room</h3>
              <p className="text-gray-600 text-sm mb-3">Participate in ongoing study groups and discussions.</p>
              <Button size="sm" variant="outline" className="w-full">Browse Rooms</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, Plus, Trash2, Upload, Save, Edit, School, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockDepartments = [
  { id: "1", name: "Computer Science Engineering", code: "CSE", year: "2023" },
  { id: "2", name: "Electronics & Communication", code: "ECE", year: "2023" },
  { id: "3", name: "Mechanical Engineering", code: "ME", year: "2023" },
  { id: "4", name: "Civil Engineering", code: "CE", year: "2023" },
  { id: "5", name: "Electrical Engineering", code: "EE", year: "2023" }
];

const mockSubjects = [
  { id: "1", name: "Data Structures & Algorithms", code: "CS201", semester: "3" },
  { id: "2", name: "Database Management Systems", code: "CS202", semester: "4" },
  { id: "3", name: "Computer Networks", code: "CS301", semester: "5" },
  { id: "4", name: "Operating Systems", code: "CS302", semester: "5" },
  { id: "5", name: "Machine Learning", code: "CS401", semester: "7" }
];

const mockModerators = [
  { id: "1", name: "Dr. Rajesh Kumar", email: "rajesh.k@college.edu", department: "Computer Science" },
  { id: "2", name: "Dr. Priya Sharma", email: "priya.s@college.edu", department: "Electronics" }
];

const CollegeAdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [collegeName, setCollegeName] = useState("Example College of Engineering");
  const [collegeWebsite, setCollegeWebsite] = useState("https://www.example-college.edu");
  const [collegeDescription, setCollegeDescription] = useState("A leading institution for technical education established in 1980.");
  const [showAddDeptDialog, setShowAddDeptDialog] = useState(false);
  const [showAddSubjectDialog, setShowAddSubjectDialog] = useState(false);
  const [showAddModeratorDialog, setShowAddModeratorDialog] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: "", code: "", year: "" });
  const [newSubject, setNewSubject] = useState({ name: "", code: "", semester: "" });
  const [newModerator, setNewModerator] = useState({ name: "", email: "", department: "" });
  
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGeneral = () => {
    // In a real app, you would call an API to save the general settings
    toast({
      title: "Settings Saved",
      description: "Your college settings have been updated successfully.",
    });
  };

  const handleAddDepartment = () => {
    // In a real app, you would call an API to add the department
    console.log("Adding department:", newDepartment);
    setShowAddDeptDialog(false);
    setNewDepartment({ name: "", code: "", year: "" });
    toast({
      title: "Department Added",
      description: `${newDepartment.name} has been added successfully.`,
    });
  };

  const handleAddSubject = () => {
    // In a real app, you would call an API to add the subject
    console.log("Adding subject:", newSubject);
    setShowAddSubjectDialog(false);
    setNewSubject({ name: "", code: "", semester: "" });
    toast({
      title: "Subject Added",
      description: `${newSubject.name} has been added successfully.`,
    });
  };

  const handleAddModerator = () => {
    // In a real app, you would call an API to add the moderator
    console.log("Adding moderator:", newModerator);
    setShowAddModeratorDialog(false);
    setNewModerator({ name: "", email: "", department: "" });
    toast({
      title: "Moderator Added",
      description: `${newModerator.name} has been added as a moderator.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Settings | College Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">College Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your institution's settings.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="moderators">Moderators</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>College Information</CardTitle>
                <CardDescription>
                  Update your institution's basic information and branding.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="college-name">College Name</Label>
                  <Input 
                    id="college-name"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="Enter college name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="college-website">Website</Label>
                  <Input 
                    id="college-website"
                    value={collegeWebsite}
                    onChange={(e) => setCollegeWebsite(e.target.value)}
                    placeholder="Enter college website URL"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="college-description">Description</Label>
                  <Textarea 
                    id="college-description"
                    value={collegeDescription}
                    onChange={(e) => setCollegeDescription(e.target.value)}
                    placeholder="Briefly describe your institution"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneral}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>College Logo</CardTitle>
                <CardDescription>
                  Upload your institution's logo to display on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="border rounded-md p-4 bg-gray-50 flex items-center justify-center w-40 h-40">
                    {logoPreview ? (
                      <img 
                        src={logoPreview} 
                        alt="College Logo Preview" 
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <School className="h-12 w-12 text-gray-300 mx-auto" />
                        <p className="text-sm text-gray-500 mt-2">No logo uploaded</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <Label htmlFor="college-logo">Upload Logo</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="college-logo"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="flex-1"
                        />
                        <Button variant="outline" type="button">
                          <Upload className="h-4 w-4 mr-2" />
                          Browse
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Recommended size: 200x200 pixels. Max file size: 2MB.
                      </p>
                    </div>
                    
                    {logoPreview && (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setLogoFile(null);
                          setLogoPreview(null);
                        }}
                      >
                        Remove Logo
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  disabled={!logoFile}
                  onClick={() => {
                    toast({
                      title: "Logo Uploaded",
                      description: "Your college logo has been updated successfully.",
                    });
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Logo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Departments */}
          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Departments</CardTitle>
                  <CardDescription>
                    Manage the departments in your institution.
                  </CardDescription>
                </div>
                <Dialog open={showAddDeptDialog} onOpenChange={setShowAddDeptDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Department
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Department</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="dept-name">Department Name</Label>
                        <Input 
                          id="dept-name"
                          value={newDepartment.name}
                          onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                          placeholder="e.g. Computer Science Engineering"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dept-code">Department Code</Label>
                        <Input 
                          id="dept-code"
                          value={newDepartment.code}
                          onChange={(e) => setNewDepartment({...newDepartment, code: e.target.value})}
                          placeholder="e.g. CSE"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dept-year">Established Year</Label>
                        <Input 
                          id="dept-year"
                          value={newDepartment.year}
                          onChange={(e) => setNewDepartment({...newDepartment, year: e.target.value})}
                          placeholder="e.g. 1995"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddDeptDialog(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddDepartment}
                        disabled={!newDepartment.name || !newDepartment.code}
                      >
                        Add Department
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Established</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDepartments.map((dept) => (
                        <TableRow key={dept.id}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell>{dept.code}</TableCell>
                          <TableCell>{dept.year}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Subjects */}
          <TabsContent value="subjects" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Subjects</CardTitle>
                  <CardDescription>
                    Manage the subjects offered in your institution.
                  </CardDescription>
                </div>
                <Dialog open={showAddSubjectDialog} onOpenChange={setShowAddSubjectDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Subject
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Subject</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="subject-name">Subject Name</Label>
                        <Input 
                          id="subject-name"
                          value={newSubject.name}
                          onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                          placeholder="e.g. Data Structures & Algorithms"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-code">Subject Code</Label>
                        <Input 
                          id="subject-code"
                          value={newSubject.code}
                          onChange={(e) => setNewSubject({...newSubject, code: e.target.value})}
                          placeholder="e.g. CS201"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-semester">Semester</Label>
                        <Input 
                          id="subject-semester"
                          value={newSubject.semester}
                          onChange={(e) => setNewSubject({...newSubject, semester: e.target.value})}
                          placeholder="e.g. 3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddSubjectDialog(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddSubject}
                        disabled={!newSubject.name || !newSubject.code}
                      >
                        Add Subject
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div>
                  <Accordion type="single" collapsible className="w-full">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                      <AccordionItem key={semester} value={`semester-${semester}`}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Semester {semester}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Subject Name</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {mockSubjects
                                .filter(subj => subj.semester === semester.toString())
                                .map((subject) => (
                                  <TableRow key={subject.id}>
                                    <TableCell className="font-medium">{subject.name}</TableCell>
                                    <TableCell>{subject.code}</TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              {mockSubjects.filter(subj => subj.semester === semester.toString()).length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={3} className="h-16 text-center text-muted-foreground">
                                    No subjects for this semester yet.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Moderators */}
          <TabsContent value="moderators" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Moderators</CardTitle>
                  <CardDescription>
                    Assign moderator privileges to faculty members.
                  </CardDescription>
                </div>
                <Dialog open={showAddModeratorDialog} onOpenChange={setShowAddModeratorDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Moderator
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Moderator</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="moderator-name">Full Name</Label>
                        <Input 
                          id="moderator-name"
                          value={newModerator.name}
                          onChange={(e) => setNewModerator({...newModerator, name: e.target.value})}
                          placeholder="e.g. Dr. Rajesh Kumar"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="moderator-email">Email</Label>
                        <Input 
                          id="moderator-email"
                          value={newModerator.email}
                          onChange={(e) => setNewModerator({...newModerator, email: e.target.value})}
                          placeholder="e.g. rajesh.k@college.edu"
                          type="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="moderator-department">Department</Label>
                        <Input 
                          id="moderator-department"
                          value={newModerator.department}
                          onChange={(e) => setNewModerator({...newModerator, department: e.target.value})}
                          placeholder="e.g. Computer Science"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddModeratorDialog(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddModerator}
                        disabled={!newModerator.name || !newModerator.email}
                      >
                        Add Moderator
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockModerators.map((moderator) => (
                        <TableRow key={moderator.id}>
                          <TableCell className="font-medium">{moderator.name}</TableCell>
                          <TableCell>{moderator.email}</TableCell>
                          <TableCell>{moderator.department}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CollegeAdminSettings;

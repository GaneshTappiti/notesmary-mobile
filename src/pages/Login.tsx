
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, School, BookOpen, ArrowRight, History, Github, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Signup form schema
const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  collegeName: z.string().min(2, { message: "College name is required" }),
  branch: z.string().min(1, { message: "Branch is required" }),
  yearOfStudy: z.string().min(1, { message: "Year of study is required" }),
});

// Reset password schema
const resetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Signup form
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      collegeName: "",
      branch: "",
      yearOfStudy: "",
    },
  });
  
  // Reset password form
  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    // This would normally call an authentication API
    console.log("Login form values:", values);
    
    toast({
      title: "Login Successful",
      description: "Welcome back to NOTES4U!",
    });
    
    // Redirect to dashboard after successful login
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  // Handle signup submission
  const onSignupSubmit = (values: z.infer<typeof signupSchema>) => {
    // This would normally call an API to register the user
    console.log("Signup form values:", values);
    
    toast({
      title: "Account Created Successfully",
      description: "Welcome to NOTES4U! You can now log in with your credentials.",
    });
    
    // Switch to login tab after successful signup
    setActiveTab("login");
  };

  // Handle password reset submission
  const onResetSubmit = (values: z.infer<typeof resetSchema>) => {
    // This would normally call an API to send a password reset email
    console.log("Reset form values:", values);
    
    toast({
      title: "Password Reset Email Sent",
      description: "Please check your email to reset your password.",
    });
    
    setIsPasswordResetOpen(false);
  };

  // Handle OAuth login (Google)
  const handleGoogleLogin = () => {
    // This would normally redirect to Google OAuth flow
    console.log("Google login clicked");
    
    toast({
      title: "Google Authentication",
      description: "Redirecting to Google for authentication...",
    });
  };

  // Handle College ID login
  const handleCollegeIdLogin = () => {
    // This would normally handle college ID authentication
    console.log("College ID login clicked");
    
    toast({
      title: "College ID Authentication",
      description: "College ID authentication initiated...",
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would set a class on the document body or use a theme context
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
          <CardHeader className="space-y-1 text-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-4"
            >
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                NOTES4U
              </span>
            </motion.div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 pt-4">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input className="pl-10" placeholder="Enter your email" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input className="pl-10" type="password" placeholder="Enter your password" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="text-right">
                      <Dialog open={isPasswordResetOpen} onOpenChange={setIsPasswordResetOpen}>
                        <DialogTrigger asChild>
                          <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                            Forgot password?
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reset your password</DialogTitle>
                            <DialogDescription>
                              Enter your email address and we'll send you a link to reset your password.
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...resetForm}>
                            <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                              <FormField
                                control={resetForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <DialogFooter>
                                <Button type="submit">
                                  Send Reset Link
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Login
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleGoogleLogin}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.68 17.57V20.34H19.12C21.16 18.44 22.56 15.62 22.56 12.25Z" fill="#4285F4" />
                      <path d="M12 23C14.97 23 17.46 22.02 19.12 20.34L15.68 17.57C14.75 18.19 13.54 18.58 12 18.58C9.24 18.58 6.91 16.83 6.1 14.37H2.54V17.23C4.15 20.64 7.81 23 12 23Z" fill="#34A853" />
                      <path d="M6.1 14.37C5.88 13.75 5.75 13.08 5.75 12.38C5.75 11.68 5.88 11.01 6.09 10.39V7.53H2.53C1.89 8.97 1.5 10.58 1.5 12.25C1.5 13.92 1.89 15.53 2.53 16.97L6.1 14.37Z" fill="#FBBC05" />
                      <path d="M12 5.92C13.57 5.92 14.97 6.47 16.05 7.5L19.12 4.43C17.46 2.77 14.97 1.75 12 1.75C7.81 1.75 4.15 4.11 2.54 7.52L6.1 10.38C6.91 7.92 9.24 5.92 12 5.92Z" fill="#EA4335" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" onClick={handleCollegeIdLogin}>
                    <School className="mr-2 h-4 w-4" />
                    College ID
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 pt-4">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input className="pl-10" placeholder="Enter your full name" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input className="pl-10" placeholder="Enter your email" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input className="pl-10" type="password" placeholder="Create a password" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="collegeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <School className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input className="pl-10" placeholder="Enter your college name" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={signupForm.control}
                        name="branch"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Branch</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select branch" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="cs">Computer Science</SelectItem>
                                <SelectItem value="it">Information Technology</SelectItem>
                                <SelectItem value="ece">Electronics & Comm.</SelectItem>
                                <SelectItem value="ee">Electrical</SelectItem>
                                <SelectItem value="me">Mechanical</SelectItem>
                                <SelectItem value="civil">Civil</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="yearOfStudy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1st Year</SelectItem>
                                <SelectItem value="2">2nd Year</SelectItem>
                                <SelectItem value="3">3rd Year</SelectItem>
                                <SelectItem value="4">4th Year</SelectItem>
                                <SelectItem value="5">5th Year</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Create Account
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleGoogleLogin}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.68 17.57V20.34H19.12C21.16 18.44 22.56 15.62 22.56 12.25Z" fill="#4285F4" />
                      <path d="M12 23C14.97 23 17.46 22.02 19.12 20.34L15.68 17.57C14.75 18.19 13.54 18.58 12 18.58C9.24 18.58 6.91 16.83 6.1 14.37H2.54V17.23C4.15 20.64 7.81 23 12 23Z" fill="#34A853" />
                      <path d="M6.1 14.37C5.88 13.75 5.75 13.08 5.75 12.38C5.75 11.68 5.88 11.01 6.09 10.39V7.53H2.53C1.89 8.97 1.5 10.58 1.5 12.25C1.5 13.92 1.89 15.53 2.53 16.97L6.1 14.37Z" fill="#FBBC05" />
                      <path d="M12 5.92C13.57 5.92 14.97 6.47 16.05 7.5L19.12 4.43C17.46 2.77 14.97 1.75 12 1.75C7.81 1.75 4.15 4.11 2.54 7.52L6.1 10.38C6.91 7.92 9.24 5.92 12 5.92Z" fill="#EA4335" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" onClick={handleCollegeIdLogin}>
                    <School className="mr-2 h-4 w-4" />
                    College ID
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex justify-between w-full">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleDarkMode}
                className="text-sm"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button
                variant="link"
                size="sm"
                asChild
                className="text-sm"
              >
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, School, BookOpen, ArrowRight, Check, Eye, EyeOff, Phone } from "lucide-react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

// Login form schema
const loginSchema = z.object({
  collegeEmail: z.string()
    .email({ message: "Please enter a valid college email address" })
    .refine(email => email.endsWith('.edu') || email.includes('ac.') || email.includes('.edu.') || email.includes('university'), {
      message: "Please use your college email address"
    }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  phoneNumber: z.string().optional(),
  rememberMe: z.boolean().optional(),
});

// Signup form schema
const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  collegeEmail: z.string()
    .email({ message: "Please enter a valid college email address" })
    .refine(email => email.endsWith('.edu') || email.includes('ac.') || email.includes('.edu.') || email.includes('university'), {
      message: "Please use your college email address"
    }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  phoneNumber: z.string().optional(),
  collegeName: z.string().min(2, { message: "College name is required" }),
  branch: z.string().min(1, { message: "Branch is required" }),
  yearOfStudy: z.string().min(1, { message: "Year of study is required" }),
});

// Reset password schema
const resetSchema = z.object({
  collegeEmail: z.string()
    .email({ message: "Please enter a valid college email address" })
    .refine(email => email.endsWith('.edu') || email.includes('ac.') || email.includes('.edu.') || email.includes('university'), {
      message: "Please use your college email address"
    }),
});

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "collegeId" | null>("email");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      collegeEmail: "",
      password: "",
      phoneNumber: "",
      rememberMe: false,
    },
  });
  
  // Signup form
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      collegeEmail: "",
      password: "",
      phoneNumber: "",
      collegeName: "",
      branch: "",
      yearOfStudy: "",
    },
  });
  
  // Reset password form
  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      collegeEmail: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    // This would normally call an authentication API
    console.log("Login form values:", values);
    
    // Set login state in localStorage (in a real app, this would be a token or session)
    localStorage.setItem('isLoggedIn', 'true');
    
    toast({
      title: "Login Successful",
      description: "Welcome back to Notex!",
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
    
    // Set login state in localStorage (in a real app, this would be a token or session)
    localStorage.setItem('isLoggedIn', 'true');
    
    toast({
      title: "Account Created Successfully",
      description: "Welcome to Notex! You can now log in with your credentials.",
      variant: "default",
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
      description: "Please check your college email to reset your password.",
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
    
    // Simulate successful login
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
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

  // Render login methods selection
  const renderLoginMethods = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Choose how to sign in</h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Select your preferred login method
        </p>
      </div>
      
      <Button 
        className="w-full flex items-center justify-start gap-3 h-12 mb-3"
        onClick={() => setLoginMethod("email")}
      >
        <School className="h-5 w-5" />
        <span>Continue with College Email</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-start gap-3 h-12 mb-3"
        onClick={handleGoogleLogin}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.68 17.57V20.34H19.12C21.16 18.44 22.56 15.62 22.56 12.25Z" fill="#4285F4" />
          <path d="M12 23C14.97 23 17.46 22.02 19.12 20.34L15.68 17.57C14.75 18.19 13.54 18.58 12 18.58C9.24 18.58 6.91 16.83 6.1 14.37H2.54V17.23C4.15 20.64 7.81 23 12 23Z" fill="#34A853" />
          <path d="M6.1 14.37C5.88 13.75 5.75 13.08 5.75 12.38C5.75 11.68 5.88 11.01 6.09 10.39V7.53H2.53C1.89 8.97 1.5 10.58 1.5 12.25C1.5 13.92 1.89 15.53 2.53 16.97L6.1 14.37Z" fill="#FBBC05" />
          <path d="M12 5.92C13.57 5.92 14.97 6.47 16.05 7.5L19.12 4.43C17.46 2.77 14.97 1.75 12 1.75C7.81 1.75 4.15 4.11 2.54 7.52L6.1 10.38C6.91 7.92 9.24 5.92 12 5.92Z" fill="#EA4335" />
        </svg>
        <span>Continue with Google</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-start gap-3 h-12"
        onClick={() => setLoginMethod("collegeId")}
      >
        <School className="h-5 w-5" />
        <span>Continue with College ID</span>
      </Button>
      
      <div className="pt-4 text-center">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Don't have an account?{" "}
          <button 
            type="button" 
            className="text-blue-600 hover:text-blue-700 font-medium"
            onClick={() => setActiveTab("signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );

  // Render email login form
  const renderEmailLoginForm = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setLoginMethod(null)}
          className="-ml-2"
        >
          <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
          Back
        </Button>
        <h3 className="text-lg font-medium">Login with College Email</h3>
      </div>
      
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
          <FormField
            control={loginForm.control}
            name="collegeEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input className="pl-10" placeholder="your.name@college.edu" {...field} />
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
                    <Input 
                      className="pl-10 pr-10" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      {...field} 
                    />
                    <button 
                      type="button" 
                      className="absolute right-3 top-3" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <EyeOff className="h-4 w-4 text-gray-500" /> : 
                        <Eye className="h-4 w-4 text-gray-500" />
                      }
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={loginForm.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number <span className="text-xs text-gray-500">(Optional)</span></FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input className="pl-10" placeholder="Your phone number" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <FormField
              control={loginForm.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm cursor-pointer">Remember me</FormLabel>
                </FormItem>
              )}
            />
            
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
                    Enter your college email address and we'll send you a link to reset your password.
                  </DialogDescription>
                </DialogHeader>
                <Form {...resetForm}>
                  <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                    <FormField
                      control={resetForm.control}
                      name="collegeEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.name@college.edu" {...field} />
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
    </div>
  );

  // Render college ID login form
  const renderCollegeIdLogin = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setLoginMethod(null)}
          className="-ml-2"
        >
          <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
          Back
        </Button>
        <h3 className="text-lg font-medium">Login with College ID</h3>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <School className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input className="pl-10" placeholder="College ID / Registration Number" />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input 
            className="pl-10 pr-10" 
            type={showPassword ? "text" : "password"} 
            placeholder="College Portal Password" 
          />
          <button 
            type="button" 
            className="absolute right-3 top-3" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 
              <EyeOff className="h-4 w-4 text-gray-500" /> : 
              <Eye className="h-4 w-4 text-gray-500" />
            }
          </button>
        </div>
        
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input className="pl-10" placeholder="Phone Number (Optional)" />
        </div>
        
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <AlertDescription className="text-xs">
            This will authenticate through your college portal. No credentials are stored by Notex.
          </AlertDescription>
        </Alert>
        
        <Button className="w-full" onClick={() => navigate("/dashboard")}>
          Login with College ID
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

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
                Notex
              </span>
            </motion.div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              Access your notes and study materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === "login" ? (
              <div>
                {loginMethod === null && renderLoginMethods()}
                {loginMethod === "email" && renderEmailLoginForm()}
                {loginMethod === "collegeId" && renderCollegeIdLogin()}
              </div>
            ) : (
              <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="hidden">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signup" className="space-y-4 pt-0">
                  <div className="flex items-center mb-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="-ml-2" 
                      onClick={() => setActiveTab("login")}
                    >
                      <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                      Back
                    </Button>
                    <h3 className="text-lg font-medium ml-auto mr-auto">Create an account</h3>
                  </div>
                  
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
                        name="collegeEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <Input className="pl-10" placeholder="your.name@college.edu" {...field} />
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
                                <Input 
                                  className="pl-10 pr-10" 
                                  type={showPassword ? "text" : "password"} 
                                  placeholder="Create a password" 
                                  {...field} 
                                />
                                <button 
                                  type="button" 
                                  className="absolute right-3 top-3" 
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? 
                                    <EyeOff className="h-4 w-4 text-gray-500" /> : 
                                    <Eye className="h-4 w-4 text-gray-500" />
                                  }
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number <span className="text-xs text-gray-500">(Optional)</span></FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <Input className="pl-10" placeholder="Your phone number" {...field} />
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
                </TabsContent>
              </Tabs>
            )}
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

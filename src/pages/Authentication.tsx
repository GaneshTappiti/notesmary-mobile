
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, BookOpen, Mail, Lock, User, School, GraduationCap, CalendarRange, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Navbar } from '@/components/Navbar';
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address").refine(
    (email) => email.includes(".edu") || email.includes("ac.in") || email.includes("college") || email.includes("gmail"),
    { message: "Must be a valid college or Gmail email address" }
  ),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address").refine(
    (email) => email.includes(".edu") || email.includes("ac.in") || email.includes("college") || email.includes("gmail"),
    { message: "Must be a valid college or Gmail email address" }
  ),
  branch: z.string().min(1, "Branch selection is required"),
  yearOfEntry: z.string().min(4, "Valid year required"),
  yearOfCompletion: z.string().min(4, "Valid year required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm your password"),
  phone: z.string().optional(),
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const branches = [
  "Computer Science", "Information Technology", "Electronics", 
  "Electrical", "Mechanical", "Civil", "Chemical", "Aerospace", 
  "Biotechnology", "Other"
];

const Authentication = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Login form setup
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
  });

  // Signup form setup
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      branch: "",
      yearOfEntry: new Date().getFullYear().toString(),
      yearOfCompletion: (new Date().getFullYear() + 4).toString(),
      password: "",
      confirmPassword: "",
      phone: "",
      termsAndConditions: false,
    },
  });

  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    console.log("Login values:", values);
    setError(null);
    
    try {
      // Simulate successful login
      toast({
        title: "Login Successful",
        description: `Welcome back to Notex!`,
      });
      
      // Set login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      
      // Store user info if "Remember Me" is checked
      if (values.rememberMe) {
        localStorage.setItem("userEmail", values.email);
      }
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleSignup = (values: z.infer<typeof signupSchema>) => {
    console.log("Signup values:", values);
    setError(null);
    
    try {
      // Simulate successful signup
      toast({
        title: "Signup Successful",
        description: "Welcome to Notex! Please verify your email.",
      });
      
      // Store user name for welcome message
      localStorage.setItem("userName", values.fullName);
      
      // Set login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("There was a problem creating your account. Please try again.");
      console.error("Signup error:", err);
    }
  };

  const handleGoogleLogin = () => {
    setError(null);
    
    try {
      // In a real implementation, this would trigger Google OAuth
      console.log("Logging in with Google...");
      
      // Simulate successful Google login
      toast({
        title: "Google Login Successful",
        description: "Welcome to Notex!",
      });
      
      // Set login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", "Google User");
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed. Please try again.");
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="pt-28 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-blue-100 dark:border-gray-700">
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-2">
                  <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-center font-bold">
                  {activeTab === "login" ? "Welcome back!" : "Join Notex"}
                </CardTitle>
                <CardDescription className="text-center">
                  {activeTab === "login" 
                    ? "Enter your college credentials to access your account" 
                    : "Create an account using your college email"}
                </CardDescription>
                
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardHeader>
              
              <CardContent>
                <Tabs 
                  defaultValue="login" 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                  </TabsList>
                  
                  <Button 
                    onClick={handleGoogleLogin} 
                    variant="outline" 
                    className="w-full mb-4 flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 12 h8"></path>
                      <path d="M12 8 v8"></path>
                    </svg>
                    Sign in with Google
                  </Button>
                  
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
                    </div>
                  </div>
                  
                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>College Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    placeholder="you@college.edu" 
                                    className="pl-10" 
                                    {...field} 
                                  />
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
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    type={showPassword ? "text" : "password"} 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
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
                              <FormItem className="flex items-center space-x-2 space-y-0">
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
                          <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                            Forgot password?
                          </a>
                        </div>
                        
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 mt-6">
                          Log in
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <Form {...signupForm}>
                      <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                        <FormField
                          control={signupForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input placeholder="John Doe" className="pl-10" {...field} />
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
                              <FormLabel>College Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    placeholder="you@college.edu" 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel" 
                                  placeholder="Your phone number" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={signupForm.control}
                            name="branch"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Branch</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <School className="h-4 w-4 mr-2 text-gray-400" />
                                      <SelectValue placeholder="Select branch" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {branches.map((branch) => (
                                      <SelectItem key={branch} value={branch}>
                                        {branch}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-2">
                            <FormField
                              control={signupForm.control}
                              name="yearOfEntry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Entry Year</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <CalendarRange className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                      <Input 
                                        type="number" 
                                        min="2000"
                                        max="2099"
                                        className="pl-10" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={signupForm.control}
                              name="yearOfCompletion"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Completion</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                      <Input 
                                        type="number"
                                        min="2000" 
                                        max="2099"
                                        className="pl-10" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <FormField
                          control={signupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    type={showPassword ? "text" : "password"} 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="termsAndConditions"
                          render={({ field }) => (
                            <FormItem className="flex items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm cursor-pointer">
                                  I agree to the{" "}
                                  <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                                    terms of service
                                  </a>{" "}
                                  and{" "}
                                  <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                                    privacy policy
                                  </a>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 mt-2">
                          Create Account
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activeTab === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("signup")}
                        className="text-blue-600 hover:underline font-medium dark:text-blue-400"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className="text-blue-600 hover:underline font-medium dark:text-blue-400"
                      >
                        Log in
                      </button>
                    </>
                  )}
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

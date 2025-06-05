import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Special admin email for direct access
const ADMIN_EMAIL = "2005ganesh16@gmail.com";

const isEducationalEmail = (email: string) => {
  // Special exception for admin email
  if (email === ADMIN_EMAIL) return true;
  
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  const eduPatterns = [
    /\.edu$/,
    /\.ac\.[a-z]{2,}$/,
    /\.edu\.[a-z]{2,}$/,
    /\.college$/,
    /\.university$/,
    /\.org$/,
    /\.gmail\.com$/  // Temporarily allowing gmail for testing
  ];
  
  return eduPatterns.some(pattern => pattern.test(domain));
};

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .refine(isEducationalEmail, {
      message: "Please use an academic institution email (e.g., .edu, .ac.xx) or the admin email",
    }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const resetRequestSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const Authentication = () => {
  const location = useLocation();
  const initialTab = location.state?.activeTab || "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showResetForm, setShowResetForm] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const { login, isLoading, isAuthenticated, isAdmin, isCollegeAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Listen for location state changes to update the active tab
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Handle redirection after authentication state changes
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log("User authenticated, checking user type:", { isAdmin, isCollegeAdmin });
      
      if (isAdmin) {
        console.log("Admin user detected, redirecting to admin dashboard");
        navigate("/admin");
        toast({
          title: "Welcome back, Admin!",
          description: "You've been redirected to the admin dashboard.",
        });
      } else if (isCollegeAdmin) {
        console.log("College admin detected, redirecting to college admin dashboard");
        navigate("/college-admin/dashboard");
        toast({
          title: "Welcome back!",
          description: "You've been redirected to your college admin dashboard.",
        });
      } else {
        console.log("Regular user detected, redirecting to user dashboard");
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from);
        toast({
          title: "Login successful",
          description: "Welcome back to Notex!",
        });
      }
    }
  }, [isAuthenticated, isLoading, isAdmin, isCollegeAdmin, navigate, location.state, toast]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const resetRequestForm = useForm<z.infer<typeof resetRequestSchema>>({
    resolver: zodResolver(resetRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoginError("");
    try {
      console.log("Attempting login with:", values.email);
      await login(values.email, values.password);
      // Navigation will be handled by the useEffect above
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMsg = error.message || "Failed to login. Please check your credentials.";
      
      // Enhance error message for admin
      if (values.email === ADMIN_EMAIL) {
        if (errorMsg.includes("Email not confirmed")) {
          errorMsg = "Admin email not confirmed. Check your email inbox or disable email confirmation in Supabase Dashboard.";
        } else {
          errorMsg = "Admin login failed. Make sure you have created an admin account first.";
        }
      }
      
      setLoginError(errorMsg);
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setSignupError("");
    try {
      console.log("Attempting signup with:", values.email);
      
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
          },
        },
      });

      if (error) {
        throw error;
      }
      
      // Special message for admin signup
      const successMessage = values.email === ADMIN_EMAIL ? 
        "Admin account created successfully! Please check your email for confirmation or disable email confirmation in Supabase Dashboard." :
        "Account created successfully! Please check your email for confirmation.";
      
      toast({
        title: "Account created successfully",
        description: successMessage
      });
      setActiveTab("login");
    } catch (error: any) {
      console.error("Signup error:", error);
      setSignupError(error.message || "Failed to create account. Please try again.");
    }
  };

  const onResetRequestSubmit = async (values: z.infer<typeof resetRequestSchema>) => {
    setResetError("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setResetSuccess(true);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      setResetError(error.message || "Failed to send password reset email. Please try again.");
    }
  };

  if (showResetForm) {
    return (
      <div className="min-h-[100dvh] w-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Notex
            </h1>
            <p className="text-base text-slate-600 mt-2">
              Reset your password
            </p>
          </div>

          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>
                {resetSuccess 
                  ? "Check your email for reset instructions"
                  : "Enter your email to receive reset instructions"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 pt-4">
              {resetSuccess ? (
                <div className="text-center space-y-4">
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                      Password reset email sent successfully! Please check your inbox and follow the instructions.
                    </AlertDescription>
                  </Alert>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowResetForm(false);
                      setResetSuccess(false);
                    }}
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                </div>
              ) : (
                <Form {...resetRequestForm}>
                  <form onSubmit={resetRequestForm.handleSubmit(onResetRequestSubmit)} className="space-y-4">
                    {resetError && (
                      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <AlertDescription>{resetError}</AlertDescription>
                      </Alert>
                    )}
                    <FormField
                      control={resetRequestForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setShowResetForm(false)}
                      className="w-full"
                    >
                      Back to Login
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Notex
          </h1>
          <p className="text-base text-slate-600 mt-2">
            Your personal study assistant
          </p>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Welcome to Notex</CardTitle>
            <CardDescription>
              {activeTab === "login" 
                ? "Sign in to your account to continue" 
                : "Create a new account to get started"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 pt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    {loginError && (
                      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <AlertDescription>{loginError}</AlertDescription>
                      </Alert>
                    )}
                    <FormField
                      control={loginForm.control}
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
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Log In"}
                    </Button>
                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 underline"
                        onClick={() => setShowResetForm(true)}
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-4">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                        onClick={() => setActiveTab("signup")}
                      >
                        Sign up
                      </button>
                    </p>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    {signupError && (
                      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <AlertDescription>{signupError}</AlertDescription>
                      </Alert>
                    )}
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
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
                            <Input placeholder="Enter your college email" {...field} />
                          </FormControl>
                          <FormMessage />
                          <Alert className="bg-blue-50 border-blue-200 p-2 mt-1">
                            <AlertDescription className="text-xs text-blue-600 inline">
                              We only accept academic institution email addresses (.edu, .ac.xx, etc.)
                              {field.value === "2005ganesh16@gmail.com" && 
                                " (Admin email detected)"}
                            </AlertDescription>
                          </Alert>
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
                            <Input
                              type="password"
                              placeholder="Create a password"
                              {...field}
                            />
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
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                    <p className="text-center text-sm text-gray-600 mt-4">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                        onClick={() => setActiveTab("login")}
                      >
                        Log in
                      </button>
                    </p>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Authentication;

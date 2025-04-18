
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const isEducationalEmail = (email: string) => {
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  const eduPatterns = [
    /\.edu$/,
    /\.ac\.[a-z]{2,}$/,
    /\.edu\.[a-z]{2,}$/,
    /\.college$/,
    /\.university$/,
    /\.org$/,
    /\.school$/,
    /\.(ca|de|fr|it|es|br|cn|in|uk|ng|jp|au|my|sg)$/
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
      message: "Please use an academic institution email (e.g., .edu, .ac.xx)",
    }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Authentication = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { login, signup, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Important: Don't navigate during render, move this to useEffect
  // if (isAuthenticated) {
  //  navigate("/dashboard");
  //  return null;
  // }

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

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    await login(values.email, values.password);
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      await signup(values.email, values.password, values.fullName);
      setActiveTab("login");
    } catch (error: any) {
      console.error("Signup error:", error);
    }
  };
  
  // Use useEffect to handle redirection when authentication state changes
  import { useEffect } from "react";
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Notex
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Your personal study assistant
          </p>
        </div>

        <Card className="border-slate-200 dark:border-slate-700 shadow-lg w-full">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="text-xl sm:text-2xl text-center">
              Welcome to Notex
            </CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              {activeTab === "login"
                ? "Sign in to your account to continue"
                : "Create a new account to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-2 sm:pb-4">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4 sm:mb-6 w-full">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-3 sm:space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Log In"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-3 sm:space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your college email" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 p-2 mt-1">
                            <Info className="h-4 w-4 inline-block mr-1 text-blue-500" />
                            <AlertDescription className="text-xs text-blue-600 dark:text-blue-400 inline">
                              We only accept academic institution email addresses (.edu, .ac.xx, etc.)
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
                          <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Create a password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center px-4 sm:px-6 py-3 sm:py-4">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {activeTab === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 dark:text-blue-400 text-xs sm:text-sm"
                onClick={() =>
                  setActiveTab(activeTab === "login" ? "signup" : "login")
                }
              >
                {activeTab === "login" ? "Sign up" : "Log in"}
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Authentication;

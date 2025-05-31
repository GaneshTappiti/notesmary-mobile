
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const updatePasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const checkResetToken = async () => {
      try {
        setCheckingToken(true);
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        
        if (!accessToken || !refreshToken) {
          setError("Invalid or expired reset link. Please request a new password reset.");
          setCheckingToken(false);
          return;
        }

        // Set the session with the tokens from the URL
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error("Token validation error:", error);
          setError("Invalid or expired reset link. Please request a new password reset.");
        } else {
          setValidToken(true);
        }
      } catch (error) {
        console.error("Error checking reset token:", error);
        setError("An error occurred while validating the reset link.");
      } finally {
        setCheckingToken(false);
      }
    };

    checkResetToken();
  }, [searchParams]);

  const onSubmit = async (values: z.infer<typeof updatePasswordSchema>) => {
    setError("");
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      toast({
        title: "Password Updated Successfully",
        description: "Your password has been updated. You can now log in with your new password.",
      });

      // Sign out the user and redirect to login after a delay
      setTimeout(async () => {
        await supabase.auth.signOut();
        navigate("/authentication", { 
          state: { 
            activeTab: 'login',
            message: 'Password updated successfully. Please log in with your new password.' 
          } 
        });
      }, 2000);

    } catch (error: any) {
      console.error("Password update error:", error);
      setError(error.message || "Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="min-h-[100dvh] w-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Validating reset link...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!validToken) {
    return (
      <div className="min-h-[100dvh] w-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Notex
            </h1>
            <p className="text-base text-slate-600 mt-2">
              Password Reset
            </p>
          </div>

          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Invalid Reset Link</CardTitle>
              <CardDescription>
                The password reset link is invalid or has expired
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 pt-4">
              <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              
              <Button 
                onClick={() => navigate("/authentication")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Request New Reset Link
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[100dvh] w-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Notex
            </h1>
            <p className="text-base text-slate-600 mt-2">
              Password Reset
            </p>
          </div>

          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Password Updated!</CardTitle>
              <CardDescription>
                Your password has been successfully updated
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 pt-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <AlertDescription className="text-green-800">
                  Password updated successfully! Redirecting to login...
                </AlertDescription>
              </Alert>
              
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-slate-600">Redirecting...</p>
              </div>
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
            Set your new password
          </p>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Set New Password</CardTitle>
            <CardDescription>
              Choose a strong password for your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={isLoading}
                >
                  {isLoading ? "Updating Password..." : "Set New Password"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;

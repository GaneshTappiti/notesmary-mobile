
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('login');

  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast({
        title: 'Success',
        description: 'Logged in successfully!',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'Failed to log in. Please check your credentials.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, name);
      toast({
        title: 'Success',
        description: 'Account created successfully!',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Welcome to Notex</CardTitle>
          <CardDescription>
            {tab === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-xs text-blue-600"
                      type="button"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="signupPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" type="button" className="w-full">
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.68 17.57V20.34H19.12C21.16 18.44 22.56 15.62 22.56 12.25Z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23C14.97 23 17.46 22.02 19.12 20.34L15.68 17.57C14.75 18.19 13.54 18.58 12 18.58C9.24 18.58 6.91 16.83 6.1 14.37H2.54V17.23C4.15 20.64 7.81 23 12 23Z"
                  fill="#34A853"
                />
                <path
                  d="M6.1 14.37C5.88 13.75 5.75 13.08 5.75 12.38C5.75 11.68 5.88 11.01 6.09 10.39V7.53H2.53C1.89 8.97 1.5 10.58 1.5 12.25C1.5 13.92 1.89 15.53 2.53 16.97L6.1 14.37Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.92C13.57 5.92 14.97 6.47 16.05 7.5L19.12 4.43C17.46 2.77 14.97 1.75 12 1.75C7.81 1.75 4.15 4.11 2.54 7.52L6.1 10.38C6.91 7.92 9.24 5.92 12 5.92Z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9553 20.502C13.4342 21.0574 12.7844 21.0584 12.2643 20.502C11.7432 19.9456 11.7442 19.2654 12.2643 18.71L17.9395 12.7947L12.2643 6.87936C11.7442 6.32396 11.7432 5.64377 12.2643 5.08747C12.7844 4.53206 13.4342 4.53116 13.9553 5.08747L20.4201 11.9011C20.6801 12.1778 20.8101 12.4862 20.8101 12.7947C20.8101 13.1031 20.6801 13.4116 20.4201 13.6883L13.9553 20.502Z"
                  fill="currentColor"
                />
                <path
                  d="M8.51511 5.08747C9.03622 4.53116 9.68598 4.53206 10.2071 5.08747C10.7272 5.64377 10.7282 6.32396 10.2071 6.87936L4.53189 12.7947L10.2071 18.71C10.7282 19.2654 10.7272 19.9456 10.2071 20.502C9.68598 21.0584 9.03622 21.0574 8.51511 20.502L2.05022 13.6883C1.79023 13.4116 1.66023 13.1031 1.66023 12.7947C1.66023 12.4862 1.79023 12.1778 2.05022 11.9011L8.51511 5.08747Z"
                  fill="currentColor"
                />
              </svg>
              GitHub
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Authentication;

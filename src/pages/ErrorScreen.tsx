
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, WifiOff, Home, RefreshCw, ArrowLeft, ServerCrash, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Helmet } from 'react-helmet-async';

interface ErrorState {
  type?: 'network' | 'server' | 'auth' | 'generic';
  message?: string;
  code?: string | number;
}

const ErrorScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRetrying, setIsRetrying] = React.useState(false);
  
  // Get error details from location state or default to generic error
  const errorState = (location.state as ErrorState) || { type: 'generic' };
  
  const getErrorConfig = () => {
    switch (errorState.type) {
      case 'network':
        return {
          icon: <WifiOff className="h-16 w-16 text-red-500" />,
          title: 'Connection Problem',
          description: 'Unable to connect to our servers. Please check your internet connection and try again.',
          color: 'red',
          canRetry: true
        };
      case 'server':
        return {
          icon: <ServerCrash className="h-16 w-16 text-orange-500" />,
          title: 'Server Error',
          description: 'We\'re experiencing technical difficulties. Our team has been notified and is working on a fix.',
          color: 'orange',
          canRetry: true
        };
      case 'auth':
        return {
          icon: <Shield className="h-16 w-16 text-yellow-500" />,
          title: 'Authentication Required',
          description: 'Your session has expired or you don\'t have permission to access this resource.',
          color: 'yellow',
          canRetry: false
        };
      default:
        return {
          icon: <AlertTriangle className="h-16 w-16 text-gray-500" />,
          title: 'Something Went Wrong',
          description: 'We encountered an unexpected error. Please try again or contact support if the problem persists.',
          color: 'gray',
          canRetry: true
        };
    }
  };

  const config = getErrorConfig();

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      // Simulate retry delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reload the page or navigate back
      if (errorState.type === 'network') {
        window.location.reload();
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error('Retry failed:', error);
      setIsRetrying(false);
    }
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@studypulse.com?subject=Error Report&body=' + 
      encodeURIComponent(`Error Type: ${errorState.type}\nError Code: ${errorState.code}\nMessage: ${errorState.message}\nURL: ${window.location.href}`);
  };

  return (
    <>
      <Helmet>
        <title>Error | StudyPulse</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto mb-4"
              >
                {config.icon}
              </motion.div>
              
              <CardTitle className="text-2xl font-bold text-gray-900">
                {config.title}
              </CardTitle>
              
              <CardDescription className="text-gray-600 mt-2 leading-relaxed">
                {errorState.message || config.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {errorState.code && (
                <Alert className={`bg-${config.color}-50 border-${config.color}-200`}>
                  <AlertDescription className={`text-${config.color}-800`}>
                    Error Code: {errorState.code}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex flex-col gap-3">
                {config.canRetry && (
                  <Button 
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="w-full"
                  >
                    {isRetrying ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                      </>
                    )}
                  </Button>
                )}
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    onClick={handleGoBack}
                    className="w-full"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go Back
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleGoHome}
                    className="w-full"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </div>
                
                <Button 
                  variant="ghost"
                  onClick={handleContactSupport}
                  className="w-full text-sm"
                >
                  Contact Support
                </Button>
              </div>
              
              <div className="text-center text-xs text-gray-500 mt-6">
                If this problem continues, please try refreshing the page or contact our support team.
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default ErrorScreen;

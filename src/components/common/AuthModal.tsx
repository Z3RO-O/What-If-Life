import React, { useState } from 'react';
import { Mail, Lock, User, Chrome, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup' | 'otp';
}

type AuthStep = 'signin' | 'signup' | 'otp' | 'verify-otp' | 'email-sent' | 'email-verified';

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [step, setStep] = useState<AuthStep>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle, signInWithOTP, verifyOTP, resendConfirmation } = useAuth();

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (step === 'signup') {
        await signUp(email, password, fullName);
        setStep('email-sent');
      } else {
        await signIn(email, password);
        onClose();
      }
    } catch (err: any) {
      if (err.message?.includes('Email not confirmed')) {
        setError('Please check your email and click the confirmation link before signing in.');
      } else {
        setError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
      setLoading(false);
    }
  };

  const handleOTPAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (step === 'otp') {
        await signInWithOTP(email);
        setStep('verify-otp');
      } else if (step === 'verify-otp') {
        await verifyOTP(email, otpCode);
        setStep('email-verified');
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setError('');
    setLoading(true);

    try {
      await resendConfirmation(email);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to resend confirmation');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'email-sent':
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
            <CardHeader>
              <CardTitle className="text-2xl text-white">Check Your Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                We've sent a confirmation link to <strong>{email}</strong>. 
                Please check your email and click the link to verify your account.
              </p>
              <Button
                variant="link"
                onClick={handleResendConfirmation}
                disabled={loading}
                className="text-blue-400 hover:text-blue-300"
              >
                {loading ? 'Sending...' : 'Resend confirmation email'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setStep('signin')}
                className="text-gray-400 hover:text-white"
              >
                Back to sign in
              </Button>
            </CardContent>
          </div>
        );

      case 'verify-otp':
        return (
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setStep('otp')}
              className="flex items-center text-gray-400 hover:text-white mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <CardHeader>
              <CardTitle className="text-2xl text-white">Enter Verification Code</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                We've sent a 6-digit code to <strong>{email}</strong>
              </p>
              <form onSubmit={handleOTPAuth} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="text-center text-2xl tracking-widest bg-white/10 border-white/20 text-white"
                    maxLength={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || otpCode.length !== 6}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Button>
              </form>
            </CardContent>
          </div>
        );

      case 'email-verified':
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
            <CardHeader>
              <CardTitle className="text-2xl text-white">Email Verified!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Your email has been verified successfully. You're now signed in.
              </p>
            </CardContent>
          </div>
        );

      case 'otp':
        return (
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setStep('signin')}
              className="flex items-center text-gray-400 hover:text-white mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <CardHeader>
              <CardTitle className="text-2xl text-white">Sign in with Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                We'll send you a secure code to sign in without a password.
              </p>
              <form onSubmit={handleOTPAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? 'Sending Code...' : 'Send Verification Code'}
                </Button>
              </form>
            </CardContent>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {step === 'signin' ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google OAuth Button */}
              <Button
                onClick={handleGoogleAuth}
                disabled={loading}
                variant="outline"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 border-white"
              >
                <Chrome className="h-5 w-5 mr-2" />
                Continue with Google
              </Button>

              {/* OTP Option */}
              <Button
                onClick={() => setStep('otp')}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Mail className="h-5 w-5 mr-2" />
                Sign in with Email Code
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800 text-gray-400">Or continue with password</span>
                </div>
              </div>

              <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
                {step === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                      placeholder="Enter your password"
                      minLength={6}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? 'Processing...' : step === 'signin' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-gray-400">
                  {step === 'signin' ? "Don't have an account?" : 'Already have an account?'}
                  <Button
                    variant="link"
                    onClick={() => setStep(step === 'signin' ? 'signup' : 'signin')}
                    className="text-blue-400 hover:text-blue-300 ml-1"
                  >
                    {step === 'signin' ? 'Sign up' : 'Sign in'}
                  </Button>
                </p>
              </div>
            </CardContent>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-md max-h-[90vh] overflow-y-auto">
        {error && (
          <Alert className="bg-red-500/20 border-red-500/50 mb-4">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}
        
        <Card className="bg-transparent border-none shadow-none">
          {renderContent()}
        </Card>
      </DialogContent>
    </Dialog>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { MessageCircle, Smartphone, Shield, Users, GraduationCap as UserGraduate, User2 as UserTie } from 'lucide-react';

const AuthScreen = ({ onAuthSuccess, role }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState('phone');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid WhatsApp number (e.g., +254700000000)",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent! 📱",
        description: `Check your WhatsApp on ${phoneNumber} for the verification code.`
      });
    }, 2000);
  };

  const handleVerifyOTP = async () => {
    if (!otpCode || otpCode.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code from WhatsApp",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      const authData = {
        phoneNumber,
        id: `kaazi_user_${Date.now()}`,
        verifiedAt: new Date().toISOString(),
      };

      onAuthSuccess(authData);
      toast({
        title: "Verification Successful! ✅",
        description: "Let's set up your profile."
      });
    }, 1500);
  };

  const RoleIcon = role === 'learner' ? UserGraduate : UserTie;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto mb-4 kaazi-gradient rounded-2xl flex items-center justify-center">
              <RoleIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Kaazi {role === 'learner' ? 'Learner' : 'Mentor'}</h1>
            <p className="text-lg text-muted-foreground">Registration</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6 mb-6"
        >
          {step === 'phone' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold">Register with WhatsApp</h2>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium text-foreground/80">Your WhatsApp Number</label>
                <div className="relative">
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Smartphone className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full whatsapp-green text-white font-semibold py-3 rounded-lg"
              >
                {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold">Enter Verification Code</h2>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                We sent a 6-digit code to your WhatsApp: <span className="font-semibold text-foreground">{phoneNumber}</span>
              </p>
              
              <div className="space-y-2">
                <label htmlFor="otpCode" className="text-sm font-medium text-foreground/80">Verification Code</label>
                <input
                  id="otpCode"
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={isLoading}
                className="w-full kaazi-gradient text-white font-semibold py-3 rounded-lg"
              >
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
              </Button>

              <Button
                onClick={() => { setStep('phone'); setOtpCode(''); }}
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground"
              >
                Change Phone Number or Resend OTP
              </Button>
            </div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-muted-foreground text-center"
        >
          By continuing, you agree to Kaazi's Terms of Service and Privacy Policy. Standard messaging rates may apply.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthScreen;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { User, MapPin, Globe, Briefcase, Target, Users, GraduationCap as UserGraduate, User2 as UserTie } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const ProfileSetupScreen = ({ user, onComplete, role }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    ageRange: '',
    gender: '',
    location: '',
    country: '',
    preferredLanguage: '',
    dreamGoal: '',
    reason: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Basic validation
    if (!formData.fullName || !formData.ageRange || !formData.location || !formData.country || !formData.preferredLanguage || !formData.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const profileData = {
      ...formData,
      name: formData.fullName, // Ensure name is consistent with user object
      profileCompletedAt: new Date().toISOString(),
      joinedAt: user?.joinedAt || new Date().toISOString(), // Preserve original join date or set new
      mentor: role === 'learner' ? { // Assign a default mentor for learners
        id: 'mentor_001',
        name: 'Sarah Nakato',
        expertise: 'Digital Marketing & Web Development',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        languages: ['English', 'Swahili', 'Luganda']
      } : null,
      progress: role === 'learner' ? { // Initialize progress for learners
        completedModules: 0,
        totalModules: 8,
        certificates: 0,
        studyStreak: 0
      } : null,
    };
    
    setTimeout(() => {
      setIsLoading(false);
      onComplete(profileData);
      toast({
        title: "Profile Setup Complete! 🎉",
        description: "Welcome to Kaazi! Let's get you started."
      });
    }, 1500);
  };

  const ageRanges = ["Under 18", "18-24", "25-30", "31-35", "Over 35"];
  const languages = ["English", "Swahili", "Luganda", "Kirundi", "Kinyarwanda", "French", "Other"];
  const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Burundi", "South Sudan", "DRC"];
  const RoleIcon = role === 'learner' ? UserGraduate : UserTie;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 kaazi-gradient rounded-2xl flex items-center justify-center">
            <RoleIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Tell Us About Yourself</h1>
          <p className="text-muted-foreground">This helps us personalize your Kaazi experience.</p>
        </div>

        <motion.div
          className="glass-effect rounded-2xl p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Juma Okello" icon={User} />
            </div>
            <div>
              <Label htmlFor="ageRange">Age Range *</Label>
              <Select onValueChange={(value) => handleSelectChange('ageRange', value)} name="ageRange">
                <SelectTrigger id="ageRange">
                  <SelectValue placeholder="Select your age group" />
                </SelectTrigger>
                <SelectContent>
                  {ageRanges.map(range => <SelectItem key={range} value={range}>{range}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="gender">Gender (Optional)</Label>
             <Select onValueChange={(value) => handleSelectChange('gender', value)} name="gender">
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Town/City *</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Kampala" icon={MapPin} />
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Select onValueChange={(value) => handleSelectChange('country', value)} name="country">
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => <SelectItem key={country} value={country}>{country}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="preferredLanguage">Preferred Language *</Label>
            <Select onValueChange={(value) => handleSelectChange('preferredLanguage', value)} name="preferredLanguage">
              <SelectTrigger id="preferredLanguage">
                <SelectValue placeholder="Select your language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dreamGoal">What’s your dream job or goal?</Label>
            <Textarea id="dreamGoal" name="dreamGoal" value={formData.dreamGoal} onChange={handleChange} placeholder="e.g., Become a graphic designer, start my own online shop..." />
          </div>

          <div>
            <Label>Why are you here? *</Label>
            <RadioGroup name="reason" onValueChange={(value) => handleSelectChange('reason', value)} className="flex flex-col sm:flex-row gap-4 mt-2">
              <div className="flex items-center space-x-2 p-3 bg-background/30 rounded-lg flex-1">
                <RadioGroupItem value="learn" id="r1" />
                <Label htmlFor="r1" className="font-normal">Learn new skills</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-background/30 rounded-lg flex-1">
                <RadioGroupItem value="earn" id="r2" />
                <Label htmlFor="r2" className="font-normal">Earn money</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-background/30 rounded-lg flex-1">
                <RadioGroupItem value="both" id="r3" />
                <Label htmlFor="r3" className="font-normal">Both learn & earn</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full kaazi-gradient text-white font-semibold py-3 rounded-lg mt-4"
          >
            {isLoading ? 'Saving Profile...' : 'Complete Profile & Continue'}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileSetupScreen;
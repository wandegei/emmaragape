import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, BookOpen, Users, DollarSign, GraduationCap as UserGraduate, User2 as UserTie, Briefcase, Lightbulb, Heart } from 'lucide-react';

const OnboardingScreen = ({ user, onComplete, role }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const learnerSteps = [
    {
      icon: BookOpen,
      title: "Learn Through Certified Modules",
      description: "Access bite-sized courses from top universities and platforms. Learn at your own pace with content available in local languages.",
      image: "Young African students learning on smartphones and tablets",
      features: ["8 Learning Modules", "Local Language Support", "Offline Access", "Progress Tracking"]
    },
    {
      icon: Users,
      title: "Get Mentored Daily",
      description: "Your personal mentor will guide you through your learning journey, answer questions, and help you stay motivated.",
      image: "African mentor teaching young student via video call",
      features: ["Personal Mentor", "Daily Check-ins", "Career Guidance", "WhatsApp Support"]
    },
    {
      icon: DollarSign,
      title: "Earn Via Matched Gigs",
      description: "Complete modules to unlock real remote work opportunities. Get matched with gigs that fit your new skills and earn money.",
      image: "Young African person working remotely on laptop with mobile money",
      features: ["Remote Work Gigs", "Mobile Payouts", "Skill Matching", "Real Earnings"]
    }
  ];

  const mentorSteps = [
    {
      icon: Briefcase,
      title: "Empower Young Talents",
      description: "Guide learners through their educational journey, helping them unlock their potential and achieve their career goals.",
      image: "Mentor guiding a group of students in a bright classroom",
      features: ["Personalized Mentorship", "Track Learner Progress", "Provide Feedback", "Inspire Growth"]
    },
    {
      icon: Lightbulb,
      title: "Share Your Expertise",
      description: "Use your skills and experience to make a real impact. Help shape the next generation of digital professionals in East Africa.",
      image: "Mentor sharing insights during a workshop",
      features: ["Skill-Based Guidance", "Host Workshops", "Share Resources", "Career Advice"]
    },
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Join a community dedicated to uplifting youth. Your contribution helps create pathways to sustainable income and brighter futures.",
      image: "Happy mentor and mentee celebrating success",
      features: ["Community Impact", "Flexible Schedule", "Support Network", "Fulfilling Role"]
    }
  ];

  const steps = role === 'learner' ? learnerSteps : mentorSteps;
  const RoleIcon = role === 'learner' ? UserGraduate : UserTie;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 kaazi-gradient rounded-lg flex items-center justify-center">
            <RoleIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gradient">Kaazi {role === 'learner' ? 'Learner' : 'Mentor'}</h1>
            <p className="text-xs text-muted-foreground">Welcome, {user?.name}!</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-green-500' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
          >
            <div className="flex-1 flex items-center justify-center mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-sm aspect-square glass-effect rounded-3xl p-4 sm:p-8 flex items-center justify-center"
              >
                <img-replace
                  alt={steps[currentStep].image}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-2xl p-6 space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 kaazi-gradient rounded-2xl flex items-center justify-center">
                  {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h2 className="text-2xl font-bold mb-3">{steps[currentStep].title}</h2>
                <p className="text-muted-foreground leading-relaxed mobile-text">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {steps[currentStep].features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-background/30 rounded-lg p-3 text-center"
                  >
                    <p className="text-xs sm:text-sm font-medium">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-4 space-y-4 mobile-safe">
        {role === 'learner' && currentStep === 0 && user?.mentor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mentor-card rounded-xl p-4 mb-4"
          >
            <div className="flex items-center gap-3">
              <img-replace
                alt={user.mentor.name || "Personal mentor's photo"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{user.mentor.name}</p>
                <p className="text-sm text-muted-foreground">{user.mentor.expertise}</p>
                <p className="text-xs text-yellow-400">Your Personal Mentor ⭐</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          <Button
            onClick={nextStep}
            className="flex-1 kaazi-gradient text-white font-semibold"
          >
            {currentStep === steps.length - 1 ? (role === 'learner' ? 'Start Learning' : 'Start Mentoring') : 'Continue'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
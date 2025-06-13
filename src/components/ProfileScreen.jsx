import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  User, 
  Award, 
  Download, 
  Settings, 
  LogOut, 
  Edit3, 
  Phone, 
  Calendar,
  TrendingUp,
  Clock,
  Globe
} from 'lucide-react';

const ProfileScreen = ({ user, onBack, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');

  const handleSaveProfile = () => {
    // Update user data in localStorage
    const updatedUser = { ...user, name: editedName };
    localStorage.setItem('kaazi_user', JSON.stringify(updatedUser));
    setIsEditing(false);
    
    toast({
      title: "Profile Updated! ✅",
      description: "Your changes have been saved successfully."
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "See you soon! Keep learning and growing! 👋"
    });
    onLogout();
  };

  const achievements = [
    { id: 1, title: "First Steps", description: "Completed your first lesson", icon: "🎯", earned: true },
    { id: 2, title: "Quick Learner", description: "Completed 3 lessons in one day", icon: "⚡", earned: false },
    { id: 3, title: "Dedicated Student", description: "7-day learning streak", icon: "🔥", earned: false },
    { id: 4, title: "Module Master", description: "Completed your first module", icon: "🏆", earned: false },
    { id: 5, title: "Mentor's Pride", description: "Received mentor appreciation", icon: "⭐", earned: true },
    { id: 6, title: "Job Ready", description: "Unlocked job opportunities", icon: "💼", earned: false }
  ];

  const stats = [
    { label: "Modules Completed", value: user?.progress?.completedModules || 0, icon: Award, color: "text-green-400" },
    { label: "Study Streak", value: `${user?.progress?.studyStreak || 0} days`, icon: TrendingUp, color: "text-blue-400" },
    { label: "Certificates", value: user?.progress?.certificates || 0, icon: Download, color: "text-purple-400" },
    { label: "Days Active", value: Math.floor((Date.now() - new Date(user?.joinedAt || Date.now())) / (1000 * 60 * 60 * 24)), icon: Calendar, color: "text-yellow-400" }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 glass-effect border-b border-border/50 p-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1">
            <h1 className="font-bold">Profile</h1>
            <p className="text-xs text-muted-foreground">Manage your account</p>
          </div>
          
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Edit3 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 kaazi-gradient rounded-2xl flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} size="sm" className="kaazi-gradient text-white">
                      Save
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{user?.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(user?.joinedAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background/30 rounded-lg p-4 text-center"
              >
                {React.createElement(stat.icon, { className: `w-6 h-6 mx-auto mb-2 ${stat.color}` })}
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mentor Info */}
        {user?.mentor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mentor-card rounded-xl p-4"
          >
            <h3 className="font-semibold mb-3">Your Mentor</h3>
            <div className="flex items-center gap-3">
              <img  
                alt="Mentor Sarah Nakato"
                className="w-12 h-12 rounded-full object-cover"
               src="https://images.unsplash.com/photo-1579748294772-fa56d1a0a690" />
              <div className="flex-1">
                <h4 className="font-medium">{user.mentor.name}</h4>
                <p className="text-sm text-muted-foreground">{user.mentor.expertise}</p>
                <div className="flex gap-1 mt-1">
                  {user.mentor.languages.map(lang => (
                    <span key={lang} className="text-xs bg-background/30 px-2 py-0.5 rounded">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold mb-4">Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`p-3 rounded-lg border ${
                  achievement.earned 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-background/30 border-border/50'
                }`}
              >
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <h4 className={`font-medium text-sm ${
                  achievement.earned ? 'text-green-400' : 'text-muted-foreground'
                }`}>
                  {achievement.title}
                </h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold mb-4">Settings</h3>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Globe className="w-5 h-5 mr-3" />
              Language Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Download className="w-5 h-5 mr-3" />
              Offline Content
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="w-5 h-5 mr-3" />
              App Preferences
            </Button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileScreen;
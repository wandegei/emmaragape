import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { BookOpen, Users, Award, TrendingUp, MessageCircle, User, Download, Wifi, WifiOff, DollarSign, Share2, Briefcase, Lightbulb, Heart, Sparkles, ShieldCheck, Smartphone, Settings, GraduationCap as UserGraduate, ChevronRight, Volume2, Send, Menu, X, Bell, Info, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';

const LearnerDashboard = ({ user, onModuleSelect, onNavigate, onLogout }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [modules, setModules] = useState([]);
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const kaaziModules = [
    { id: 'personal', title: "Personal Skills", icon: Heart, description: "Motivation, confidence, goal setting", color: "bg-red-500/20 text-red-400", progress: 75, totalLessons: 10, completedLessons: 7 },
    { id: 'life', title: "Life Skills", icon: Sparkles, description: "Budgeting, hygiene, cooking, stress", color: "bg-orange-500/20 text-orange-400", progress: 50, totalLessons: 12, completedLessons: 6 },
    { id: 'soft', title: "Soft Skills", icon: Users, description: "Teamwork, time management, communication", color: "bg-yellow-500/20 text-yellow-400", progress: 90, totalLessons: 8, completedLessons: 7 },
    { id: 'it_basics', title: "IT Basics", icon: Smartphone, description: "Typing, email, cybersecurity, file handling", color: "bg-green-500/20 text-green-400", progress: 60, totalLessons: 15, completedLessons: 9 },
    { id: 'digital_essential', title: "Essential Digital Skills", icon: ShieldCheck, description: "Smartphone mastery, mobile money, cloud storage", color: "bg-teal-500/20 text-teal-400", progress: 80, totalLessons: 10, completedLessons: 8 },
    { id: 'social_media', title: "Social Media Basics", icon: MessageCircle, description: "Posting, privacy, netiquette, trends", color: "bg-blue-500/20 text-blue-400", progress: 40, totalLessons: 12, completedLessons: 5 },
    { id: 'tech_foundations', title: "Tech Foundations", icon: Settings, description: "Device setup, Wi-Fi, troubleshooting", color: "bg-indigo-500/20 text-indigo-400", progress: 70, totalLessons: 9, completedLessons: 6 },
    { id: 'digital_work_track', title: "Digital Work Tracks", icon: Briefcase, description: "Choose: Content Writing, SEO, Data Entry...", color: "bg-purple-500/20 text-purple-400", progress: 25, totalLessons: 20, completedLessons: 5, isSpecial: true },
  ];
  
  const jobGigs = [
    { id: 1, title: "Write 5 Blog Posts", payout: "KES 2500", skills: ["Content Writing"], company: "Tech Solutions Ltd.", status: "Applied" },
    { id: 2, title: "Social Media Engagement", payout: "UGX 50,000", skills: ["Social Media Basics"], company: "Pamoja Creatives", status: "New" },
    { id: 3, title: "Data Entry Project", payout: "TZS 30,000", skills: ["IT Basics", "Data Entry"], company: "DataPro Services", status: "In Progress" },
  ];

  const notifications = [
    { id: 1, text: "New lesson unlocked in 'IT Basics'!", date: "2h ago", type: "learning" },
    { id: 2, text: "Mentor Sarah sent you a message.", date: "1d ago", type: "mentor" },
    { id: 3, text: "Job Alert: Data Entry Gig posted.", date: "3d ago", type: "job" },
  ];

  const tips = [
    "Set daily learning goals to stay motivated.",
    "Practice your new skills regularly.",
    "Don't be afraid to ask your mentor for help.",
    "Take breaks to avoid burnout.",
  ];

  useEffect(() => {
    const savedModules = localStorage.getItem(`kaazi_learner_modules_${user?.id}`);
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    } else {
      setModules(kaaziModules.map(m => ({ ...m, progress: m.progress || 0, completedLessons: m.completedLessons || 0 })));
    }

    const quotes = [
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "Your education is a dress rehearsal for a life that is yours to lead. - Nora Ephron",
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Believe you can and you're halfway there. - Theodore Roosevelt",
      "Start where you are. Use what you have. Do what you can. - Arthur Ashe"
    ];
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user]);

  const totalProgress = modules.length > 0 ? modules.reduce((sum, m) => sum + m.progress, 0) / modules.length : 0;

  const handleSelectModule = (module) => {
    const fullModuleData = kaaziModules.find(m => m.id === module.id) || module;
    const moduleWithLessons = {
      ...fullModuleData,
      totalLessons: fullModuleData.totalLessons || 10, 
      completedLessons: module.completedLessons || 0,
    };
    onModuleSelect(moduleWithLessons);
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'text-foreground' : 'text-slate-800'}`}>
      <div className="flex-1 flex flex-col">
        <div className={`sticky top-0 z-20 ${theme === 'dark' ? 'glass-effect' : 'bg-slate-100 shadow-sm'} border-b ${theme === 'dark' ? 'border-border/50' : 'border-slate-300'} p-4`}>
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${theme === 'dark' ? 'kaazi-gradient' : 'bg-green-600'} rounded-lg flex items-center justify-center`}>
                <UserGraduate className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`font-bold ${theme === 'dark' ? 'text-gradient' : 'text-green-700'}`}>My Journey Hub</h1>
                <p className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>Karibu, {user?.profile?.fullName || user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                isOnline 
                  ? (theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                  : (theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')
              }`}>
                {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                {isOnline ? 'Online' : 'Offline'}
              </div>
              <Button onClick={() => onNavigate('profile')} variant="ghost" size="icon" className={`rounded-full ${theme === 'dark' ? 'text-foreground' : 'text-slate-700 hover:bg-slate-200'}`}>
                <User className="w-5 h-5" />
              </Button>
               <Button onClick={onLogout} variant="ghost" size="sm" className={`${theme === 'dark' ? 'text-foreground hover:bg-accent' : 'text-slate-700 hover:bg-slate-200'}`}>
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
              <Button onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)} variant="ghost" size="icon" className={`rounded-full lg:hidden ${theme === 'dark' ? 'text-foreground' : 'text-slate-700 hover:bg-slate-200'}`}>
                {isRightSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className={`${theme === 'dark' ? 'glass-effect' : 'bg-white shadow-lg border border-slate-200'} rounded-2xl p-6`}
            >
              <div className="flex items-start gap-4">
                <img  
                  alt={user?.mentor?.name || "Mentor"} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary" 
                 src={user?.mentor?.avatar || "https://images.unsplash.com/photo-1652841190565-b96e0acbae17"} />
                <div className="flex-1">
                  <h2 className="text-xl font-bold">Hello, {user?.profile?.fullName?.split(' ')[0] || user?.name}!</h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'} italic mt-1`}>"{motivationalQuote}"</p>
                  <div className={`mt-3 ${theme === 'dark' ? 'bg-primary/10' : 'bg-green-50'} p-3 rounded-lg`}>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-primary' : 'text-green-700'} flex items-center`}>
                      <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                      Today's Focus:
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-primary-foreground/80' : 'text-green-600'}`}>Complete one lesson in 'IT Basics' to build momentum!</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-primary-foreground/90' : 'text-slate-800'}`}>Learning Tracker</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => handleSelectModule(module)}
                    className={`${theme === 'dark' ? 'module-card' : 'bg-white shadow-lg border border-slate-200 hover:shadow-xl'} rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between min-h-[160px] ${module.isSpecial ? 'col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 ring-2 ring-yellow-400' : ''}`}
                  >
                    <div>
                      <div className={`w-10 h-10 rounded-lg ${module.color} flex items-center justify-center mb-2`}>
                        {React.createElement(module.icon || BookOpen, { className: "w-5 h-5" })}
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{module.title}</h4>
                      <p className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'} mb-2`}>{module.description}</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'}`}>{module.completedLessons || 0}/{module.totalLessons || 10} lessons</span>
                        <span className={`font-medium ${theme === 'dark' ? 'text-primary' : 'text-green-600'}`}>{module.progress || 0}%</span>
                      </div>
                      <div className={`w-full ${theme === 'dark' ? 'bg-background/30' : 'bg-slate-200'} rounded-full h-1.5`}>
                        <div
                          className={`h-1.5 ${theme === 'dark' ? 'kaazi-gradient' : 'bg-green-500'} rounded-full transition-all duration-300`}
                          style={{ width: `${module.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${theme === 'dark' ? 'mentor-card' : 'bg-white shadow-lg border border-slate-200'} rounded-xl p-4`}>
              <h3 className="font-semibold mb-3">Mentor Connection</h3>
              <div className="flex items-center gap-3 mb-3">
                <img  
                  alt={user?.mentor?.name || "Mentor"} 
                  className="w-12 h-12 rounded-full object-cover"
                 src={user?.mentor?.avatar || "https://images.unsplash.com/photo-1652841190565-b96e0acbae17"} />
                <div className="flex-1">
                  <h4 className="font-medium">{user?.mentor?.name || "Sarah Nakato"}</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>{user?.mentor?.expertise || "Digital Skills Coach"}</p>
                </div>
                <Button onClick={() => onNavigate('mentorChat')} size="sm" className={`${theme === 'dark' ? 'kaazi-gradient' : 'bg-green-600 hover:bg-green-700'} text-white`}>
                  <Send className="w-4 h-4 mr-2" /> Chat
                </Button>
              </div>
              <p className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'}`}>Next check-in: Tomorrow at 10:00 AM</p>
              <Button variant="outline" size="sm" className={`w-full mt-3 ${theme === 'dark' ? 'border-border text-foreground hover:bg-accent' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                <Volume2 className="w-4 h-4 mr-2" /> Send Voice Note
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-primary-foreground/90' : 'text-slate-800'}`}>Job & Gig Matches</h3>
              <div className="space-y-3">
                {jobGigs.map(gig => (
                  <div key={gig.id} className={`${theme === 'dark' ? 'glass-effect' : 'bg-white shadow-lg border border-slate-200'} rounded-lg p-4`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{gig.title}</h4>
                        <p className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>{gig.company}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${gig.status === "New" ? (theme === 'dark' ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700") : gig.status === "Applied" ? (theme === 'dark' ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-700") : (theme === 'dark' ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700")}`}>{gig.status}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-green-400">{gig.payout}</span>
                      <Button size="sm" className={`${theme === 'dark' ? 'kaazi-gradient' : 'bg-green-600 hover:bg-green-700'} text-white`}>Apply Now</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`mt-4 ${theme === 'dark' ? 'glass-effect' : 'bg-white shadow-lg border border-slate-200'} rounded-lg p-4`}>
                <h4 className="font-semibold text-sm mb-2">Wallet Summary</h4>
                <div className="flex justify-between text-xs">
                  <p>Earnings to Date: <span className="font-bold text-green-400">KES 500</span></p>
                  <p>Pending Payouts: <span className="font-bold text-yellow-400">KES 1500</span></p>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-primary-foreground/90' : 'text-slate-800'}`}>Social Zone</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className={`h-auto py-4 flex flex-col items-start text-left ${theme === 'dark' ? 'glass-effect' : 'bg-white shadow hover:bg-slate-50 border-slate-200'}`}>
                  <Users className="w-6 h-6 mb-2 text-purple-400" />
                  <span className="font-semibold">Peer Group Chat</span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>Connect with learners in 'IT Basics'</span>
                </Button>
                <Button variant="outline" className={`h-auto py-4 flex flex-col items-start text-left ${theme === 'dark' ? 'glass-effect' : 'bg-white shadow hover:bg-slate-50 border-slate-200'}`}>
                  <Award className="w-6 h-6 mb-2 text-yellow-400" />
                  <span className="font-semibold">Group Challenges</span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>Join the 'Typing Speed' challenge!</span>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className={`${theme === 'dark' ? 'glass-effect' : 'bg-white shadow-lg border border-slate-200'} rounded-2xl p-6`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Skill Passport</h3>
                <Button variant="outline" size="sm" className={`${theme === 'dark' ? 'border-border text-foreground hover:bg-accent' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-semibold">Total Certificates:</span> {modules.filter(m => m.progress === 100).length}</p>
                <p className="text-sm"><span className="font-semibold">Top Skills:</span> IT Basics, Social Media</p>
                <p className="text-sm"><span className="font-semibold">Overall Progress:</span> {Math.round(totalProgress)}%</p>
              </div>
              <Button className={`w-full mt-4 ${theme === 'dark' ? 'kaazi-gradient' : 'bg-green-600 hover:bg-green-700'} text-white`}>
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </motion.div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {isRightSidebarOpen && (
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-0 right-0 h-full w-72 ${theme === 'dark' ? 'glass-effect border-l border-border/50' : 'bg-slate-100 border-l border-slate-300 shadow-xl'} z-30 p-4 overflow-y-auto lg:hidden`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Activity & Tips</h3>
              <Button onClick={() => setIsRightSidebarOpen(false)} variant="ghost" size="icon" className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold mb-2 flex items-center"><Bell className="w-4 h-4 mr-2 text-yellow-400" /> Notifications</h4>
                <div className="space-y-2">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-2 rounded-md text-xs ${theme === 'dark' ? 'bg-background/50' : 'bg-slate-200'}`}>
                      <p className="font-medium">{notif.text}</p>
                      <p className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'}`}>{notif.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold mb-2 flex items-center"><Info className="w-4 h-4 mr-2 text-blue-400" /> Quick Tips</h4>
                <div className="space-y-2">
                  {tips.map((tip, index) => (
                     <div key={index} className={`p-2 rounded-md text-xs ${theme === 'dark' ? 'bg-background/50' : 'bg-slate-200'}`}>
                      <p>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <aside className={`hidden lg:block w-72 ${theme === 'dark' ? 'glass-effect border-l border-border/50' : 'bg-slate-100 border-l border-slate-300'} p-4 overflow-y-auto h-screen sticky top-0`}>
        <h3 className="text-lg font-semibold mb-6 mt-4">Activity & Tips</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-semibold mb-2 flex items-center"><Bell className="w-4 h-4 mr-2 text-yellow-400" /> Notifications</h4>
            <div className="space-y-2">
              {notifications.map(notif => (
                <div key={notif.id} className={`p-2 rounded-md text-xs ${theme === 'dark' ? 'bg-background/50' : 'bg-slate-200'}`}>
                  <p className="font-medium">{notif.text}</p>
                  <p className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'}`}>{notif.date}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-2 flex items-center"><Info className="w-4 h-4 mr-2 text-blue-400" /> Quick Tips</h4>
            <div className="space-y-2">
              {tips.map((tip, index) => (
                <div key={index} className={`p-2 rounded-md text-xs ${theme === 'dark' ? 'bg-background/50' : 'bg-slate-200'}`}>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default LearnerDashboard;
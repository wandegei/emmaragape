import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { 
  Users, UserCheck, UserX, TrendingUp, MessageSquare, Send, Bell, Filter, ChevronDown, ChevronRight, 
  Edit, Flag, Award, Briefcase, BarChart3, ListChecks, UserCircle2, Menu, X, Info, LogOut
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import MentorStats from '@/components/mentor/MentorStats';
import LearnerRoster from '@/components/mentor/LearnerRoster';
import CommunicationHub from '@/components/mentor/CommunicationHub';
import SelectedLearnerProfile from '@/components/mentor/SelectedLearnerProfile';
import MentorRightSidebar from '@/components/mentor/MentorRightSidebar';

const MentorDashboard = ({ user, onNavigate, onLogout }) => {
  const [learners, setLearners] = useState([]);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const initialLearners = [
    { id: 'learner001', name: 'Aisha Mohammed', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face', engagement: 'High', lastLogin: '2 hours ago', progress: 85, currentModule: 'Social Media Basics', gigsCompleted: 2, skills: ['IT Basics', 'Social Media', 'Content Writing'], notes: [], flags: [] },
    { id: 'learner002', name: 'John Okello', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face', engagement: 'Medium', lastLogin: '1 day ago', progress: 60, currentModule: 'IT Basics', gigsCompleted: 1, skills: ['IT Basics'], notes: [{ text: "Struggling with cybersecurity concepts.", date: "2025-06-05" }], flags: [] },
    { id: 'learner003', name: 'Fatuma Ibrahim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b2943e?w=80&h=80&fit=crop&crop=face', engagement: 'Low', lastLogin: '5 days ago', progress: 20, currentModule: 'Personal Skills', gigsCompleted: 0, skills: [], notes: [], flags: [{ reason: "Disengaged for 3+ days", date: "2025-06-04" }] },
    { id: 'learner004', name: 'David Kimani', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=face', engagement: 'High', lastLogin: '30 mins ago', progress: 95, currentModule: 'Digital Work Tracks (SEO)', gigsCompleted: 3, skills: ['IT Basics', 'Social Media', 'SEO'], notes: [], flags: [] },
  ];
  
  useEffect(() => {
    const savedLearners = localStorage.getItem(`kaazi_mentor_learners_${user?.id}`);
    if (savedLearners) {
      setLearners(JSON.parse(savedLearners));
    } else {
      setLearners(initialLearners);
    }
  }, [user]);

  const filteredLearners = learners.filter(learner => {
    const nameMatch = learner.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterOption === 'all') return nameMatch;
    if (filterOption === 'active') return nameMatch && learner.engagement === 'High';
    if (filterOption === 'needs_support') return nameMatch && (learner.engagement === 'Low' || learner.flags.length > 0);
    if (filterOption === 'near_completion') return nameMatch && learner.progress >= 80;
    return nameMatch;
  });

  const mentorStatsData = {
    totalLearners: learners.length,
    certifiedPercentage: Math.round(learners.filter(l => l.progress === 100).length / learners.length * 100) || 0,
    gigActivePercentage: Math.round(learners.filter(l => l.gigsCompleted > 0).length / learners.length * 100) || 0,
    averageProgress: Math.round(learners.reduce((sum, l) => sum + l.progress, 0) / learners.length) || 0,
  };

  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    toast({ title: "Broadcast Sent!", description: `Message sent to ${learners.length} learners.` });
    setBroadcastMessage('');
  };

  const addNoteToLearner = (learnerId, noteText) => {
    if (!noteText.trim()) return;
    const updatedLearners = learners.map(l => 
      l.id === learnerId ? { ...l, notes: [...l.notes, { text: noteText, date: new Date().toISOString() }] } : l
    );
    setLearners(updatedLearners);
    setSelectedLearner(updatedLearners.find(l => l.id === learnerId));
    localStorage.setItem(`kaazi_mentor_learners_${user?.id}`, JSON.stringify(updatedLearners));
    toast({ title: "Note Added", description: `Note added for ${selectedLearner?.name}.` });
  };
  
  const flagLearner = (learnerId, reason) => {
    if (!reason.trim()) return;
    const updatedLearners = learners.map(l => 
      l.id === learnerId ? { ...l, flags: [...l.flags, { reason: reason, date: new Date().toISOString() }] } : l
    );
    setLearners(updatedLearners);
    setSelectedLearner(updatedLearners.find(l => l.id === learnerId));
    localStorage.setItem(`kaazi_mentor_learners_${user?.id}`, JSON.stringify(updatedLearners));
    toast({ title: "Learner Flagged", description: `${selectedLearner?.name} has been flagged.` });
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'text-foreground' : 'text-slate-800'}`}>
      <div className="flex-1 flex flex-col">
        <div className={`sticky top-0 z-20 ${theme === 'dark' ? 'glass-effect' : 'bg-slate-100 shadow-sm'} border-b ${theme === 'dark' ? 'border-border/50' : 'border-slate-300'} p-4`}>
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <div className={`${theme === 'dark' ? 'kaazi-gradient' : 'bg-green-600'} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <UserCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`font-bold ${theme === 'dark' ? 'text-gradient' : 'text-green-700'}`}>Impact Command Center</h1>
                <p className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>Welcome, Mentor {user?.profile?.fullName || user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className={`rounded-full ${theme === 'dark' ? 'text-foreground' : 'text-slate-700 hover:bg-slate-200'}`}>
                <Bell className="w-5 h-5" />
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
            <MentorStats stats={mentorStatsData} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
                <LearnerRoster 
                  learners={filteredLearners}
                  onSelectLearner={setSelectedLearner}
                  searchTerm={searchTerm}
                  onSearchTermChange={setSearchTerm}
                  filterOption={filterOption}
                  onFilterOptionChange={setFilterOption}
                />
                <CommunicationHub
                  broadcastMessage={broadcastMessage}
                  onBroadcastMessageChange={setBroadcastMessage}
                  onSendBroadcast={handleSendBroadcast}
                />
              </motion.div>
              
              {selectedLearner && (
                <div className="hidden lg:block space-y-6 sticky top-[calc(4rem+1rem)]">
                  <SelectedLearnerProfile
                    learner={selectedLearner}
                    onClose={() => setSelectedLearner(null)}
                    onAddNote={addNoteToLearner}
                    onFlagLearner={flagLearner}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <MentorRightSidebar 
        isOpen={isRightSidebarOpen}
        onClose={() => setIsRightSidebarOpen(false)}
      />
      
      {selectedLearner && !isRightSidebarOpen && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={`lg:hidden fixed bottom-0 left-0 right-0 ${theme === 'dark' ? 'glass-effect' : 'bg-slate-50 shadow-top'} p-4 border-t ${theme === 'dark' ? 'border-border/50' : 'border-slate-300'} max-h-[70vh] overflow-y-auto z-20 rounded-t-2xl`}
        >
          <SelectedLearnerProfile
            learner={selectedLearner}
            onClose={() => setSelectedLearner(null)}
            onAddNote={addNoteToLearner}
            onFlagLearner={flagLearner}
            isMobileView={true}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MentorDashboard;
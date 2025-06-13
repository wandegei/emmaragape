import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bell, ListChecks, Info, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';

const MentorRightSidebar = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

  const mentorNotifications = [
    { id: 1, text: "Aisha completed 'Social Media Basics' module!", date: "1h ago", type: "completion" },
    { id: 2, text: "John Okello sent you a message.", date: "3h ago", type: "message" },
    { id: 3, text: "Fatuma Ibrahim has been inactive for 5 days.", date: "1d ago", type: "alert" },
  ];

  const mentorTasks = [
    { id: 1, text: "Review Aisha's 'Social Media' project", due: "Today", type: "feedback" },
    { id: 2, text: "Check in with Fatuma (disengaged)", due: "Today", type: "check-in" },
    { id: 3, text: "Congratulate David on completing SEO track", due: "Tomorrow", type: "celebrate" },
  ];

  const mentorTips = [
    "Schedule regular check-ins with your mentees.",
    "Provide constructive feedback promptly.",
    "Celebrate small wins to keep learners motivated.",
    "Encourage peer-to-peer support among your mentees.",
  ];
  
  const sidebarContent = (
    <>
      <div className="flex justify-between items-center mb-6 lg:mt-4">
        <h3 className="text-lg font-semibold">Mentor Activity</h3>
        {onClose && (
          <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full lg:hidden">
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center"><Bell className="w-4 h-4 mr-2 text-yellow-400" /> Notifications</h4>
          <div className="space-y-2">
            {mentorNotifications.map(notif => (
              <div key={notif.id} className={`p-2 rounded-md text-xs ${theme === 'dark' ? 'bg-background/50' : 'bg-slate-200'}`}>
                <p className="font-medium">{notif.text}</p>
                <p className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'}`}>{notif.date}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center"><ListChecks className="w-4 h-4 mr-2 text-green-400" /> Mentor To-Do</h4>
          <div className="space-y-2">
            {mentorTasks.map(task => (
              <div key={task.id} className={`p-2 rounded-md text-xs ${theme === 'dark' ? 'bg-background/50' : 'bg-slate-200'}`}>
                <p className="font-medium">{task.text} - <span className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'}`}>Due: {task.due}</span></p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center"><Info className="w-4 h-4 mr-2 text-blue-400" /> Quick Tips</h4>
           <div className="space-y-2">
            {mentorTips.map((tip, index) => (
               <div key={index} className={`p-2 rounded-md text-xs ${theme === 'dark' ? 'bg-background/50' : 'bg-slate-200'}`}>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile/Tablet Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-0 right-0 h-full w-72 ${theme === 'dark' ? 'glass-effect border-l border-border/50' : 'bg-slate-100 border-l border-slate-300 shadow-xl'} z-30 p-4 overflow-y-auto lg:hidden`}
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
       <aside className={`hidden lg:block w-72 ${theme === 'dark' ? 'glass-effect border-l border-border/50' : 'bg-slate-100 border-l border-slate-300'} p-4 overflow-y-auto h-screen sticky top-0`}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default MentorRightSidebar;
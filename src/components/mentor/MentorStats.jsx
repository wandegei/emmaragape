import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Briefcase, TrendingUp } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.js';

const MentorStats = ({ stats }) => {
  const { theme } = useTheme();
  const statItems = [
    { label: 'Total Learners', value: stats.totalLearners, icon: Users, color: 'text-blue-400' },
    { label: '% Certified', value: `${stats.certifiedPercentage}%`, icon: Award, color: 'text-green-400' },
    { label: '% Gig-Active', value: `${stats.gigActivePercentage}%`, icon: Briefcase, color: 'text-yellow-400' },
    { label: 'Avg. Progress', value: `${stats.averageProgress}%`, icon: TrendingUp, color: 'text-purple-400' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className={`${theme === 'dark' ? 'glass-effect' : 'bg-white shadow-lg border border-slate-200'} rounded-2xl p-6`}
    >
      <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {statItems.map((item, index) => (
          <div key={index}>
            <item.icon className={`w-8 h-8 mx-auto mb-1 ${item.color}`} />
            <p className="text-2xl font-bold">{item.value}</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>{item.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MentorStats;
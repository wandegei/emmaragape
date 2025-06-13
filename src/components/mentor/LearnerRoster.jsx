import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.js';

const LearnerRoster = ({ learners, onSelectLearner, searchTerm, onSearchTermChange, filterOption, onFilterOptionChange }) => {
  const { theme } = useTheme();
  return (
    <div className={`${theme === 'dark' ? 'glass-effect' : 'bg-white shadow-lg border border-slate-200'} rounded-2xl p-6`}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-bold">Learner Roster</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input 
            type="text" 
            placeholder="Search learners..." 
            className={`${theme === 'dark' ? 'bg-background/50' : 'bg-slate-50 border-slate-300'} h-9 text-sm flex-grow sm:flex-grow-0`}
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
          <Button variant="outline" size="sm" className={`h-9 ${theme === 'dark' ? 'border-border text-foreground hover:bg-accent' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
            <Filter className="w-4 h-4 mr-2" /> Filter <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {learners.map(learner => (
          <div 
            key={learner.id} 
            onClick={() => onSelectLearner(learner)}
            className={`${theme === 'dark' ? 'module-card' : 'bg-slate-50 border border-slate-200 hover:shadow-md'} rounded-lg p-3 cursor-pointer transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img  alt={learner.name} className="w-10 h-10 rounded-full object-cover" src={learner.avatar || "https://images.unsplash.com/photo-1512742236132-9c5c89dda456"} />
                <div>
                  <h4 className="font-semibold text-sm">{learner.name}</h4>
                  <p className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'}`}>Progress: {learner.progress}%</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  learner.engagement === 'High' ? (theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') :
                  learner.engagement === 'Medium' ? (theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700') :
                  (theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')
                }`}>{learner.engagement}</span>
                <p className={`text-xs ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'} mt-1`}>Last login: {learner.lastLogin}</p>
              </div>
              <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-400'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnerRoster;
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserX, MessageSquare } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.js';

const SelectedLearnerProfile = ({ learner, onClose, onAddNote, onFlagLearner, isMobileView = false }) => {
  const { theme } = useTheme();
  if (!learner) return null;

  return (
    <div className={`${isMobileView ? '' : (theme === 'dark' ? 'glass-effect' : 'bg-white shadow-lg border border-slate-200') + ' rounded-2xl p-6'}`}>
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h2 className={`text-lg sm:text-xl font-bold ${isMobileView ? 'text-base' : ''}`}>{learner.name}</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className={`${theme === 'dark' ? 'text-foreground' : 'text-slate-700 hover:bg-slate-200'}`}>
          <UserX className="w-5 h-5" />
        </Button>
      </div>
      <img  alt={learner.name} className={`rounded-full object-cover mx-auto mb-2 sm:mb-3 ${isMobileView ? 'w-16 h-16' : 'w-20 h-20'}`} src={learner.avatar || "https://images.unsplash.com/photo-1652841190565-b96e0acbae17"} />
      <p className={`text-center ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'} mb-0.5 sm:mb-1 ${isMobileView ? 'text-xs' : 'text-sm'}`}>Module: {learner.currentModule}</p>
      <p className={`text-center ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'} mb-2 sm:mb-3 ${isMobileView ? 'text-xs' : 'text-sm'}`}>Progress: {learner.progress}%</p>
      
      <div className={`space-y-0.5 sm:space-y-1 mb-2 sm:mb-3 ${isMobileView ? 'text-xs' : 'text-xs'}`}>
        <p><strong>Gigs Completed:</strong> {learner.gigsCompleted}</p>
        <p><strong>Skills:</strong> {learner.skills.join(', ') || 'None yet'}</p>
      </div>

      <h4 className={`font-semibold mt-2 sm:mt-4 mb-1 sm:mb-2 ${isMobileView ? 'text-xs' : 'text-sm'}`}>Notes:</h4>
      {learner.notes.length > 0 ? learner.notes.slice(0, isMobileView ? 1 : undefined).map((note, i) => (
        <p key={i} className={`p-1.5 sm:p-2 rounded mb-1 ${theme === 'dark' ? 'bg-background/30' : 'bg-slate-100'} ${isMobileView ? 'text-xs' : 'text-xs'}`}>{note.text} <span className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-400'}`}>({new Date(note.date).toLocaleDateString()})</span></p>
      )) : <p className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'} ${isMobileView ? 'text-xs' : 'text-xs'}`}>No notes yet.</p>}
      
      <Input 
        placeholder="Add a new note..." 
        className={`${theme === 'dark' ? 'bg-background/50' : 'bg-slate-50 border-slate-300'} mt-1 sm:mt-2 h-8 ${isMobileView ? 'text-xs' : 'text-xs'}`}
        onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value) { onAddNote(learner.id, e.target.value); e.target.value = '';}}}
      />

      <h4 className={`font-semibold mt-2 sm:mt-3 mb-1 sm:mb-2 ${isMobileView ? 'text-xs' : 'text-sm'}`}>Flags:</h4>
      {learner.flags.length > 0 ? learner.flags.slice(0, isMobileView ? 1 : undefined).map((flag, i) => (
        <p key={i} className={`p-1.5 sm:p-2 rounded mb-1 ${theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'} ${isMobileView ? 'text-xs' : 'text-xs'}`}>{flag.reason} <span className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-400'}`}>({new Date(flag.date).toLocaleDateString()})</span></p>
      )) : <p className={`${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-500'} ${isMobileView ? 'text-xs' : 'text-xs'}`}>No flags.</p>}
       <Input 
        placeholder="Add a new flag reason..." 
        className={`${theme === 'dark' ? 'bg-background/50' : 'bg-slate-50 border-slate-300'} mt-1 sm:mt-2 h-8 ${isMobileView ? 'text-xs' : 'text-xs'}`}
        onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value) { onFlagLearner(learner.id, e.target.value); e.target.value = '';}}}
      />
      
      <div className="flex gap-2 mt-3 sm:mt-4">
        <Button size="sm" className={`flex-1 ${theme === 'dark' ? 'kaazi-gradient' : 'bg-green-600 hover:bg-green-700'} text-white`}><MessageSquare className="w-3 h-3 mr-1.5"/> Chat</Button>
      </div>
    </div>
  );
};

export default SelectedLearnerProfile;
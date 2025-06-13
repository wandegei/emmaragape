import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.js';

const CommunicationHub = ({ broadcastMessage, onBroadcastMessageChange, onSendBroadcast }) => {
  const { theme } = useTheme();
  return (
    <div className={`${theme === 'dark' ? 'glass-effect' : 'bg-white shadow-lg border border-slate-200'} rounded-2xl p-6`}>
      <h2 className="text-xl font-bold mb-4">Communication Hub</h2>
      <div className="space-y-3">
        <Input 
          type="text" 
          placeholder="Type broadcast message..." 
          className={`${theme === 'dark' ? 'bg-background/50' : 'bg-slate-50 border-slate-300'}`}
          value={broadcastMessage}
          onChange={(e) => onBroadcastMessageChange(e.target.value)}
        />
        <Button onClick={onSendBroadcast} className={`w-full ${theme === 'dark' ? 'kaazi-gradient' : 'bg-green-600 hover:bg-green-700'} text-white`}>
          <Send className="w-4 h-4 mr-2" /> Send to All Mentees
        </Button>
        <Button variant="outline" className={`w-full ${theme === 'dark' ? 'border-border text-foreground hover:bg-accent' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
          <MessageSquare className="w-4 h-4 mr-2" /> View Individual Chats
        </Button>
      </div>
    </div>
  );
};

export default CommunicationHub;
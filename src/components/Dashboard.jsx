import React from 'react';
import LearnerDashboard from '@/components/LearnerDashboard';
import MentorDashboard from '@/components/MentorDashboard';

const Dashboard = ({ user, onModuleSelect, onNavigate }) => {
  if (user?.role === 'learner') {
    return <LearnerDashboard user={user} onModuleSelect={onModuleSelect} onNavigate={onNavigate} />;
  }
  if (user?.role === 'mentor') {
    return <MentorDashboard user={user} onNavigate={onNavigate} />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <p className="text-xl text-muted-foreground">Loading dashboard...</p>
    </div>
  );
};

export default Dashboard;
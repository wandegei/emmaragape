import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap as UserGraduate, User2 as UserTie } from 'lucide-react';

const RoleSelectionScreen = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="mb-12">
          <div className="w-24 h-24 mx-auto mb-6 kaazi-gradient rounded-3xl flex items-center justify-center animate-float">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gradient mb-3">Welcome to Kaazi!</h1>
          <p className="text-xl text-muted-foreground">Learn. Earn. Rise.</p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-8 space-y-8"
        >
          <h2 className="text-3xl font-semibold mb-6">Who are you?</h2>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => onRoleSelect('learner')}
              className="w-full h-20 text-lg kaazi-gradient text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3"
            >
              <UserGraduate className="w-7 h-7" />
              Join as a Student
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => onRoleSelect('mentor')}
              className="w-full h-20 text-lg whatsapp-green text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3"
            >
              <UserTie className="w-7 h-7" />
              Join as a Mentor
            </Button>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mt-10 text-sm"
        >
          Empowering East African youth with digital skills, mentorship, and remote income opportunities.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RoleSelectionScreen;
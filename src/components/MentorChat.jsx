import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Smile } from 'lucide-react';

const MentorChat = ({ user, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load existing messages or initialize with welcome message
    const savedMessages = localStorage.getItem(`kaazi_chat_${user?.mentor?.id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMessages = [
        {
          id: 1,
          text: `Habari ${user?.name}! 👋 Welcome to Kaazi! I'm ${user?.mentor?.name}, your personal mentor.`,
          sender: 'mentor',
          timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          isRead: true
        },
        {
          id: 2,
          text: "I'm here to guide you through your learning journey. Feel free to ask me anything about the courses, career advice, or if you need motivation! 💪",
          sender: 'mentor',
          timestamp: new Date(Date.now() - 86400000 + 60000).toISOString(),
          isRead: true
        },
        {
          id: 3,
          text: "What would you like to learn first? I recommend starting with Digital Literacy Basics if you're new to technology.",
          sender: 'mentor',
          timestamp: new Date(Date.now() - 86400000 + 120000).toISOString(),
          isRead: true
        }
      ];
      setMessages(welcomeMessages);
      localStorage.setItem(`kaazi_chat_${user?.mentor?.id}`, JSON.stringify(welcomeMessages));
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      isRead: false
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setNewMessage('');
    setIsTyping(true);

    // Simulate mentor response
    setTimeout(() => {
      const mentorResponse = generateMentorResponse(newMessage);
      const mentorMessage = {
        id: Date.now() + 1,
        text: mentorResponse,
        sender: 'mentor',
        timestamp: new Date().toISOString(),
        isRead: false
      };

      const finalMessages = [...updatedMessages, mentorMessage];
      setMessages(finalMessages);
      setIsTyping(false);
      
      // Save to localStorage
      localStorage.setItem(`kaazi_chat_${user?.mentor?.id}`, JSON.stringify(finalMessages));
    }, 1500 + Math.random() * 2000);
  };

  const generateMentorResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('habari')) {
      return "Hello! Great to hear from you! 😊 How is your learning going today?";
    }
    
    if (message.includes('help') || message.includes('stuck') || message.includes('difficult')) {
      return "Don't worry, I'm here to help! 💪 What specific topic are you finding challenging? Remember, every expert was once a beginner. You've got this!";
    }
    
    if (message.includes('motivation') || message.includes('tired') || message.includes('give up')) {
      return "I understand it can be tough sometimes, but remember why you started! 🌟 Every small step you take is bringing you closer to your goals. You're investing in your future, and I believe in you!";
    }
    
    if (message.includes('job') || message.includes('work') || message.includes('gig')) {
      return "Excellent question! 💼 Once you complete 2-3 modules, you'll unlock access to our job matching platform. Focus on building your skills first, and the opportunities will follow!";
    }
    
    if (message.includes('certificate') || message.includes('completion')) {
      return "Certificates are awarded when you complete each module with 80% or higher! 🏆 They're recognized by our partner companies and will boost your profile significantly.";
    }
    
    if (message.includes('offline') || message.includes('internet') || message.includes('data')) {
      return "Great news! Many of our modules support offline learning 📱 Download the lessons when you have WiFi, and study anytime. Your progress syncs when you're back online!";
    }
    
    if (message.includes('thank')) {
      return "You're very welcome! 😊 That's what I'm here for. Keep up the excellent work, and don't hesitate to reach out anytime!";
    }
    
    // Default responses
    const defaultResponses = [
      "That's a great question! Let me help you with that. Can you tell me more about what you're working on?",
      "I'm proud of your progress so far! 🌟 What's the next challenge you'd like to tackle?",
      "Remember, learning is a journey, not a race. Take your time and focus on understanding each concept well.",
      "You're doing amazing! 💪 Is there a particular skill you'd like to focus on developing?",
      "That's the spirit! Keep asking questions - that's how we learn and grow. What else can I help you with?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
          
          <img  
            alt="Mentor Sarah Nakato profile picture"
            className="w-10 h-10 rounded-full object-cover"
           src="https://images.unsplash.com/photo-1579748294772-fa56d1a0a690" />
          
          <div className="flex-1">
            <h1 className="font-bold">{user?.mentor?.name}</h1>
            <p className="text-xs text-green-400">Online • Available</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {message.sender === 'mentor' && (
                  <div className="flex items-center gap-2 mb-1">
                    <img  
                      alt="Mentor avatar"
                      className="w-6 h-6 rounded-full object-cover"
                     src="https://images.unsplash.com/photo-1543539022-d8d036d0c556" />
                    <span className="text-xs text-muted-foreground">{user?.mentor?.name}</span>
                  </div>
                )}
                
                <div className={`rounded-2xl p-3 ${
                  message.sender === 'user' 
                    ? 'kaazi-gradient text-white' 
                    : 'glass-effect'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                
                <p className="text-xs text-muted-foreground mt-1 px-2">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-2">
              <img  
                alt="Mentor typing"
                className="w-6 h-6 rounded-full object-cover"
               src="https://images.unsplash.com/photo-1543539022-d8d036d0c556" />
              <div className="glass-effect rounded-2xl p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 glass-effect border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Smile className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary pr-12"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              size="icon"
              className="absolute right-1 top-1 rounded-full kaazi-gradient text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Quick Replies */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {[
            "I need help",
            "How do I start?",
            "Show me jobs",
            "I'm stuck",
            "Thank you!"
          ].map((reply) => (
            <Button
              key={reply}
              onClick={() => setNewMessage(reply)}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
            >
              {reply}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
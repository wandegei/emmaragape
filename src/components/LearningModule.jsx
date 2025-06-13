import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Play, Pause, CheckCircle, Circle, Download, BookOpen, Clock, Award } from 'lucide-react';

const LearningModule = ({ module, user, onBack }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  useEffect(() => {
    // Generate lessons for the module
    const generateLessons = () => {
      const lessonTemplates = [
        { type: 'video', title: 'Introduction to {topic}', duration: '5 min' },
        { type: 'reading', title: 'Understanding {topic} Basics', duration: '8 min' },
        { type: 'interactive', title: 'Hands-on Practice', duration: '12 min' },
        { type: 'quiz', title: 'Knowledge Check', duration: '3 min' },
        { type: 'video', title: 'Advanced {topic} Techniques', duration: '10 min' },
        { type: 'project', title: 'Mini Project', duration: '15 min' },
        { type: 'reading', title: 'Best Practices', duration: '6 min' },
        { type: 'quiz', title: 'Final Assessment', duration: '5 min' }
      ];

      return Array.from({ length: module.totalLessons }, (_, index) => ({
        id: index + 1,
        title: lessonTemplates[index % lessonTemplates.length].title.replace('{topic}', module.title.split(' ')[0]),
        type: lessonTemplates[index % lessonTemplates.length].type,
        duration: lessonTemplates[index % lessonTemplates.length].duration,
        content: generateLessonContent(lessonTemplates[index % lessonTemplates.length].type, module.title),
        isCompleted: index < module.completedLessons
      }));
    };

    const newLessons = generateLessons();
    setLessons(newLessons);
    
    // Set completed lessons
    const completed = new Set(newLessons.filter(l => l.isCompleted).map(l => l.id));
    setCompletedLessons(completed);
  }, [module]);

  const generateLessonContent = (type, moduleTitle) => {
    const topic = moduleTitle.split(' ')[0].toLowerCase();
    
    switch (type) {
      case 'video':
        return {
          description: `Watch this comprehensive video introduction to ${topic}. Learn the fundamentals and see real-world examples.`,
          videoUrl: 'https://example.com/video',
          transcript: `Welcome to this lesson on ${topic}. In this video, we'll cover the essential concepts you need to know...`
        };
      case 'reading':
        return {
          description: `Read through this detailed guide about ${topic} fundamentals and best practices.`,
          content: `# Understanding ${moduleTitle}\n\nThis comprehensive guide will teach you everything you need to know about ${topic}.\n\n## Key Concepts\n\n1. **Foundation**: Understanding the basics\n2. **Application**: Putting theory into practice\n3. **Optimization**: Making it work better\n\n## Getting Started\n\nTo begin with ${topic}, you need to understand...`
        };
      case 'interactive':
        return {
          description: `Practice what you've learned with hands-on exercises and interactive examples.`,
          exercises: [
            { question: `What is the main purpose of ${topic}?`, type: 'multiple-choice' },
            { question: `Complete this ${topic} task`, type: 'practical' }
          ]
        };
      case 'quiz':
        return {
          description: `Test your knowledge with this quick quiz about ${topic}.`,
          questions: [
            {
              question: `Which of the following best describes ${topic}?`,
              options: ['Option A', 'Option B', 'Option C', 'Option D'],
              correct: 0
            },
            {
              question: `What is the most important aspect of ${topic}?`,
              options: ['Speed', 'Quality', 'Cost', 'All of the above'],
              correct: 3
            }
          ]
        };
      case 'project':
        return {
          description: `Apply your knowledge by completing this practical project using ${topic}.`,
          projectBrief: `Create a simple ${topic} project that demonstrates your understanding of the key concepts.`,
          requirements: [
            'Use the techniques learned in previous lessons',
            'Follow best practices',
            'Document your process'
          ]
        };
      default:
        return { description: `Learn more about ${topic} in this lesson.` };
    }
  };

  const completeLesson = (lessonId) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);
    
    // Update module progress
    const newProgress = (newCompleted.size / lessons.length) * 100;
    setProgress(newProgress);
    
    // Save progress to localStorage
    const savedModules = JSON.parse(localStorage.getItem('kaazi_modules') || '[]');
    const updatedModules = savedModules.map(m => 
      m.id === module.id 
        ? { ...m, progress: newProgress, completedLessons: newCompleted.size }
        : m
    );
    localStorage.setItem('kaazi_modules', JSON.stringify(updatedModules));
    
    toast({
      title: "Lesson Completed! 🎉",
      description: "Great job! Keep up the excellent work."
    });

    // Auto-advance to next lesson
    if (currentLesson < lessons.length - 1) {
      setTimeout(() => setCurrentLesson(currentLesson + 1), 1000);
    } else {
      // Module completed
      toast({
        title: "Module Completed! 🏆",
        description: "Congratulations! You've completed this module."
      });
    }
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return Play;
      case 'reading': return BookOpen;
      case 'quiz': return CheckCircle;
      case 'interactive': return Circle;
      case 'project': return Award;
      default: return Circle;
    }
  };

  const getLessonTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-red-400';
      case 'reading': return 'text-blue-400';
      case 'quiz': return 'text-green-400';
      case 'interactive': return 'text-purple-400';
      case 'project': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  if (!lessons.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading lessons...</p>
        </div>
      </div>
    );
  }

  const currentLessonData = lessons[currentLesson];

  return (
    <div className="min-h-screen">
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
          
          <div className="flex-1">
            <h1 className="font-bold">{module.title}</h1>
            <p className="text-xs text-muted-foreground">
              Lesson {currentLesson + 1} of {lessons.length}
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-medium">{Math.round(progress)}%</div>
            <div className="w-20 bg-background/50 rounded-full h-1">
              <div
                className="h-1 kaazi-gradient rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Lesson */}
        <motion.div
          key={currentLesson}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            {React.createElement(getLessonIcon(currentLessonData.type), {
              className: `w-6 h-6 ${getLessonTypeColor(currentLessonData.type)}`
            })}
            <div className="flex-1">
              <h2 className="text-xl font-bold">{currentLessonData.title}</h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="capitalize">{currentLessonData.type}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {currentLessonData.duration}
                </span>
              </div>
            </div>
            
            {completedLessons.has(currentLessonData.id) && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
          </div>

          <p className="text-muted-foreground mb-6">
            {currentLessonData.content.description}
          </p>

          {/* Lesson Content */}
          <div className="space-y-4">
            {currentLessonData.type === 'video' && (
              <div className="aspect-video bg-background/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <img  
                    alt="Video lesson thumbnail for digital skills training"
                    className="w-full h-full object-cover rounded-lg"
                   src="https://images.unsplash.com/photo-1562893492-afd14ae24913" />
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full kaazi-gradient"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                </div>
              </div>
            )}

            {currentLessonData.type === 'reading' && (
              <div className="prose prose-invert max-w-none">
                <div className="bg-background/30 rounded-lg p-4">
                  <div className="whitespace-pre-line">
                    {currentLessonData.content.content}
                  </div>
                </div>
              </div>
            )}

            {currentLessonData.type === 'quiz' && (
              <div className="space-y-4">
                {currentLessonData.content.questions.map((question, index) => (
                  <div key={index} className="bg-background/30 rounded-lg p-4">
                    <h3 className="font-medium mb-3">{question.question}</h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <Button
                          key={optionIndex}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (optionIndex === question.correct) {
                              toast({
                                title: "Correct! ✅",
                                description: "Well done!"
                              });
                            } else {
                              toast({
                                title: "Try again",
                                description: "That's not quite right.",
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentLessonData.type === 'project' && (
              <div className="bg-background/30 rounded-lg p-4">
                <h3 className="font-medium mb-3">Project Brief</h3>
                <p className="text-muted-foreground mb-4">
                  {currentLessonData.content.projectBrief}
                </p>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {currentLessonData.content.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {!completedLessons.has(currentLessonData.id) && (
              <Button
                onClick={() => completeLesson(currentLessonData.id)}
                className="flex-1 kaazi-gradient text-white"
              >
                Mark as Complete
              </Button>
            )}
            
            {currentLesson < lessons.length - 1 && (
              <Button
                onClick={() => setCurrentLesson(currentLesson + 1)}
                variant="outline"
                className="flex-1"
              >
                Next Lesson
              </Button>
            )}
          </div>
        </motion.div>

        {/* Lesson List */}
        <div>
          <h3 className="text-lg font-bold mb-4">All Lessons</h3>
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setCurrentLesson(index)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentLesson 
                    ? 'module-card' 
                    : 'glass-effect hover:bg-background/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  completedLessons.has(lesson.id) 
                    ? 'bg-green-500/20' 
                    : 'bg-background/30'
                }`}>
                  {completedLessons.has(lesson.id) ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    React.createElement(getLessonIcon(lesson.type), {
                      className: `w-4 h-4 ${getLessonTypeColor(lesson.type)}`
                    })
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">{lesson.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="capitalize">{lesson.type}</span>
                    <span>•</span>
                    <span>{lesson.duration}</span>
                  </div>
                </div>
                
                {index === currentLesson && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
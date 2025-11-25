
import React, { useState, useEffect, useRef } from 'react';
import { COURSE_CONTENT } from './constants';
import { SubTask, Message } from './types';
import { ProgressBar } from './components/ProgressBar';
import { getGeminiResponse } from './services/geminiService';
import { 
  CheckCircle2, 
  Circle, 
  Music2, 
  MessageSquare, 
  Send, 
  Bot, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  Image as ImageIcon,
  X,
  Upload,
  Info,
  Lock,
  Target
} from 'lucide-react';

const App: React.FC = () => {
  // --- State Management ---
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  // Default expanded lessons: open first lesson of Mod 1
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set(['m1-l1']));
  
  // Track expanded details for individual tasks
  const [expandedTaskDetails, setExpandedTaskDetails] = useState<Set<string>>(new Set());

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: 'model', text: "Bonjour Maja ! Je suis ton assistant basse. Prêt à travailler sur le Module 1 ?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Modal State for Images
  // We store the ID of the task whose images we want to show
  const [selectedImageTask, setSelectedImageTask] = useState<string | null>(null);
  
  // User uploaded images map: taskId -> array of base64 strings
  const [userUploadedImages, setUserUploadedImages] = useState<Record<string, string[]>>({});

  // --- Persistence ---
  useEffect(() => {
    const savedProgress = localStorage.getItem('maja_bass_progress_v2');
    if (savedProgress) {
      setCompletedTasks(new Set(JSON.parse(savedProgress)));
    }

    const savedImages = localStorage.getItem('maja_bass_user_images');
    if (savedImages) {
      setUserUploadedImages(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('maja_bass_progress_v2', JSON.stringify(Array.from(completedTasks)));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('maja_bass_user_images', JSON.stringify(userUploadedImages));
  }, [userUploadedImages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  // --- Logic ---
  const toggleTask = (taskId: string) => {
    const newSet = new Set(completedTasks);
    if (newSet.has(taskId)) {
      newSet.delete(taskId);
    } else {
      newSet.add(taskId);
    }
    setCompletedTasks(newSet);
  };

  const toggleTaskDetails = (taskId: string) => {
    const newSet = new Set(expandedTaskDetails);
    if (newSet.has(taskId)) {
      newSet.delete(taskId);
    } else {
      newSet.add(taskId);
    }
    setExpandedTaskDetails(newSet);
  };

  const toggleLesson = (lessonId: string, moduleId: string) => {
    // LOCKING MECHANISM: Only Module 1 is interactive for now
    if (moduleId !== 'mod-1') {
      return; 
    }

    const newSet = new Set(expandedLessons);
    if (newSet.has(lessonId)) {
      newSet.delete(lessonId);
    } else {
      newSet.add(lessonId);
    }
    setExpandedLessons(newSet);
  };

  const calculateProgress = () => {
    const allTasks = COURSE_CONTENT.flatMap(m => m.lessons.flatMap(l => l.tasks));
    const total = allTasks.length;
    const completed = allTasks.filter(t => completedTasks.has(t.id)).length;
    return total === 0 ? 0 : (completed / total) * 100;
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    const newMessage: Message = { role: 'user', text: userMsg };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
    setIsTyping(true);

    // Call Gemini Service
    const aiResponse = await getGeminiResponse(userMsg, chatMessages);
    
    setChatMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const openImageModal = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    setSelectedImageTask(taskId);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !selectedImageTask) return;
    
    // Convert FileList to Array safely to avoid "unknown" type issues
    const fileList = e.target.files;
    const files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);
        if (file) files.push(file);
    }
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUserUploadedImages(prev => {
          const currentImages = prev[selectedImageTask] || [];
          return {
            ...prev,
            [selectedImageTask]: [...currentImages, base64String]
          };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // --- Render Helpers ---
  const renderTask = (task: SubTask) => {
    const isChecked = completedTasks.has(task.id);
    const hasDefaultImages = task.imageUrls && task.imageUrls.length > 0;
    const hasUserImages = userUploadedImages[task.id] && userUploadedImages[task.id].length > 0;
    const showImageBtn = hasDefaultImages || task.id.includes('t1-1-2'); // Specific check for geometric task
    const isExpanded = expandedTaskDetails.has(task.id);

    return (
      <div 
        key={task.id} 
        className={`
          flex flex-col p-3 rounded-lg transition-all duration-200 border
          ${isChecked 
            ? 'bg-violet-900/20 border-violet-500/50 text-violet-200' 
            : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-300'}
        `}
      >
        <div className="flex items-center">
          {/* Checkbox triggers completion toggle */}
          <div 
            onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
            className={`mr-4 cursor-pointer hover:scale-110 transition-transform ${isChecked ? 'text-green-400' : 'text-slate-500'}`}
          >
            {isChecked ? <CheckCircle2 size={24} /> : <Circle size={24} />}
          </div>

          {/* Text area triggers details expansion */}
          <div 
            className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2 cursor-pointer"
            onClick={() => toggleTaskDetails(task.id)}
          >
            <div className="flex items-center gap-2">
               <span className="text-sm md:text-base font-medium select-none">{task.text}</span>
               {task.details && (
                 <Info size={16} className={`transition-transform ${isExpanded ? 'rotate-180 text-violet-400' : 'text-slate-600'}`} />
               )}
            </div>
            
            {showImageBtn && (
               <button 
                 onClick={(e) => openImageModal(e, task.id)}
                 className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-lg z-10"
               >
                 <ImageIcon size={14} />
                 {hasUserImages || hasDefaultImages ? "Voir les photos" : "Ajouter photos"}
               </button>
             )}
          </div>
        </div>
        
        {/* Expanded Details */}
        {isExpanded && task.details && (
          <div className="mt-2 ml-10 p-3 bg-slate-900/50 rounded-lg text-sm text-slate-400 border-l-2 border-violet-500/30 animate-in slide-in-from-top-1 fade-in duration-200">
            {task.details}
          </div>
        )}
      </div>
    );
  };

  // Find the selected task to get its images
  const selectedTaskObj = selectedImageTask 
    ? COURSE_CONTENT.flatMap(m => m.lessons.flatMap(l => l.tasks)).find(t => t.id === selectedImageTask)
    : null;

  // Combine default images and user uploaded images
  const currentImages = selectedTaskObj 
    ? [
        ...(selectedTaskObj.imageUrls || []),
        ...(userUploadedImages[selectedTaskObj.id] || [])
      ]
    : [];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 relative overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header */}
        <header className="mb-10 text-center md:text-left border-b border-slate-800 pb-6">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg shadow-lg shadow-violet-900/50">
              <Music2 className="text-white" size={28} />
            </div>
            <h2 className="text-xl font-bold tracking-wider text-slate-400 uppercase">BassMastery</h2>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-violet-200 to-blue-200 mb-2">
            Espace Maja
          </h1>
          <p className="text-slate-400 max-w-lg">
            Programme complet : Blocs Harmoniques, Groove & Architecture.
          </p>
        </header>

        {/* Global Progress */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-slate-500">Progression Totale (Modules 1-5)</h3>
          </div>
          <ProgressBar progress={calculateProgress()} />
        </section>

        {/* Modules List */}
        <div className="space-y-12">
          {COURSE_CONTENT.map((module) => (
            <div key={module.id} className="relative">
              {/* Module Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6 border-l-4 border-violet-500 pl-4">
                <h2 className="text-sm font-bold text-violet-400 uppercase tracking-widest">{module.title}</h2>
                <h3 className="text-2xl md:text-3xl font-bold text-white">{module.subtitle}</h3>
              </div>

              <div className="space-y-4">
                {module.lessons.map((lesson) => {
                  const isPractice = lesson.title.includes('PRATIQUE');
                  const isLocked = module.id !== 'mod-1';
                  
                  return (
                    <div 
                      key={lesson.id} 
                      className={`
                        group relative bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-300
                        ${isPractice 
                          ? 'border-emerald-500/50 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                          : 'border-slate-800 hover:border-slate-600'}
                        ${isLocked ? 'opacity-75' : 'opacity-100'}
                      `}
                    >
                      {/* Lesson Header */}
                      <div 
                        className={`
                          p-6 flex items-center justify-between cursor-pointer transition-colors
                          ${isPractice ? 'bg-emerald-900/10 hover:bg-emerald-900/20' : 'bg-slate-800/30 hover:bg-slate-800/50'}
                          ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                        `}
                        onClick={() => toggleLesson(lesson.id, module.id)}
                      >
                        <div className="flex-1">
                          <h4 className={`text-lg md:text-xl font-bold mb-1 flex items-center gap-2 ${isPractice ? 'text-emerald-300' : 'text-slate-200'}`}>
                            {isPractice && <Target size={20} className="text-emerald-400"/>}
                            {lesson.title}
                          </h4>
                          <p className="text-slate-400 text-sm md:text-base pr-4">{lesson.description}</p>
                        </div>
                        <div className="text-slate-500 group-hover:text-violet-400 transition-colors flex-shrink-0">
                          {isLocked ? (
                            <Lock size={20} className="text-slate-600" />
                          ) : (
                            expandedLessons.has(lesson.id) ? <ChevronUp size={24} /> : <ChevronDown size={24} />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content - Only if not locked */}
                      {!isLocked && expandedLessons.has(lesson.id) && (
                        <div className={`
                          p-6 pt-0 border-t bg-slate-900/50 animate-in fade-in slide-in-from-top-2 duration-300
                          ${isPractice ? 'border-emerald-500/20' : 'border-slate-800/50'}
                        `}>
                          
                          {/* Theory Details (Bullet points) */}
                          {lesson.details && (
                            <div className="mb-6 mt-6 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
                              <h5 className="text-violet-400 font-semibold mb-3 text-xs uppercase tracking-wide flex items-center gap-2">
                                 <BookOpen size={16}/> Points Clés
                              </h5>
                              <ul className="space-y-2">
                                {lesson.details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tasks List */}
                          <div className="space-y-3 mt-6">
                            <h5 className="text-slate-500 font-semibold text-xs uppercase tracking-wide mb-2">Objectifs Pratiques <span className="text-[10px] font-normal lowercase ml-2">(cliquez sur le texte pour + de détails)</span></h5>
                            {lesson.tasks.map(task => renderTask(task))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-500 transition-all z-40 hover:scale-110 active:scale-95 border-2 border-blue-400"
      >
        {isChatOpen ? <ChevronDown size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* AI Chat Interface */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden backdrop-blur-xl bg-opacity-95">
          {/* Chat Header */}
          <div className="bg-slate-900 p-4 border-b border-slate-700 flex items-center gap-3">
            <div className="p-2 bg-violet-600 rounded-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100">Coach Basse IA</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> En ligne
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/90 scroll-smooth">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`
                    max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-slate-700 text-slate-200 rounded-bl-none border border-slate-600'}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-none flex gap-1 border border-slate-600">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Question sur les blocs ou le groove ?"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!chatInput.trim() || isTyping}
              className="p-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {selectedImageTask && selectedTaskObj && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImageTask(null)}
        >
          <div 
            className="bg-slate-900 rounded-2xl border border-slate-700 max-w-4xl w-full p-6 relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
             <button 
                onClick={() => setSelectedImageTask(null)}
                className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors z-10 border border-slate-700"
              >
                <X size={24} />
              </button>

             <div className="flex justify-between items-center mb-6 pr-12">
               <h3 className="text-xl font-bold text-white">{selectedTaskObj.text}</h3>
               {/* Upload Button */}
               <label className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg cursor-pointer transition-colors text-sm font-semibold shadow-md">
                 <Upload size={16} />
                 <span>Ajouter photos</span>
                 <input 
                   type="file" 
                   accept="image/*" 
                   multiple 
                   className="hidden" 
                   onChange={handleImageUpload}
                 />
               </label>
             </div>

             <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {currentImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentImages.map((url, index) => (
                      <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-800">
                         <img 
                           src={url} 
                           alt={`Forme ${index + 1}`} 
                           className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                           onError={(e) => {
                             (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1e293b/a78bfa?text=Image+${index + 1}`;
                           }}
                         />
                         <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2 text-center text-xs text-slate-300">
                           {index < 5 ? `Bloc / Image ${index + 1}` : `Upload ${index + 1}`}
                         </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
                    <ImageIcon size={48} className="mb-2 opacity-50" />
                    <p className="italic">Aucune photo pour l'instant.</p>
                    <p className="text-sm mt-2">Cliquez sur "Ajouter photos" pour charger vos images.</p>
                  </div>
                )}
             </div>
             
             <p className="text-center text-sm text-slate-400 mt-4 border-t border-slate-800 pt-4">
               Les photos que vous ajoutez resteront enregistrées ici.
             </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;

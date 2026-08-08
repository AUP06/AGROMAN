import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  Pause,
  Play,
  Square,
  Globe,
  Radio,
  AlertCircle,
  Flame,
  Zap,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { Language } from '../../types';
import { VOICE_LANGUAGES } from '../common/AIVoiceAssistant';

interface AIAssistantModuleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantModule: React.FC<AIAssistantModuleProps> = ({
  language,
  setLanguage,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [inputQuery, setInputQuery] = useState('');
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDemoActive, setIsDemoActive] = useState(false);

  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const langConfig = VOICE_LANGUAGES[language] || VOICE_LANGUAGES.en;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-page-1',
      sender: 'ai',
      text: langConfig.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimTranscript]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Speak AI text via Web Speech Synthesis API
  const speakMessage = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) {
      setErrorMessage('Speech Synthesis API is not supported in this browser.');
      return;
    }

    if (activeSpeakingMsgId === msgId) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langConfig.bcp47;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const langPrefix = langConfig.bcp47.split('-')[0];
    const match = voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix));
    if (match) {
      utterance.voice = match;
    }

    utterance.onstart = () => {
      setActiveSpeakingMsgId(msgId);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setActiveSpeakingMsgId(null);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setActiveSpeakingMsgId(null);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveSpeakingMsgId(null);
    setIsPaused(false);
  };

  // Voice Input Speech Recognition
  const startVoiceRecording = () => {
    setErrorMessage(null);
    stopSpeech();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage(
        'Speech Recognition API is not supported in this browser window. Please type your query or try Demo Mode.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = langConfig.bcp47;

      recognition.onstart = () => {
        setIsListening(true);
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let transcriptStr = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcriptStr += event.results[i][0].transcript;
        }
        setInterimTranscript(transcriptStr);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions.');
        } else {
          setErrorMessage(`Speech recognition notice: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (interimTranscript.trim()) {
          const txt = interimTranscript.trim();
          setInterimTranscript('');
          handleSendQuery(txt);
        }
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
      setErrorMessage('Could not initialize microphone.');
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setIsListening(false);
    if (interimTranscript.trim()) {
      const txt = interimTranscript.trim();
      setInterimTranscript('');
      handleSendQuery(txt);
    }
  };

  const handleSendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate response
    setTimeout(() => {
      let aiText = '';
      const q = queryText.toLowerCase();

      if (q.includes('yellow') || q.includes('nitrogen') || q.includes('मഞ്ഞ') || q.includes('पीली') || q.includes('மஞ்சள்')) {
        aiText = langConfig.demoAiResponse;
      } else if (q.includes('irrigate') || q.includes('water') || q.includes('നന') || q.includes('सिंचाई')) {
        aiText = 'ESP32 sensor readings show soil moisture at 21.4% in Paddy Field Sector 2. Trigger drip irrigation tomorrow at 05:30 AM for 28 minutes to save 12,400L of water.';
      } else if (q.includes('yield') || q.includes('harvest') || q.includes('വിളവ്') || q.includes('उपज')) {
        aiText = 'Predicted yield for your Paddy Estate is 24.2 Tons (+18% above regional average) with estimated market value of ₹2.17 Lakhs.';
      } else {
        aiText = 'AGROMAN Neural AI suggests applying Trichoderma Viride bio-fungicide combined with organic Neem Oil emulsion for sustainable crop health.';
      }

      const aiMsgId = (Date.now() + 1).toString();
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);

      setTimeout(() => {
        speakMessage(aiText, aiMsgId);
      }, 300);
    }, 700);
  };

  const handleStartVoiceDemo = () => {
    setIsDemoActive(true);
    setErrorMessage(null);
    stopSpeech();

    const userMsgId = Date.now().toString();
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: langConfig.demoUserQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsListening(true);
    setInterimTranscript(langConfig.demoUserQuery);

    setTimeout(() => {
      setIsListening(false);
      setInterimTranscript('');

      const aiMsgId = (Date.now() + 1).toString();
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: langConfig.demoAiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsDemoActive(false);

      setTimeout(() => {
        speakMessage(langConfig.demoAiResponse, aiMsgId);
      }, 300);
    }, 2000);
  };

  const presets = [
    'My crop leaves are turning yellow',
    'When should I irrigate field B?',
    'Predict harvest yield for paddy',
    'Recommend organic pesticide',
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-950 rounded-3xl p-6 text-white shadow-xl border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#8CE854] text-slate-950 flex items-center justify-center font-black shadow-lg shrink-0">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">AGROMAN Neural Voice Assistant</h1>
              <span className="bg-[#8CE854] text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase font-mono">
                Multilingual AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1">
              Speak or type to receive real-time crop diagnosis, irrigation scheduling, and yield recommendations in 8 Indian languages.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-black/40 border border-emerald-500/40 px-3 py-1.5 rounded-2xl text-xs font-bold text-white">
            <Globe className="w-4 h-4 text-[#8CE854]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              {(Object.keys(VOICE_LANGUAGES) as Language[]).map((key) => (
                <option key={key} value={key} className="bg-slate-900 text-white">
                  {VOICE_LANGUAGES[key].nativeName} ({VOICE_LANGUAGES[key].name})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStartVoiceDemo}
            disabled={isDemoActive}
            className="flex items-center gap-2 bg-[#8CE854] hover:bg-[#78d641] disabled:opacity-50 text-slate-950 px-4 py-2 rounded-2xl text-xs font-black shadow-md transition-all shrink-0"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isDemoActive ? 'Simulating Voice...' : 'Start Voice Demo'}</span>
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden flex flex-col h-[650px]">
        {/* HUD Bar */}
        {(isListening || activeSpeakingMsgId) && (
          <div className="bg-slate-950 text-[#8CE854] px-5 py-3 flex items-center justify-between text-xs font-mono border-b border-emerald-800">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold text-white">
                {isListening
                  ? `Recording Voice Input (${langConfig.name})...`
                  : isPaused
                  ? 'Speech Output Paused'
                  : 'Synthesizing Voice Speech Output...'}
              </span>
            </div>

            {/* Bouncing Equalizer Bars */}
            <div className="flex items-center gap-1 h-5">
              {[40, 90, 60, 100, 50, 80, 70, 95, 30].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all ${
                    isPaused ? 'bg-gray-500 h-2' : 'bg-[#8CE854] animate-pulse'
                  }`}
                  style={{
                    height: isPaused ? '8px' : `${h}%`,
                    animationDelay: `${i * 120}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 text-xs text-amber-900 flex items-center justify-between px-5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage(null)} className="font-bold text-amber-800">
              Dismiss
            </button>
          </div>
        )}

        {/* Message Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-emerald-50/10">
          {messages.map((msg) => {
            const isSpeakingThis = activeSpeakingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3.5 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-black shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-900 text-white'
                      : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-emerald-800" />}
                </div>

                <div
                  className={`max-w-[80%] p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-900 text-white rounded-tr-none font-medium'
                      : 'bg-white text-slate-800 border border-emerald-100 rounded-tl-none font-medium'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  <div className="mt-3 pt-2 border-t border-emerald-100/30 flex items-center justify-between text-[11px] opacity-80">
                    <span className="font-mono">{msg.timestamp}</span>

                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => speakMessage(msg.text, msg.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isSpeakingThis
                              ? 'bg-[#8CE854] text-slate-950 font-black shadow-sm'
                              : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                          }`}
                        >
                          {isSpeakingThis ? (
                            isPaused ? (
                              <>
                                <Play className="w-3.5 h-3.5 fill-slate-950" />
                                <span>Resume</span>
                              </>
                            ) : (
                              <>
                                <Pause className="w-3.5 h-3.5 fill-slate-950" />
                                <span>Speaking...</span>
                              </>
                            )
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Listen Voice</span>
                            </>
                          )}
                        </button>

                        {isSpeakingThis && (
                          <button
                            onClick={stopSpeech}
                            className="p-1 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
                            title="Stop Audio"
                          >
                            <Square className="w-3.5 h-3.5 fill-red-700" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isListening && interimTranscript && (
            <div className="flex items-start gap-3.5 flex-row-reverse animate-pulse">
              <div className="w-9 h-9 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="max-w-[80%] p-4 rounded-3xl bg-red-50 border border-red-200 text-red-900 text-xs font-mono font-bold rounded-tr-none">
                <span className="text-[10px] text-red-600 block uppercase mb-1">Live Speech Transcribing...</span>
                "{interimTranscript}"
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Presets */}
        <div className="p-3 bg-white border-t border-emerald-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(preset)}
              className="shrink-0 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-xs font-semibold px-3.5 py-2 rounded-2xl border border-emerald-200/80 transition-all"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="p-4 bg-white border-t border-emerald-100 flex items-center gap-3 shrink-0">
          <button
            onClick={isListening ? stopVoiceRecording : startVoiceRecording}
            className={`p-4 rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0 ${
              isListening
                ? 'bg-red-600 text-white ring-4 ring-red-300 animate-pulse'
                : 'bg-[#8CE854] text-slate-950 hover:bg-[#78d641] shadow-[#8CE854]/40 hover:scale-105 active:scale-95'
            }`}
            title={isListening ? 'Stop Voice Recording' : 'Speak to AI'}
          >
            {isListening ? (
              <MicOff className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <Mic className="w-6 h-6 stroke-[2.5] text-slate-950" />
            )}
          </button>

          <input
            type="text"
            placeholder={`Ask AGROMAN AI in ${langConfig.name}...`}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSendQuery(inputQuery) : null)}
            className="flex-1 bg-slate-50 border border-emerald-200 rounded-2xl px-5 py-3.5 text-sm text-slate-800 font-medium outline-none focus:border-emerald-600 focus:bg-white transition-all"
          />

          <button
            onClick={() => handleSendQuery(inputQuery)}
            disabled={!inputQuery.trim()}
            className="p-4 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white rounded-2xl transition-all shadow-md shrink-0"
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

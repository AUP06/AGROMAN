import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Globe,
  RotateCcw,
  AlertCircle,
  Radio,
  CheckCircle2,
  Flame,
  Zap,
} from 'lucide-react';
import { Language } from '../../types';

interface AIVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange?: (lang: Language) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp?: string;
  language?: Language;
}

// Full 8 Language Configuration for TTS and Speech Recognition
export const VOICE_LANGUAGES: Record<
  Language,
  {
    name: string;
    nativeName: string;
    bcp47: string;
    welcome: string;
    demoUserQuery: string;
    demoAiResponse: string;
  }
> = {
  en: {
    name: 'English',
    nativeName: 'English (India)',
    bcp47: 'en-IN',
    welcome: 'Namaste! I am the AGROMAN AI Voice Assistant. How can I assist your crop management today?',
    demoUserQuery: 'My crop leaves are turning yellow',
    demoAiResponse: 'Possible Nitrogen deficiency detected in Zone B. Apply 2% Liquid Nano Urea (400 ml/acre) tomorrow morning at 7:00 AM.',
  },
  ml: {
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    bcp47: 'ml-IN',
    welcome: 'നമസ്കാരം! ഞാൻ അഗ്രോമാൻ എഐ വോയ്സ് അസിസ്റ്റന്റ്. ഇന്ന് നിങ്ങളുടെ പാടത്തിന് എന്താണ് വേണ്ടത്?',
    demoUserQuery: 'എന്റെ വിളയുടെ ഇലകൾ മഞ്ഞനിറമാകുന്നു',
    demoAiResponse: 'സോൺ ബിയിൽ നൈട്രജൻ കുറവ് കണ്ടെത്തി. നാളെ രാവിലെ 7 മണിക്ക് 2% ലിക്വിഡ് നാനോ യൂറിയ (400 മി.ലി/ഏക്കർ) തളിക്കുക.',
  },
  hi: {
    name: 'Hindi',
    nativeName: 'हिंदी',
    bcp47: 'hi-IN',
    welcome: 'नमस्ते! मैं एग्रोमैन एआई वॉयस असिस्टेंट हूँ। आज आपके खेत के लिए मैं क्या सहायता कर सकता हूँ?',
    demoUserQuery: 'मेरी फसल की पत्तियां पीली पड़ रही हैं',
    demoAiResponse: 'ज़ोन बी में नाइट्रोजन की कमी पाई गई है। कल सुबह 7 बजे 2% लिक्विड नैनो यूरिया (400 एमएल/एकड़) का छिड़काव करें।',
  },
  ta: {
    name: 'Tamil',
    nativeName: 'தமிழ்',
    bcp47: 'ta-IN',
    welcome: 'வணக்கம்! நான் அக்ரோமேன் AI குரல் உதவியாளர். உங்கள் பண்ணைக்கு இன்று என்ன உதவி வேண்டும்?',
    demoUserQuery: 'என் பயிர் இலைகள் மஞ்சளாக மாறுகின்றன',
    demoAiResponse: 'மண்டலம் B இல் நைட்ரஜன் குறைபாடு கண்டறியப்பட்டுள்ளது. நாளை காலை 7 மணிக்கு 2% திரவ நானோ யூரியா தெளிக்கவும்.',
  },
  te: {
    name: 'Telugu',
    nativeName: 'తెలుగు',
    bcp47: 'te-IN',
    welcome: 'నమస్కారం! నేను అగ్రోమాన్ AI వాయిస్ అసిస్టెంట్. మీ పొలం కోసం నేను ఏమి సహాయం చేయగలను?',
    demoUserQuery: 'నా పంట ఆకులు పసుపు రంగులోకి మారుతున్నాయి',
    demoAiResponse: 'జోన్ B లో నైట్రోజన్ లోపం గుర్తించబడింది. రేపు ఉదయం 7 గంటలకు 2% లిక్విడ్ నానో యూరియా పిచికారీ చేయండి.',
  },
  kn: {
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    bcp47: 'kn-IN',
    welcome: 'ನಮಸ್ಕಾರ! ನಾನು ಅಗ್ರೋಮ್ಯಾನ್ AI ಧ್ವನಿ ಸಹಾಯಕ. ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಇಂದು ಏನು ಸಹಾಯ ಬೇಕು?',
    demoUserQuery: 'ನನ್ನ ಬೆಳೆಯ ಎಲೆಗಳು ಹಳದಿಯಾಗುತ್ತಿವೆ',
    demoAiResponse: 'ವಲಯ B ಯಲ್ಲಿ ಸಾರಜನಕದ ಕೊರತೆ ಕಂಡುಬಂದಿದೆ. ನಾಳೆ ಬೆಳಿಗ್ಗೆ 7 ಗಂಟೆಗೆ 2% ದ್ರವ ನ್ಯಾನೋ ಯೂರಿಯಾವನ್ನು ಸಿಂಪಡಿಸಿ.',
  },
  mr: {
    name: 'Marathi',
    nativeName: 'मराठी',
    bcp47: 'mr-IN',
    welcome: 'नमस्कार! मी ग्रोमॅन AI व्हॉइस असिस्टंट आहे. आज तुमच्या शेतासाठी मी काय मदत करू शकतो?',
    demoUserQuery: 'माझ्या पिकाची पाने पिवळी पडत आहेत',
    demoAiResponse: 'झोन B मध्ये नत्राची (नायट्रोजन) कमतरता आढळली आहे. उद्या सकाळी ७ वाजता २% लिक्विड नॅनो युरिया फवारा.',
  },
  bn: {
    name: 'Bengali',
    nativeName: 'বাংলা',
    bcp47: 'bn-IN',
    welcome: 'নমস্কার! আমি অ্যাগ্রোম্যান এআই ভয়েস সহকারী। আজ আপনার খামারের জন্য কীভাবে সাহায্য করতে পারি?',
    demoUserQuery: 'আমার ফসলের পাতা হলুদ হয়ে যাচ্ছে',
    demoAiResponse: 'জোন B-তে নাইট্রোজেনের ঘাটতি চিহ্নিত হয়েছে। আগামীকাল সকাল ৭টায় ২% তরল ন্যানো ইউরিয়া স্প্রে করুন।',
  },
};

export const AIVoiceAssistant: React.FC<AIVoiceAssistantProps> = ({
  isOpen,
  onClose,
  language = 'en',
  onLanguageChange,
}) => {
  const [currentLang, setCurrentLang] = useState<Language>(language);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [inputQuery, setInputQuery] = useState('');
  
  // TTS State
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Hardware/Capability State
  const [hasSpeechRecognition, setHasSpeechRecognition] = useState(true);
  const [hasSpeechSynthesis, setHasSpeechSynthesis] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDemoActive, setIsDemoActive] = useState(false);

  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize messages with welcome text in selected language
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'ai',
      text: VOICE_LANGUAGES[language]?.welcome || VOICE_LANGUAGES.en.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
    },
  ]);

  // Sync language prop
  useEffect(() => {
    setCurrentLang(language);
  }, [language]);

  // Check browser API capabilities
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setHasSpeechRecognition(!!SpeechRecognition);
    setHasSpeechSynthesis('speechSynthesis' in window);
  }, []);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, interimTranscript, isOpen]);

  // Cleanup speech synthesis on unmount / close
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

  if (!isOpen) return null;

  const currentLangConfig = VOICE_LANGUAGES[currentLang] || VOICE_LANGUAGES.en;

  // Change Language
  const handleSelectLanguage = (newLang: Language) => {
    setCurrentLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
    // Stop ongoing speech
    stopSpeech();

    // Add greeting for new language
    const langConfig = VOICE_LANGUAGES[newLang] || VOICE_LANGUAGES.en;
    const newWelcomeMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'ai',
      text: langConfig.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: newLang,
    };
    setMessages((prev) => [...prev, newWelcomeMsg]);
  };

  // ----------------------------------------------------
  // SPEECH SYNTHESIS (TEXT TO SPEECH)
  // ----------------------------------------------------
  const speakMessage = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) {
      setErrorMessage('Speech synthesis is not supported in this browser.');
      return;
    }

    // If currently speaking this message, toggle pause/play
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

    // Stop any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLangConfig.bcp47;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick voice if available
    const voices = window.speechSynthesis.getVoices();
    const langCodePrefix = currentLangConfig.bcp47.split('-')[0];
    const match = voices.find((v) => v.lang.toLowerCase().startsWith(langCodePrefix));
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

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
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

  // ----------------------------------------------------
  // SPEECH RECOGNITION (VOICE INPUT)
  // ----------------------------------------------------
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
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLangConfig.bcp47;

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
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions in browser.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No speech was detected. Please try speaking into your microphone again.');
        } else {
          setErrorMessage(`Speech recognition notice: ${event.error}. You can still type your query below.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (interimTranscript.trim()) {
          const spokenText = interimTranscript.trim();
          setInterimTranscript('');
          handleSendQuery(spokenText);
        }
      };

      recognition.start();
    } catch (err: any) {
      console.error('Recognition start exception:', err);
      setIsListening(false);
      setErrorMessage('Could not initialize microphone. Please check permissions.');
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
      const textToSend = interimTranscript.trim();
      setInterimTranscript('');
      handleSendQuery(textToSend);
    }
  };

  // ----------------------------------------------------
  // SEND QUERY & GENERATE AI RESPONSE
  // ----------------------------------------------------
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

    // Generate intelligent response in selected language
    setTimeout(() => {
      const aiResponseText = getAIResponseText(queryText, currentLang);
      const aiMsgId = (Date.now() + 1).toString();

      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLang,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Automatically speak AI response
      setTimeout(() => {
        speakMessage(aiResponseText, aiMsgId);
      }, 300);
    }, 700);
  };

  // ----------------------------------------------------
  // DEMO MODE ("Start Voice Demo")
  // ----------------------------------------------------
  const handleStartVoiceDemo = () => {
    setIsDemoActive(true);
    setErrorMessage(null);
    stopSpeech();

    const langData = currentLangConfig;

    // Step 1: User Voice Input Simulation
    const userMsgId = Date.now().toString();
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: langData.demoUserQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Step 2: Show listening / processing animation
    setIsListening(true);
    setInterimTranscript(langData.demoUserQuery);

    setTimeout(() => {
      setIsListening(false);
      setInterimTranscript('');

      // Step 3: AI Response
      const aiMsgId = (Date.now() + 1).toString();
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: langData.demoAiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLang,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsDemoActive(false);

      // Step 4: Convert AI Response into Speech and play!
      setTimeout(() => {
        speakMessage(langData.demoAiResponse, aiMsgId);
      }, 300);
    }, 2000);
  };

  // Helper dictionary for contextual multilingual answers
  const getAIResponseText = (queryText: string, lang: Language): string => {
    const q = queryText.toLowerCase();

    if (q.includes('yellow') || q.includes('nitrogen') || q.includes('मഞ്ഞ') || q.includes('पीली') || q.includes('மஞ்சள்') || q.includes('పసుపు') || q.includes('ಹಳದಿ') || q.includes('पिवळी') || q.includes('হলুদ')) {
      return VOICE_LANGUAGES[lang]?.demoAiResponse || VOICE_LANGUAGES.en.demoAiResponse;
    }

    if (q.includes('irrigate') || q.includes('water') || q.includes('നന') || q.includes('सिंचाई') || q.includes('பாசனம்') || q.includes('సేద్యం') || q.includes('ನೀರಾವರಿ') || q.includes('सिंचन') || q.includes('সেচ')) {
      const resp: Record<Language, string> = {
        en: 'ESP32 sensors show soil moisture at 21.4% in Paddy Block 2. Triggering Drip Irrigation tomorrow at 05:30 AM for 28 minutes will save 12,400 Liters of water!',
        ml: 'പാകം ബ്ലോക്ക് 2 ലെ ഈർപ്പം 21.4% ആണ്. നാളെ രാവിലെ 5:30 ന് 28 മിനിറ്റ് തുള്ളിനന നൽകുക.',
        hi: 'पैडी ब्लॉक 2 में मिट्टी की नमी 21.4% है। कल सुबह 5:30 बजे ड्रिप सिंचाई शुरू करने से 12,400 लीटर पानी बचेगा।',
        ta: 'மண் ஈரம் 21.4% ஆக உள்ளது. நாளை காலை 5:30 மணிக்கு சொட்டு நீர் பாசனம் செய்யவும்.',
        te: 'నేల తేమ 21.4% ఉంది. రేపు ఉదయం 5:30కి డ్రిప్ సేద్యం చేయండి.',
        kn: 'ಮಣ್ಣಿನ ತೇವಾಂಶ 21.4% ಆಗಿದೆ. ನಾಳೆ ಬೆಳಿಗ್ಗೆ 5:30 ಕ್ಕೆ ಹನಿ ನೀರಾವರಿ ಮಾಡಿ.',
        mr: 'मातीतील ओलावा २१.४% आहे. उद्या सकाळी ५:३० वाजता ठिबक सिंचन करा.',
        bn: 'মাটির আর্দ্রতা ২১.৪%। আগামীকাল সকাল ৫:৩০ টায় ড্রিপ সেচ দিন।',
      };
      return resp[lang] || resp.en;
    }

    if (q.includes('yield') || q.includes('harvest') || q.includes('വിളവ്') || q.includes('उपज') || q.includes('மகசூல்') || q.includes('దిగుబడి') || q.includes('ಇಳುವರಿ') || q.includes('उत्पादन') || q.includes('ফলন')) {
      const resp: Record<Language, string> = {
        en: 'Yield prediction for Kuttanad Paddy Estate is 24.2 Tons (+18% above regional average). Estimated market revenue is ₹2.17 Lakhs.',
        ml: 'പ്രതീക്ഷിക്കുന്ന വിളവ് 24.2 ടൺ ആണ്. ലഭിക്കുന്ന വരുമാനം ഏകദേശം ₹2.17 ലക്ഷം രൂപ ആണ്.',
        hi: 'अनुमानित उपज 24.2 टन है। आपकी अनुमानित आय ₹2.17 लाख होगी।',
        ta: 'எதிர்பார்க்கப்படும் மகசூல் 24.2 டன்கள். மதிப்பிடப்பட்ட வருமானம் ₹2.17 லட்சம்.',
        te: 'అంచనా దిగుబడి 24.2 టన్నులు. అంచనా ఆదాయం ₹2.17 లక్షలు.',
        kn: 'ನಿರೀಕ್ಷಿತ ಇಳುವರಿ 24.2 ಟನ್ ಆಗಿದೆ. ಅಂದಾಜು ಆದಾಯ ₹2.17 ಲಕ್ಷ.',
        mr: 'अपेक्षित उत्पादन २४.२ टन आहे. अंदाजे उत्पन्न ₹२.१७ लाख असेल.',
        bn: 'প্রত্যাশিত ফলন ২৪.২ টন। আনুমানিক আয় ₹২.১৭ লাখ।',
      };
      return resp[lang] || resp.en;
    }

    // Default response
    const defaultResp: Record<Language, string> = {
      en: 'AGROMAN Neural AI suggests applying Trichoderma Viride bio-fungicide combined with Neem Oil emulsion for sustainable crop protection.',
      ml: 'അഗ്രോമാൻ എഐ നിർദ്ദേശം: വേപ്പെണ്ണ ലായനിയും ജൈവ കീടനാശിനിയും തളിക്കുക.',
      hi: 'एग्रोमैन एआई सुझाव: जैविक नीम तेल और कवकनाशी का उपयोग करें।',
      ta: 'அக்ரோமேன் AI பரிந்துரை: வேப்பெண்ணெய் கரைசல் தெளிக்கவும்.',
      te: 'అగ్రోమాన్ AI సూచన: వేప నూనె మిశ్రమాన్ని పిచికారీ చేయండి.',
      kn: 'ಅಗ್ರೋಮ್ಯಾನ್ AI ಸಲಹೆ: ಬೇಪಿನ ಎಣ್ಣೆ ಮಿಶ್ರಣವನ್ನು ಸಿಂಪಡಿಸಿ.',
      mr: 'अग्रोमॅन AI सल्ला: कडुनिंब तेल द्रावण फवारा.',
      bn: 'অ্যাগ্রোম্যান এআই পরামর্শ: নিম তেলের মিশ্রণ স্প্রে করুন।',
    };
    return defaultResp[lang] || defaultResp.en;
  };

  const presets = [
    'My crop leaves are turning yellow',
    'When should I irrigate field B?',
    'Predict harvest yield for paddy',
    'Recommend organic pesticide',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <div className="relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl border border-emerald-100 overflow-hidden z-10 flex flex-col h-[620px] max-h-[92vh] animate-in zoom-in-95 duration-200 font-sans">
        
        {/* HEADER */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-950 text-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8CE854] text-slate-950 flex items-center justify-center font-black shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-white">AGROMAN Voice AI</h3>
                <span className="bg-[#8CE854] text-slate-950 text-[9px] font-extrabold font-mono px-2 py-0.5 rounded-full">
                  LIVE SPEECH
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium">Multilingual Neural Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative flex items-center gap-1 bg-black/40 border border-emerald-500/40 px-2.5 py-1 rounded-xl text-xs font-bold text-white">
              <Globe className="w-3.5 h-3.5 text-[#8CE854]" />
              <select
                value={currentLang}
                onChange={(e) => handleSelectLanguage(e.target.value as Language)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer pr-1"
              >
                {(Object.keys(VOICE_LANGUAGES) as Language[]).map((key) => (
                  <option key={key} value={key} className="bg-slate-900 text-white">
                    {VOICE_LANGUAGES[key].nativeName} ({VOICE_LANGUAGES[key].name})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Close Voice Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DEMO MODE HEADER BAR */}
        <div className="bg-emerald-950 text-emerald-100 px-4 py-2 flex items-center justify-between text-xs border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8CE854]" />
            <span className="font-bold text-white">Interactive Voice Demo Mode:</span>
          </div>

          <button
            onClick={handleStartVoiceDemo}
            disabled={isDemoActive}
            className="flex items-center gap-1.5 bg-[#8CE854] hover:bg-[#78d641] disabled:opacity-50 text-slate-950 px-3 py-1 rounded-full text-xs font-black shadow-sm transition-all shrink-0"
          >
            <Play className="w-3 h-3 fill-slate-950" />
            <span>{isDemoActive ? 'Simulating Voice...' : 'Start Voice Demo'}</span>
          </button>
        </div>

        {/* ERROR / FALLBACK NOTIFICATION */}
        {errorMessage && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{errorMessage}</p>
            </div>
            <button onClick={() => setErrorMessage(null)} className="text-amber-700 font-bold">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ACTIVE AUDIO WAVEFORM / LISTENING HUD BAR */}
        {(isListening || activeSpeakingMsgId) && (
          <div className="bg-slate-950 text-[#8CE854] px-4 py-2.5 flex items-center justify-between text-xs font-mono border-b border-emerald-800 shadow-inner">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold text-white">
                {isListening
                  ? `Listening (${currentLangConfig.name})...`
                  : isPaused
                  ? 'Voice Speech Paused'
                  : 'AI Speaking Response...'}
              </span>
            </div>

            {/* Bouncing Equalizer Waveform */}
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

        {/* CHAT MESSAGES FEED */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-emerald-50/20">
          {messages.map((msg) => {
            const isSpeakingThis = activeSpeakingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 text-xs font-black shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-900 text-white'
                      : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-emerald-800" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm transition-all ${
                    msg.sender === 'user'
                      ? 'bg-emerald-900 text-white rounded-tr-none font-medium'
                      : 'bg-white text-slate-800 border border-emerald-100 rounded-tl-none font-medium'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  <div className="mt-2.5 pt-2 border-t border-emerald-100/30 flex items-center justify-between text-[10px] opacity-90">
                    <span className="font-mono">{msg.timestamp}</span>

                    {/* TTS PLAY / PAUSE / STOP BUTTONS FOR AI MESSAGES */}
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => speakMessage(msg.text, msg.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                            isSpeakingThis
                              ? 'bg-[#8CE854] text-slate-950 font-black shadow-sm'
                              : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                          }`}
                          title={isSpeakingThis ? (isPaused ? 'Resume Voice' : 'Pause Voice') : 'Play Voice Reply'}
                        >
                          {isSpeakingThis ? (
                            isPaused ? (
                              <>
                                <Play className="w-3 h-3 fill-slate-950" />
                                <span>Resume</span>
                              </>
                            ) : (
                              <>
                                <Pause className="w-3 h-3 fill-slate-950" />
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
                            className="p-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                            title="Stop Audio"
                          >
                            <Square className="w-3 h-3 fill-red-700" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* LIVE TRANSCRIPT BUBBLE WHILE LISTENING */}
          {isListening && interimTranscript && (
            <div className="flex items-start gap-3 flex-row-reverse animate-pulse">
              <div className="w-8 h-8 rounded-2xl bg-red-500 text-white flex items-center justify-center shrink-0 text-xs font-black">
                <User className="w-4 h-4" />
              </div>
              <div className="max-w-[80%] p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs font-mono font-bold rounded-tr-none">
                <span className="text-[10px] text-red-600 block uppercase mb-1">Live Transcribing...</span>
                "{interimTranscript}"
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* QUICK PRESETS ROW */}
        <div className="p-2.5 bg-white border-t border-emerald-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(preset)}
              className="shrink-0 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-200/80 transition-all"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* CONTROLS & INPUT BAR */}
        <div className="p-3.5 bg-white border-t border-emerald-100 flex items-center gap-2.5 shrink-0">
          {/* GREEN GLOWING MICROPHONE BUTTON */}
          <button
            onClick={isListening ? stopVoiceRecording : startVoiceRecording}
            className={`relative p-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0 ${
              isListening
                ? 'bg-red-600 text-white ring-4 ring-red-300 animate-pulse'
                : 'bg-[#8CE854] text-slate-950 hover:bg-[#78d641] shadow-[#8CE854]/40 hover:scale-105 active:scale-95'
            }`}
            title={isListening ? 'Stop Voice Recording' : 'Speak to AGROMAN Voice AI'}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Mic className="w-5 h-5 stroke-[2.5] text-slate-950" />
            )}

            {!isListening && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CE854] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
              </span>
            )}
          </button>

          {/* TEXT INPUT */}
          <input
            type="text"
            placeholder={`Ask AGROMAN AI in ${currentLangConfig.name}...`}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSendQuery(inputQuery) : null)}
            className="flex-1 bg-slate-50 border border-emerald-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 font-medium outline-none focus:border-emerald-600 focus:bg-white transition-all"
          />

          {/* SEND BUTTON */}
          <button
            onClick={() => handleSendQuery(inputQuery)}
            disabled={!inputQuery.trim()}
            className="p-3.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white rounded-2xl transition-all shadow-xs shrink-0"
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

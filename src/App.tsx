/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, Language, NotificationItem } from './types';
import {
  TEAM_MEMBERS,
  INITIAL_FARMS,
  INITIAL_DRONES,
  INITIAL_SENSORS,
  NOTIFICATIONS,
} from './data/mockData';

// Layout & Overlays
import { DemoBanner } from './components/layout/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { CommandPalette } from './components/layout/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';
import { SplashScreen } from './components/common/SplashScreen';
import { AIVoiceAssistant } from './components/common/AIVoiceAssistant';
import { FloatingVoiceButton } from './components/common/FloatingVoiceButton';
import { PitchModal } from './components/common/PitchModal';
import { AutonomousDemoPlayer } from './components/common/AutonomousDemoPlayer';

// Modules
import { LandingPage } from './components/modules/LandingPage';
import { Dashboard } from './components/modules/Dashboard';
import { DigitalFarmTwin } from './components/modules/DigitalFarmTwin';
import { PrecisionSpraying } from './components/modules/PrecisionSpraying';
import { NitrogenIntelligence } from './components/modules/NitrogenIntelligence';
import { YieldPrediction } from './components/modules/YieldPrediction';
import { Marketplace } from './components/modules/Marketplace';
import { WildlifeProtection } from './components/modules/WildlifeProtection';
import { FarmManagement } from './components/modules/FarmManagement';
import { DroneControlCenter } from './components/modules/DroneControlCenter';
import { LiveDroneCamera } from './components/modules/LiveDroneCamera';
import { IoTSensorDashboard } from './components/modules/IoTSensorDashboard';
import { AICropScanner } from './components/modules/AICropScanner';
import { AIDecisionEngine } from './components/modules/AIDecisionEngine';
import { SmartIrrigation } from './components/modules/SmartIrrigation';
import { PestPrediction } from './components/modules/PestPrediction';
import { WeatherIntelligence } from './components/modules/WeatherIntelligence';
import { AIAssistantModule } from './components/modules/AIAssistantModule';
import { SmartFarmMap } from './components/modules/SmartFarmMap';
import { Analytics } from './components/modules/Analytics';
import { Reports } from './components/modules/Reports';
import { NotificationCenter } from './components/modules/NotificationCenter';
import { FarmerProfile } from './components/modules/FarmerProfile';
import { MissionScheduler } from './components/modules/MissionScheduler';
import { TechStack } from './components/modules/TechStack';
import { SystemWorkflow } from './components/modules/SystemWorkflow';
import { AboutSIH } from './components/modules/AboutSIH';
import { Settings } from './components/modules/Settings';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [toastToasts, setToastToasts] = useState<NotificationItem[]>([]);

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [isAutonomousDemoOpen, setIsAutonomousDemoOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleDismissToast = (id: string) => {
    setToastToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleTriggerIrrigationToast = () => {
    const newToast: NotificationItem = {
      id: Date.now().toString(),
      title: 'Irrigation Activated',
      message: 'Solenoid Valve #2 opened. Water flow rate: 48.5 L/min.',
      timestamp: 'Just now',
      type: 'success',
      read: false,
      category: 'Irrigation',
    };
    setToastToasts((prev) => [newToast, ...prev]);
    setActiveTab('irrigation');
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#EEF7EE] text-slate-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Prototype Demo Banner */}
      <DemoBanner
        onOpenSIHModal={() => setIsPitchModalOpen(true)}
        onStartAutonomousDemo={() => setIsAutonomousDemoOpen(true)}
      />

      {/* Main Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        unreadNotifications={unreadCount}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
        onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      {/* Primary Layout Body */}
      <div className="flex-1 flex max-w-[1800px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 gap-4 lg:gap-6 overflow-x-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />

        {/* View Content Stage */}
        <main className="flex-1 min-w-0 pb-20 lg:pb-8 w-full">
          {activeTab === 'landing' && (
            <LandingPage
              setActiveTab={setActiveTab}
              teamMembers={TEAM_MEMBERS}
              onOpenPitchModal={() => setIsPitchModalOpen(true)}
            />
          )}

          {activeTab === 'digital_twin' && <DigitalFarmTwin />}

          {activeTab === 'precision_spraying' && <PrecisionSpraying />}

          {activeTab === 'nitrogen' && <NitrogenIntelligence />}

          {activeTab === 'yield_prediction' && <YieldPrediction />}

          {activeTab === 'marketplace' && <Marketplace />}

          {activeTab === 'wildlife' && <WildlifeProtection />}

          {activeTab === 'dashboard' && (
            <Dashboard
              farms={INITIAL_FARMS}
              drones={INITIAL_DRONES}
              sensors={INITIAL_SENSORS}
              setActiveTab={setActiveTab}
              onTriggerIrrigation={handleTriggerIrrigationToast}
            />
          )}

          {activeTab === 'farms' && <FarmManagement farms={INITIAL_FARMS} />}

          {activeTab === 'drone' && (
            <DroneControlCenter drones={INITIAL_DRONES} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'live_camera' && <LiveDroneCamera />}

          {activeTab === 'iot' && <IoTSensorDashboard sensors={INITIAL_SENSORS} />}

          {activeTab === 'scanner' && <AICropScanner />}

          {activeTab === 'decision' && <AIDecisionEngine />}

          {activeTab === 'irrigation' && (
            <SmartIrrigation onTriggerIrrigation={handleTriggerIrrigationToast} />
          )}

          {activeTab === 'pest' && <PestPrediction />}

          {activeTab === 'assistant' && (
            <AIAssistantModule language={language} setLanguage={setLanguage} />
          )}

          {activeTab === 'weather' && <WeatherIntelligence />}

          {activeTab === 'map' && <SmartFarmMap />}

          {activeTab === 'analytics' && <Analytics />}

          {activeTab === 'reports' && <Reports />}

          {activeTab === 'notifications' && (
            <NotificationCenter
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}

          {activeTab === 'profile' && (
            <FarmerProfile
              teamMembers={TEAM_MEMBERS}
              language={language}
              setLanguage={setLanguage}
            />
          )}

          {activeTab === 'scheduler' && <MissionScheduler />}

          {activeTab === 'tech_stack' && <TechStack />}

          {activeTab === 'workflow' && <SystemWorkflow />}

          {activeTab === 'about' && <AboutSIH teamMembers={TEAM_MEMBERS} />}

          {activeTab === 'settings' && (
            <Settings language={language} setLanguage={setLanguage} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white py-6 px-4 text-center text-xs text-emerald-900/80 space-y-1 hidden sm:block">
        <p className="font-bold">
          Developed by <strong>Team AGROMAN</strong> — Smart India Hackathon 2026
        </p>
        <p className="text-[11px] text-gray-500">
          Annamol A Abraham • Amith U Pillai • Josh Abraham Jacob • Nikhil Suresh • Arjun S • Abhijith A
        </p>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMobileMenu={() => setMobileSidebarOpen(true)}
      />

      {/* Overlays & Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        setActiveTab={setActiveTab}
      />

      <AIVoiceAssistant
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
      />

      <FloatingVoiceButton
        isOpen={isVoiceAssistantOpen}
        onOpen={() => setIsVoiceAssistantOpen(true)}
      />

      <AutonomousDemoPlayer
        isOpen={isAutonomousDemoOpen}
        onClose={() => setIsAutonomousDemoOpen(false)}
        setActiveTab={setActiveTab}
      />

      <PitchModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
        teamMembers={TEAM_MEMBERS}
      />

      <ToastContainer toasts={toastToasts} onDismiss={handleDismissToast} />
    </div>
  );
}

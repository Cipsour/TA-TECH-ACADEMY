import React, { useState } from 'react';
import { UserRole } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { CourseCatalog } from './components/CourseCatalog';
import { StudentProjects } from './components/StudentProjects';
import { AiAssistant } from './components/AiAssistant';
import { AboutUs } from './components/AboutUs';
import { FaqSection } from './components/FaqSection';
import { LmsPortal } from './components/LmsPortal';
import { AdminCrm } from './components/AdminCrm';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';

export const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('VISITOR');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [registerCourseName, setRegisterCourseName] = useState<string | undefined>(undefined);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_mode');
    return saved ? saved === 'dark' : true;
  });

  const handleToggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme_mode', newMode ? 'dark' : 'light');
  };

  const handleOpenRegisterModal = (courseName?: string) => {
    setRegisterCourseName(courseName);
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
    setRegisterCourseName(undefined);
  };

  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={`min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900 light-mode'
      }`}
    >
      
      {/* Main Responsive Header */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        onOpenRegisterModal={handleOpenRegisterModal}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Dynamic View Switching */}
      <main>
        {activeRole === 'STUDENT' ? (
          <LmsPortal />
        ) : activeRole === 'ADMIN' ? (
          <AdminCrm />
        ) : (
          <div>
            {activeTab === 'home' && (
              <>
                <Hero 
                  onOpenRegisterModal={handleOpenRegisterModal} 
                  onNavigateRoadmap={() => handleNavigateTab('roadmap')} 
                />
                <WhyChooseUs onOpenRegisterModal={() => handleOpenRegisterModal()} />
                <CourseCatalog onOpenRegisterModal={handleOpenRegisterModal} />
                <RoadmapTimeline onOpenRegisterModal={handleOpenRegisterModal} />
                <StudentProjects />
                <AboutUs onOpenRegisterModal={() => handleOpenRegisterModal()} />
                <AiAssistant onOpenRegisterModal={handleOpenRegisterModal} />
                <FaqSection onOpenRegisterModal={() => handleOpenRegisterModal()} />
              </>
            )}

            {activeTab === 'courses' && (
              <CourseCatalog onOpenRegisterModal={handleOpenRegisterModal} />
            )}

            {activeTab === 'about' && (
              <AboutUs onOpenRegisterModal={() => handleOpenRegisterModal()} />
            )}

            {activeTab === 'roadmap' && (
              <RoadmapTimeline onOpenRegisterModal={handleOpenRegisterModal} />
            )}

            {activeTab === 'projects' && (
              <StudentProjects />
            )}

            {activeTab === 'ai-center' && (
              <AiAssistant onOpenRegisterModal={handleOpenRegisterModal} />
            )}

            {activeTab === 'faq' && (
              <FaqSection onOpenRegisterModal={() => handleOpenRegisterModal()} />
            )}

            {activeTab === 'architecture' && (
              <ArchitectureViewer />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigateTab={handleNavigateTab} 
        onOpenRegisterModal={() => handleOpenRegisterModal()} 
      />

      {/* Course Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        preselectedCourse={registerCourseName}
      />

    </div>
  );
};

export default App;

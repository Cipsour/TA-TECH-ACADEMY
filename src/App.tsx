import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { WorkflowSection } from './components/WorkflowSection';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { CourseCatalog } from './components/CourseCatalog';
import { StudentProjects } from './components/StudentProjects';
import { AiAssistant } from './components/AiAssistant';
import { AboutUs } from './components/AboutUs';
import { FaqSection } from './components/FaqSection';
import { LmsPortal } from './components/LmsPortal';
import { AdminCrm } from './components/AdminCrm';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { BookingModal } from './components/BookingModal';
import { LoginModal } from './components/LoginModal';
import { AuthProvider, useAuth } from './context/AuthContext';

const MainLayout: React.FC = () => {
  const { user, isLoginModalOpen, closeLoginModal } = useAuth();
  const [activeRole, setActiveRole] = useState<UserRole>('VISITOR');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [registerCourseName, setRegisterCourseName] = useState<string | undefined>(undefined);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_mode');
    return saved ? saved === 'dark' : true;
  });

  // Tự động chuyển về vai trò VISITOR nếu tài khoản đăng xuất
  useEffect(() => {
    if (!user && (activeRole === 'ADMIN' || activeRole === 'STUDENT')) {
      setActiveRole('VISITOR');
      setActiveTab('home');
    }
  }, [user, activeRole]);

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

  const handleOpenBookingModal = (courseName?: string) => {
    setRegisterCourseName(courseName);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role: 'ADMIN' | 'STUDENT') => {
    if (role === 'ADMIN') {
      setActiveRole('ADMIN');
      setActiveTab('admin');
    } else {
      setActiveRole('STUDENT');
      setActiveTab('lms');
    }
  };

  return (
    <div 
      className={`min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900 light-mode'
      }`}
    >
      {/* Header Điều Hướng Toàn Cục */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        onOpenRegisterModal={handleOpenRegisterModal}
        onOpenBookingModal={handleOpenBookingModal}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Chuyển Đổi Phân Hệ Theo Vai Trò */}
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
                  onOpenBookingModal={handleOpenBookingModal}
                  onNavigateRoadmap={() => handleNavigateTab('roadmap')} 
                />
                <WhyChooseUs onOpenRegisterModal={() => handleOpenRegisterModal()} />
                <WorkflowSection onOpenRegisterModal={handleOpenRegisterModal} />
                <CourseCatalog onOpenRegisterModal={handleOpenRegisterModal} />
                <RoadmapTimeline onOpenRegisterModal={handleOpenRegisterModal} />
                <StudentProjects />
                <AboutUs onOpenRegisterModal={() => handleOpenRegisterModal()} />
                <AiAssistant onOpenRegisterModal={handleOpenRegisterModal} />
                <FaqSection onOpenRegisterModal={() => handleOpenRegisterModal()} />
              </>
            )}

            {activeTab === 'workflow' && (
              <WorkflowSection onOpenRegisterModal={handleOpenRegisterModal} />
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
          </div>
        )}
      </main>

      {/* Footer Chân Trang */}
      <Footer 
        onNavigateTab={handleNavigateTab} 
        onOpenRegisterModal={() => handleOpenRegisterModal()} 
      />

      {/* Modal Đăng Ký Khóa Học Tuyển Sinh */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        preselectedCourse={registerCourseName}
      />

      {/* Modal Đặt Lịch Đánh Giá Năng Lực 1-1 */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        initialCourse={registerCourseName}
      />

      {/* Modal Đăng Nhập Đa Vai Trò (Admin & Học Viên) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

export default App;

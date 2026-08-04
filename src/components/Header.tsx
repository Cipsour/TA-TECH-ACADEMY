import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  MapPin, 
  GraduationCap, 
  User, 
  LayoutDashboard, 
  Menu, 
  X, 
  PhoneCall, 
  ChevronDown,
  Layers,
  Code,
  Sun,
  Moon
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegisterModal: (courseName?: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  onOpenRegisterModal,
  isDarkMode,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: BookOpen },
    { id: 'courses', label: 'Khóa học', icon: GraduationCap },
    { id: 'about', label: 'Giới thiệu', icon: Layers },
    { id: 'roadmap', label: 'Lộ trình', icon: MapPin },
    { id: 'projects', label: 'Sản phẩm', icon: Code },
    { id: 'ai-center', label: 'Tư vấn AI', icon: Sparkles },
    { id: 'faq', label: 'Trợ giúp & FAQ', icon: User },
    { id: 'architecture', label: 'Kiến trúc', icon: Layers },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 text-xs py-1.5 px-4 text-center font-medium text-white flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
        <span>Tuyển sinh Kỳ Hè: Đánh giá Năng lực AI Miễn phí & Ưu đãi 20% Học phí cho Học sinh Cấp 1, 2, 3!</span>
        <button 
          onClick={() => onOpenRegisterModal("Đánh giá Năng lực & Nhận Học bổng")} 
          className="underline hover:text-amber-200 ml-2 font-semibold cursor-pointer"
        >
          Nhận Ưu Đãi &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                TA TECH ACADEMY
              </div>
              <div className="text-[9px] tracking-widest text-cyan-400 uppercase font-semibold">
                Technology & AI Education
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/50 p-1 rounded-full border border-slate-700/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Theme Switcher & Role Switcher */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            
            {/* Direct Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={isDarkMode ? "Chuyển sang Chế độ Sáng" : "Chuyển sang Chế độ Tối"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-semibold text-slate-100">Chế độ Sáng</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px] font-semibold text-slate-100">Chế độ Tối</span>
                </>
              )}
            </button>

            {/* Role Portal Toggle */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs text-slate-200 font-medium transition-all cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activeRole === 'ADMIN' ? 'bg-amber-400 animate-ping' :
                  activeRole === 'STUDENT' ? 'bg-emerald-400' : 'bg-blue-400'
                }`} />
                <span>
                  {activeRole === 'VISITOR' && 'Chế độ Khách'}
                  {activeRole === 'STUDENT' && 'LMS Học viên'}
                  {activeRole === 'ADMIN' && 'CRM Quản trị'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 text-xs space-y-1">
                  <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Chuyển đổi Phân hệ Hệ thống
                  </div>
                  
                  <button
                    onClick={() => {
                      setActiveRole('VISITOR');
                      setActiveTab('home');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      activeRole === 'VISITOR' ? 'bg-blue-600/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <User className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="font-medium">Website Trung tâm</div>
                      <div className="text-[10px] text-slate-400">Xem khóa học & lộ trình</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveRole('STUDENT');
                      setActiveTab('lms');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      activeRole === 'STUDENT' ? 'bg-emerald-600/20 text-emerald-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-medium">Cổng LMS Học viên</div>
                      <div className="text-[10px] text-slate-400">Học trực tuyến & xem bài giảng</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveRole('ADMIN');
                      setActiveTab('admin');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      activeRole === 'ADMIN' ? 'bg-amber-600/20 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-medium">Cổng Quản trị CRM</div>
                      <div className="text-[10px] text-slate-400">Quản lý tư vấn & nhập học</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Register Button */}
            <button
              onClick={() => onOpenRegisterModal()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer transform active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Đăng Ký Học Thử</span>
            </button>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-800 text-amber-400 hover:text-white cursor-pointer flex items-center gap-1.5 text-xs font-semibold px-3"
              title="Chỉnh chế độ sáng/tối"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-100">Sáng</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-100">Tối</span>
                </>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-semibold px-1">Chuyển phân hệ</div>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => { setActiveRole('VISITOR'); setActiveTab('home'); setMobileMenuOpen(false); }}
                className={`px-2 py-1.5 rounded text-xs text-center border ${activeRole === 'VISITOR' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
              >
                Website
              </button>
              <button
                onClick={() => { setActiveRole('STUDENT'); setActiveTab('lms'); setMobileMenuOpen(false); }}
                className={`px-2 py-1.5 rounded text-xs text-center border ${activeRole === 'STUDENT' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
              >
                LMS Học viên
              </button>
              <button
                onClick={() => { setActiveRole('ADMIN'); setActiveTab('admin'); setMobileMenuOpen(false); }}
                className={`px-2 py-1.5 rounded text-xs text-center border ${activeRole === 'ADMIN' ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
              >
                CRM Quản trị
              </button>
            </div>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRegisterModal(); }}
              className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs text-center"
            >
              Đăng Ký Học Thử Miễn Phí
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

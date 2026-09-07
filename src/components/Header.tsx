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
  Moon,
  LogIn,
  LogOut,
  ShieldCheck,
  Lock,
  Zap
} from 'lucide-react';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';

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
    { id: 'workflow', label: 'Quy trình', icon: Zap },
    { id: 'courses', label: 'Khóa học', icon: GraduationCap },
    { id: 'roadmap', label: 'Lộ trình', icon: MapPin },
    { id: 'projects', label: 'Sản phẩm', icon: Code },
    { id: 'ai-center', label: 'Tư vấn AI', icon: Sparkles },
    { id: 'about', label: 'Giới thiệu', icon: Layers },
    { id: 'faq', label: 'Trợ giúp & FAQ', icon: User },
  ];

  const { user, logout, openLoginModal } = useAuth();

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const handleSelectRole = (targetRole: UserRole) => {
    setRoleDropdownOpen(false);
    if (targetRole === 'ADMIN') {
      if (!user || user.role !== 'ADMIN') {
        openLoginModal('ADMIN');
        return;
      }
      setActiveRole('ADMIN');
      setActiveTab('admin');
    } else if (targetRole === 'STUDENT') {
      if (!user) {
        openLoginModal('STUDENT');
        return;
      }
      setActiveRole('STUDENT');
      setActiveTab('lms');
    } else {
      setActiveRole('VISITOR');
      setActiveTab('home');
    }
  };

  const handleLogout = () => {
    logout();
    setActiveRole('VISITOR');
    setActiveTab('home');
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

          {/* Right Actions: Theme Switcher, Auth & Role Switcher */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            
            {/* Direct Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={isDarkMode ? "Chuyển sang Chế độ Sáng" : "Chuyển sang Chế độ Tối"}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-semibold text-slate-100">Sáng</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-semibold text-slate-100">Tối</span>
                </>
              )}
            </button>

            {/* Role Portal Toggle */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs text-slate-200 font-medium transition-all cursor-pointer"
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
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 text-xs space-y-1">
                  <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Chuyển đổi Phân hệ Hệ thống
                  </div>
                  
                  <button
                    onClick={() => handleSelectRole('VISITOR')}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
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
                    onClick={() => handleSelectRole('STUDENT')}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                      activeRole === 'STUDENT' ? 'bg-emerald-600/20 text-emerald-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-medium">Cổng LMS Học viên</div>
                        <div className="text-[10px] text-slate-400">Học trực tuyến & video</div>
                      </div>
                    </div>
                    {!user && <Lock className="w-3 h-3 text-slate-500" />}
                  </button>

                  <button
                    onClick={() => handleSelectRole('ADMIN')}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                      activeRole === 'ADMIN' ? 'bg-amber-600/20 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="font-medium">Cổng Quản trị CRM</div>
                        <div className="text-[10px] text-slate-400">Quản lý tư vấn tuyển sinh</div>
                      </div>
                    </div>
                    {(!user || user.role !== 'ADMIN') && <Lock className="w-3 h-3 text-amber-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* User Auth Profile / Login Button */}
            {user ? (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
                <div className="flex items-center gap-2 bg-slate-800/80 py-1 px-2 rounded-xl border border-slate-700/60">
                  <div className="w-6 h-6 rounded-lg overflow-hidden bg-blue-600 shrink-0">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 m-1 text-white" />
                    )}
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className="text-[11px] font-bold text-white leading-none truncate max-w-[100px]">{user.name}</div>
                    <div className="text-[9px] font-semibold text-cyan-400 uppercase mt-0.5">{user.role}</div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  title="Đăng xuất khỏi hệ thống"
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-950/60 border border-slate-700 hover:border-red-800/80 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openLoginModal()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold cursor-pointer transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                <span>Đăng Nhập</span>
              </button>
            )}

            {/* Quick Register Button */}
            <button
              onClick={() => onOpenRegisterModal()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer transform active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Đăng Ký</span>
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
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
              <span>Chuyển phân hệ</span>
              {user ? (
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Đăng xuất ({user.role})</span>
                </button>
              ) : (
                <button
                  onClick={() => { openLoginModal(); setMobileMenuOpen(false); }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Đăng nhập</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => { handleSelectRole('VISITOR'); setMobileMenuOpen(false); }}
                className={`px-2 py-1.5 rounded text-xs text-center border cursor-pointer ${activeRole === 'VISITOR' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
              >
                Website
              </button>
              <button
                onClick={() => { handleSelectRole('STUDENT'); setMobileMenuOpen(false); }}
                className={`px-2 py-1.5 rounded text-xs text-center border cursor-pointer flex items-center justify-center gap-1 ${activeRole === 'STUDENT' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
              >
                <span>LMS</span>
                {!user && <Lock className="w-2.5 h-2.5 text-slate-500" />}
              </button>
              <button
                onClick={() => { handleSelectRole('ADMIN'); setMobileMenuOpen(false); }}
                className={`px-2 py-1.5 rounded text-xs text-center border cursor-pointer flex items-center justify-center gap-1 ${activeRole === 'ADMIN' ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
              >
                <span>CRM</span>
                {(!user || user.role !== 'ADMIN') && <Lock className="w-2.5 h-2.5 text-amber-400" />}
              </button>
            </div>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRegisterModal(); }}
              className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs text-center cursor-pointer"
            >
              Đăng Ký Học Thử Miễn Phí
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

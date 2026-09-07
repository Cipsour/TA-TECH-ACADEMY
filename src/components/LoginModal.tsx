import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  AlertCircle,
  ArrowRight,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (role: 'ADMIN' | 'STUDENT') => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const { login, loginTargetRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'ADMIN' | 'STUDENT'>('ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loginTargetRole) {
      setActiveTab(loginTargetRole);
    }
    setError('');
  }, [loginTargetRole, isOpen]);

  if (!isOpen) return null;

  const handleQuickFill = (role: 'ADMIN' | 'STUDENT') => {
    setActiveTab(role);
    setError('');
    if (role === 'ADMIN') {
      setEmail('admin@tuananhtinhoc.info.vn');
      setPassword('Admin@123456');
    } else {
      setEmail('hocvien@tuananhtinhoc.info.vn');
      setPassword('Hocvien@123456');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng điền đầy đủ Email và Mật khẩu.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (onLoginSuccess) {
        onLoginSuccess(activeTab);
      }
      onClose();
    } else {
      setError(res.error || 'Đăng nhập thất bại.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/30 mb-3">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white">
            Đăng Nhập Hệ Thống
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Học viện Đào tạo Vật Lý & CNTT / AI - TA TECH
          </p>
        </div>

        {/* Role Select Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => handleQuickFill('ADMIN')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ADMIN'
                ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Quản Trị CRM</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill('STUDENT')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'STUDENT'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Học Viên LMS</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Địa Chỉ Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@tuananhtinhoc.info.vn"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder:text-slate-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Mật Khẩu Bảo Mật
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder:text-slate-600 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-white shadow-xl cursor-pointer transition-all ${
              activeTab === 'ADMIN'
                ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 hover:from-amber-500 shadow-amber-600/30'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 shadow-emerald-600/30'
            }`}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Xác Nhận Đăng Nhập {activeTab === 'ADMIN' ? 'Admin' : 'Học Viên'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoginModalOpen: boolean;
  loginTargetRole: 'ADMIN' | 'STUDENT' | null;
  openLoginModal: (targetRole?: 'ADMIN' | 'STUDENT') => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  isLoginModalOpen: false,
  loginTargetRole: null,
  openLoginModal: () => {},
  closeLoginModal: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('ta_auth_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginTargetRole, setLoginTargetRole] = useState<'ADMIN' | 'STUDENT' | null>(null);

  // Phục hồi phiên đăng nhập khi tải lại trang
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('ta_auth_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          setToken(storedToken);
        } else {
          localStorage.removeItem('ta_auth_token');
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        console.error("Lỗi xác thực phiên đăng nhập:", err);
        // Giữ lại token dự phòng nếu mất mạng tạm thời
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (data.success && data.token && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('ta_auth_token', data.token);
        setIsLoginModalOpen(false);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Đăng nhập không thành công.' };
      }
    } catch (err) {
      return { success: false, error: 'Không thể kết nối máy chủ xác thực.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('ta_auth_token');
    setUser(null);
    setToken(null);
  };

  const openLoginModal = (targetRole?: 'ADMIN' | 'STUDENT') => {
    setLoginTargetRole(targetRole || null);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginTargetRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        isLoginModalOpen,
        loginTargetRole,
        openLoginModal,
        closeLoginModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

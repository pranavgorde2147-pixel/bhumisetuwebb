import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { authAPI } from '../api/endpoints';

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sendOTP: (phone: string) => Promise<string>;
  login: (phone: string, sessionId: string, otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('bhumisetu_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = useCallback(async (phone: string) => {
    const res = await authAPI.sendOTP(phone);
    return res.data.data.sessionId;
  }, []);

  const login = useCallback(async (phone: string, sessionId: string, otp: string) => {
    setIsLoading(true);
    try {
      const res = await authAPI.verifyOTP(phone, sessionId, otp);
      const { token, user: userData } = res.data.data;
      localStorage.setItem('bhumisetu_token', token);
      localStorage.setItem('bhumisetu_user', JSON.stringify(userData));
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('bhumisetu_token');
    localStorage.removeItem('bhumisetu_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        sendOTP,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

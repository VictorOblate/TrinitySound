
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const storedAdmin = localStorage.getItem('admin_user');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Set the admin email in the session for RLS policies
      await supabase.rpc('set_config', {
        setting_name: 'app.current_admin_email',
        setting_value: email,
        is_local: true
      }).then(() => {
        // For demo purposes, we'll use a simple email/password check
        // In production, you'd want proper password hashing
        if (email === 'admin@trinitysound.com' && password === 'admin123') {
          const adminUser = { id: '1', email, name: 'Trinity Admin' };
          setAdmin(adminUser);
          localStorage.setItem('admin_user', JSON.stringify(adminUser));
          return { error: undefined };
        } else {
          return { error: 'Invalid credentials' };
        }
      });

      if (email === 'admin@trinitysound.com' && password === 'admin123') {
        const adminUser = { id: '1', email, name: 'Trinity Admin' };
        setAdmin(adminUser);
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        return { error: undefined };
      } else {
        return { error: 'Invalid credentials' };
      }
    } catch (error) {
      return { error: 'Login failed' };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_user');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { account } from './appwrite';
import { Models } from 'appwrite';

interface AuthContextProps {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<Models.Session>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        checkIfAdmin(currentUser);
      } catch (error) {
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const checkIfAdmin = (user: Models.User<Models.Preferences>) => {
    // Check if the user has isAdmin preference set to true
    if (user.prefs && user.labels.some(label => label === 'admin')) {
      setIsAdmin(true);
      return;
    }
    
    setIsAdmin(false);
  };

  const login = async (email: string, password: string) => {
    const session = await account.createEmailPasswordSession(email, password);
    const loggedInUser = await account.get();
    setUser(loggedInUser);
    checkIfAdmin(loggedInUser);
    return session;
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
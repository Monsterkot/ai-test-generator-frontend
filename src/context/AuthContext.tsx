import { createContext, useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loadUser: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const userData = await AuthService.register(name, email, password);
    setUser(userData);
    await loadUser();
  };

  const login = async (email: string, password: string) => {
    const userData = await AuthService.login(email, password);
    setUser(userData);
    await loadUser();
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async () => {
    setIsLoading(true); // Начало загрузки
    try {
      const userData = await UserService.getProfile();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false); // Завершение загрузки
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loadUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

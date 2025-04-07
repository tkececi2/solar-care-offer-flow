
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;
  plantDetails?: {
    capacity?: number;
    location?: string;
    panelCount?: number;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API'den kullanıcı bilgilerini alma simülasyonu
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Auth işlemleri
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Burada mock login simülasyonu
      if (email && password) {
        // Simüle edilmiş gecikme
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Test verileri için mocklanmış kullanıcı oluşturma
        const mockUser: User = {
          id: "1",
          email: email,
          name: email.split("@")[0],
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast.success("Giriş başarılı");
      } else {
        throw new Error("E-posta ve şifre gereklidir");
      }
    } catch (error) {
      toast.error("Giriş başarısız: " + (error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Burada mock register simülasyonu
      if (email && password && name) {
        // Simüle edilmiş gecikme
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Test verileri için mocklanmış kullanıcı oluşturma
        const mockUser: User = {
          id: Date.now().toString(),
          email: email,
          name: name,
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast.success("Kayıt başarılı");
      } else {
        throw new Error("Tüm alanlar doldurulmalıdır");
      }
    } catch (error) {
      toast.error("Kayıt başarısız: " + (error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Çıkış yapıldı");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profil güncellendi");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

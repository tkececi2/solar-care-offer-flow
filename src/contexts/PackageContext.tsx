
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PACKAGES } from "@/data/packageData";
import { useAuth } from "@/contexts/AuthContext";
import { useQuoteManager } from "@/hooks/useQuoteManager";
import { initEmailJS } from "@/utils/quoteNotifications";

export interface PackageFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  included: boolean;
  frequency?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  popular: boolean;
  features: PackageFeature[];
  images: string[];
  minCapacity?: number;
  maxCapacity?: number;
}

export interface QuoteDetails {
  packageId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  companyName?: string;
  plantCapacity: number;
  plantLocation?: string;
  panelCount?: number;
  additionalNotes?: string;
  totalPrice: number;
  quoteDate: Date;
  validUntil: Date;
  userId?: string;
}

interface PackageContextType {
  packages: ServicePackage[];
  selectedPackage: ServicePackage | null;
  quoteDetails: QuoteDetails | null;
  setSelectedPackage: (packageId: string | null) => void;
  createQuote: (details: Partial<QuoteDetails>) => void;
  clearQuote: () => void;
}

const PackageContext = createContext<PackageContextType | null>(null);

export const usePackage = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error("usePackage must be used within a PackageProvider");
  }
  return context;
};

export const PackageProvider = ({ children }: { children: ReactNode }) => {
  const [packages] = useState<ServicePackage[]>(PACKAGES);
  const [selectedPackage, setSelectedPackageState] = useState<ServicePackage | null>(null);
  const { user } = useAuth();
  const { quoteDetails, createQuote: createQuoteService, clearQuote } = useQuoteManager(user?.id);

  // Paket seçme fonksiyonu
  const setSelectedPackage = (packageId: string | null) => {
    if (!packageId) {
      setSelectedPackageState(null);
      return;
    }

    const pkg = packages.find((p) => p.id === packageId);
    if (pkg) {
      setSelectedPackageState(pkg);
    }
  };

  // EmailJS başlatma
  useEffect(() => {
    try {
      initEmailJS();
      console.log("EmailJS initialized successfully");
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
    }
  }, []);

  // Teklif oluşturma (köprü fonksiyon)
  const createQuote = (details: Partial<QuoteDetails>) => {
    if (!selectedPackage || !user) return;
    
    createQuoteService(selectedPackage, details);
  };

  return (
    <PackageContext.Provider value={{ 
      packages, 
      selectedPackage, 
      quoteDetails,
      setSelectedPackage, 
      createQuote, 
      clearQuote 
    }}>
      {children}
    </PackageContext.Provider>
  );
};

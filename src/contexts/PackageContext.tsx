
import { createContext, useContext, useState, ReactNode } from "react";

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
}

interface PackageContextType {
  packages: ServicePackage[];
  selectedPackage: ServicePackage | null;
  quoteDetails: QuoteDetails | null;
  setSelectedPackage: (packageId: string | null) => void;
  createQuote: (details: Partial<QuoteDetails>) => void;
  clearQuote: () => void;
}

// Mock veri
const PACKAGES: ServicePackage[] = [
  {
    id: "basic",
    name: "Yıllık Bakım Paketi",
    description: "Santralinizin yıllık periyodik bakım ve kontrolleri için temel paket",
    price: 15,
    priceUnit: "kWp/Yıl",
    popular: false,
    features: [
      { 
        id: "f1", 
        title: "Panel Temizliği", 
        description: "Yılda 1 kez panel yüzeylerinin özel solüsyonla temizlenmesi", 
        icon: "droplet", 
        included: true,
        frequency: "Yılda 1 kez" 
      },
      { 
        id: "f2", 
        title: "Termal Kamera Taraması", 
        description: "Panellerin termal kamera ile sıcak nokta (hot-spot) taraması", 
        icon: "scan", 
        included: true,
        frequency: "Yılda 1 kez" 
      },
      { 
        id: "f3", 
        title: "İzolasyon Testi", 
        description: "DC kablolama ve bileşenlerin izolasyon direnci testi", 
        icon: "zap", 
        included: true,
        frequency: "Yılda 1 kez" 
      },
      { 
        id: "f4", 
        title: "Acil Müdahale Desteği", 
        description: "Arıza durumunda öncelikli saha desteği", 
        icon: "shield-alert", 
        included: false 
      },
      { 
        id: "f5", 
        title: "Üretim Raporlaması", 
        description: "Aylık detaylı üretim raporları ve karşılaştırmalı analizler", 
        icon: "bar-chart", 
        included: false 
      }
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  {
    id: "standard",
    name: "Basit İşletme Paketi",
    description: "Temel izleme ve bakım hizmetlerini içeren standart işletme paketi",
    price: 25,
    priceUnit: "kWp/Yıl",
    popular: true,
    features: [
      { 
        id: "f1", 
        title: "Panel Temizliği", 
        description: "Yılda 2 kez panel yüzeylerinin özel solüsyonla temizlenmesi", 
        icon: "droplet", 
        included: true,
        frequency: "Yılda 2 kez" 
      },
      { 
        id: "f2", 
        title: "Termal Kamera Taraması", 
        description: "Panellerin termal kamera ile sıcak nokta (hot-spot) taraması", 
        icon: "scan", 
        included: true,
        frequency: "Yılda 2 kez" 
      },
      { 
        id: "f3", 
        title: "İzolasyon Testi", 
        description: "DC kablolama ve bileşenlerin izolasyon direnci testi", 
        icon: "zap", 
        included: true,
        frequency: "Yılda 2 kez" 
      },
      { 
        id: "f4", 
        title: "Acil Müdahale Desteği", 
        description: "Arıza durumunda öncelikli saha desteği (48 saat)", 
        icon: "shield-alert", 
        included: true,
        frequency: "Gerektiğinde" 
      },
      { 
        id: "f5", 
        title: "Üretim Raporlaması", 
        description: "Aylık detaylı üretim raporları ve karşılaştırmalı analizler", 
        icon: "bar-chart", 
        included: true,
        frequency: "Aylık" 
      },
      { 
        id: "f6", 
        title: "7/24 İzleme", 
        description: "Santralinizin 7/24 uzaktan izlenmesi ve alarm yönetimi", 
        icon: "activity", 
        included: false 
      }
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  {
    id: "premium",
    name: "Premium İşletme Paketi",
    description: "Tam kapsamlı 7/24 izleme ve önleyici bakım hizmetleri",
    price: 40,
    priceUnit: "kWp/Yıl",
    popular: false,
    features: [
      { 
        id: "f1", 
        title: "Panel Temizliği", 
        description: "Yılda 4 kez panel yüzeylerinin özel solüsyonla temizlenmesi", 
        icon: "droplet", 
        included: true,
        frequency: "Yılda 4 kez" 
      },
      { 
        id: "f2", 
        title: "Termal Kamera Taraması", 
        description: "Panellerin termal kamera ile sıcak nokta (hot-spot) taraması", 
        icon: "scan", 
        included: true,
        frequency: "Yılda 4 kez" 
      },
      { 
        id: "f3", 
        title: "İzolasyon Testi", 
        description: "DC kablolama ve bileşenlerin izolasyon direnci testi", 
        icon: "zap", 
        included: true,
        frequency: "Yılda 4 kez" 
      },
      { 
        id: "f4", 
        title: "Acil Müdahale Desteği", 
        description: "Arıza durumunda öncelikli saha desteği (24 saat)", 
        icon: "shield-alert", 
        included: true,
        frequency: "Gerektiğinde" 
      },
      { 
        id: "f5", 
        title: "Üretim Raporlaması", 
        description: "Haftalık detaylı üretim raporları ve karşılaştırmalı analizler", 
        icon: "bar-chart", 
        included: true,
        frequency: "Haftalık" 
      },
      { 
        id: "f6", 
        title: "7/24 İzleme", 
        description: "Santralinizin 7/24 uzaktan izlenmesi ve alarm yönetimi", 
        icon: "activity", 
        included: true,
        frequency: "Sürekli" 
      },
      { 
        id: "f7", 
        title: "Drone ile Detaylı İnceleme", 
        description: "Drone ile santral genelinde termal ve görsel inceleme", 
        icon: "send", 
        included: true,
        frequency: "Yılda 2 kez" 
      },
      { 
        id: "f8", 
        title: "Performans Optimizasyonu", 
        description: "Sürekli performans takibi ve optimizasyon önerileri", 
        icon: "trending-up", 
        included: true,
        frequency: "Sürekli" 
      }
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  }
];

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
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);

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

  const createQuote = (details: Partial<QuoteDetails>) => {
    if (!selectedPackage) return;

    // Calculate future date for quote validity (30 days)
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    // Calculate total price based on plant capacity
    const totalPrice = selectedPackage.price * (details.plantCapacity || 0);

    const newQuote: QuoteDetails = {
      packageId: selectedPackage.id,
      customerName: details.customerName || "",
      customerEmail: details.customerEmail || "",
      customerPhone: details.customerPhone,
      companyName: details.companyName,
      plantCapacity: details.plantCapacity || 0,
      plantLocation: details.plantLocation,
      panelCount: details.panelCount,
      additionalNotes: details.additionalNotes,
      totalPrice: totalPrice,
      quoteDate: new Date(),
      validUntil: validUntil
    };

    setQuoteDetails(newQuote);
    // Mock API call simülasyonu - gerçekte API'ye kaydetme işlemi
    console.log("Teklif oluşturuldu:", newQuote);
  };

  const clearQuote = () => {
    setQuoteDetails(null);
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

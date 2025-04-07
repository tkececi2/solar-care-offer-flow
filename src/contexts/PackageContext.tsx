
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
}

interface PackageContextType {
  packages: ServicePackage[];
  selectedPackage: ServicePackage | null;
  quoteDetails: QuoteDetails | null;
  setSelectedPackage: (packageId: string | null) => void;
  createQuote: (details: Partial<QuoteDetails>) => void;
  clearQuote: () => void;
}

// Updated packages data based on the information provided
const PACKAGES: ServicePackage[] = [
  {
    id: "annual-maintenance",
    name: "Yıllık Bakım Paketi",
    description: "Yılda bir kez kapsamlı test ve kontroller içeren temel bakım paketi",
    price: 38,
    priceUnit: "kWp/Yıl",
    popular: false,
    features: [
      { 
        id: "f1", 
        title: "İzolasyon Testi", 
        description: "Santralin elektriksel bağlantılarının izolasyon kalitesi testi", 
        icon: "zap", 
        included: true,
        frequency: "Yılda 1 kez" 
      },
      { 
        id: "f2", 
        title: "Termal Testler (Panel/Pano/OG)", 
        description: "Termal kamera ile sıcak nokta (hot-spot) taraması", 
        icon: "scan", 
        included: true,
        frequency: "Yılda 1 kez" 
      },
      { 
        id: "f3", 
        title: "Topraklama Testleri", 
        description: "Santral topraklama sisteminin etkinliğinin kontrolü", 
        icon: "activity", 
        included: true,
        frequency: "Yılda 1 kez" 
      },
      { 
        id: "f4", 
        title: "Akım-Gerilim (I-V) Ölçümleri", 
        description: "Panel performansını değerlendirmek için akım-gerilim ölçümleri", 
        icon: "bar-chart", 
        included: true,
        frequency: "Yılda 1 kez" 
      },
      { 
        id: "f5", 
        title: "Tork Testleri (%10)", 
        description: "Mekanik bağlantıların sıkılık kontrolü", 
        icon: "wrench", 
        included: true,
        frequency: "Yılda 1 kez" 
      },
      { 
        id: "f6", 
        title: "Drone ile Panel Termal Testleri", 
        description: "Geniş alanlı panellerin termal analizi için drone ile tarama", 
        icon: "send", 
        included: true,
        frequency: "Yılda 1 kez" 
      },
      { 
        id: "f7", 
        title: "OG & Röle Fonksiyon Testleri", 
        description: "Orta gerilim ekipmanları ve röle fonksiyonlarının kontrolü", 
        icon: "shield", 
        included: true,
        frequency: "Yılda 2 kez" 
      }
    ],
    images: [
      "/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png",
      "/placeholder.svg"
    ]
  },
  {
    id: "simple-operation",
    name: "Basit İşletme Bakım Paketi",
    description: "Temel izleme ve raporlama hizmetleri içeren ekonomik paket",
    price: 18,
    priceUnit: "kWp/Yıl",
    popular: true,
    minCapacity: 1000,
    maxCapacity: 3000,
    features: [
      { 
        id: "f1", 
        title: "SCADA üzerinden üretim izleme", 
        description: "Santral üretiminin uzaktan takibi ve izlenmesi", 
        icon: "activity", 
        included: true,
        frequency: "Sürekli" 
      },
      { 
        id: "f2", 
        title: "Günlük üretim raporu", 
        description: "Günlük üretim verilerinin raporlanması", 
        icon: "file-text", 
        included: true,
        frequency: "Günlük" 
      },
      { 
        id: "f3", 
        title: "Mahsuplaşma desteği", 
        description: "Elektrik mahsuplaşma süreçlerinde destek ve danışmanlık", 
        icon: "calculator", 
        included: true,
        frequency: "Aylık" 
      },
      { 
        id: "f4", 
        title: "Arıza bildirimleri", 
        description: "Arıza durumunda hızlı bildirim ve müdahale", 
        icon: "alert-triangle", 
        included: true,
        frequency: "Gerektiğinde" 
      },
      { 
        id: "f5", 
        title: "Performans kaybı tespiti", 
        description: "Santral performansındaki düşüşlerin analizi ve tespiti", 
        icon: "trending-down", 
        included: true,
        frequency: "Aylık" 
      },
      { 
        id: "f6", 
        title: "Yıllık genel raporlama", 
        description: "Santral performansının yıllık değerlendirilmesi", 
        icon: "file-bar-chart", 
        included: true,
        frequency: "Yıllık" 
      },
      { 
        id: "f7", 
        title: "Yıllık Genel Testler", 
        description: "Temel kontroller ve santral durum değerlendirmesi", 
        icon: "check-circle", 
        included: true,
        frequency: "Yıllık" 
      }
    ],
    images: [
      "/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png",
      "/placeholder.svg"
    ]
  },
  {
    id: "simple-operation-large",
    name: "Basit İşletme Bakım Paketi (3000 kWp üzeri)",
    description: "Büyük santraller için temel izleme ve raporlama hizmetleri",
    price: 15,
    priceUnit: "kWp/Yıl",
    popular: false,
    minCapacity: 3000,
    features: [
      { 
        id: "f1", 
        title: "SCADA üzerinden üretim izleme", 
        description: "Santral üretiminin uzaktan takibi ve izlenmesi", 
        icon: "activity", 
        included: true,
        frequency: "Sürekli" 
      },
      { 
        id: "f2", 
        title: "Günlük üretim raporu", 
        description: "Günlük üretim verilerinin raporlanması", 
        icon: "file-text", 
        included: true,
        frequency: "Günlük" 
      },
      { 
        id: "f3", 
        title: "Mahsuplaşma desteği", 
        description: "Elektrik mahsuplaşma süreçlerinde destek ve danışmanlık", 
        icon: "calculator", 
        included: true,
        frequency: "Aylık" 
      },
      { 
        id: "f4", 
        title: "Arıza bildirimleri", 
        description: "Arıza durumunda hızlı bildirim ve müdahale", 
        icon: "alert-triangle", 
        included: true,
        frequency: "Gerektiğinde" 
      },
      { 
        id: "f5", 
        title: "Performans kaybı tespiti", 
        description: "Santral performansındaki düşüşlerin analizi ve tespiti", 
        icon: "trending-down", 
        included: true,
        frequency: "Aylık" 
      },
      { 
        id: "f6", 
        title: "Yıllık genel raporlama", 
        description: "Santral performansının yıllık değerlendirilmesi", 
        icon: "file-bar-chart", 
        included: true,
        frequency: "Yıllık" 
      },
      { 
        id: "f7", 
        title: "Yıllık Genel Testler", 
        description: "Temel kontroller ve santral durum değerlendirmesi", 
        icon: "check-circle", 
        included: true,
        frequency: "Yıllık" 
      }
    ],
    images: [
      "/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png",
      "/placeholder.svg"
    ]
  },
  {
    id: "premium-operation",
    name: "Premium İşletme Bakım Paketi",
    description: "Tam kapsamlı 7/24 izleme ve önleyici bakım hizmetleri",
    price: 25,
    priceUnit: "kWp/Yıl",
    popular: false,
    minCapacity: 1000,
    maxCapacity: 3000,
    features: [
      { 
        id: "f1", 
        title: "Basit Paket'teki tüm özellikler", 
        description: "Basit İşletme Bakım Paketi'ndeki tüm izleme ve raporlama özellikleri", 
        icon: "check", 
        included: true,
        frequency: "Sürekli" 
      },
      { 
        id: "f2", 
        title: "Yıllık kapsamlı testler", 
        description: "Yıllık Bakım Paketi kapsamındaki tüm testler", 
        icon: "clipboard-check", 
        included: true,
        frequency: "Yıllık" 
      },
      { 
        id: "f3", 
        title: "Aylık termal kontroller", 
        description: "Termal kamera ile aylık sıcak nokta taraması", 
        icon: "thermometer", 
        included: true,
        frequency: "Aylık" 
      },
      { 
        id: "f4", 
        title: "Aylık detaylı raporlama", 
        description: "Santral performansı ve durumu hakkında detaylı aylık raporlar", 
        icon: "file-text", 
        included: true,
        frequency: "Aylık" 
      },
      { 
        id: "f5", 
        title: "7/24 teknik destek", 
        description: "Gün boyu kesintisiz teknik destek hizmeti", 
        icon: "phone", 
        included: true,
        frequency: "Sürekli" 
      },
      { 
        id: "f6", 
        title: "48 saat içinde müdahale garantisi", 
        description: "Arıza durumunda hızlı yerinde müdahale garantisi", 
        icon: "clock", 
        included: true,
        frequency: "Gerektiğinde" 
      },
      { 
        id: "f7", 
        title: "Öncelikli destek", 
        description: "Tüm hizmet taleplerinizde öncelikli işlem", 
        icon: "award", 
        included: true,
        frequency: "Sürekli" 
      }
    ],
    images: [
      "/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png",
      "/placeholder.svg"
    ]
  },
  {
    id: "premium-operation-large",
    name: "Premium İşletme Bakım Paketi (3000 kWp üzeri)",
    description: "Büyük santraller için tam kapsamlı bakım ve izleme hizmetleri",
    price: 23,
    priceUnit: "kWp/Yıl",
    popular: false,
    minCapacity: 3000,
    features: [
      { 
        id: "f1", 
        title: "Basit Paket'teki tüm özellikler", 
        description: "Basit İşletme Bakım Paketi'ndeki tüm izleme ve raporlama özellikleri", 
        icon: "check", 
        included: true,
        frequency: "Sürekli" 
      },
      { 
        id: "f2", 
        title: "Yıllık kapsamlı testler", 
        description: "Yıllık Bakım Paketi kapsamındaki tüm testler", 
        icon: "clipboard-check", 
        included: true,
        frequency: "Yıllık" 
      },
      { 
        id: "f3", 
        title: "Aylık termal kontroller", 
        description: "Termal kamera ile aylık sıcak nokta taraması", 
        icon: "thermometer", 
        included: true,
        frequency: "Aylık" 
      },
      { 
        id: "f4", 
        title: "Aylık detaylı raporlama", 
        description: "Santral performansı ve durumu hakkında detaylı aylık raporlar", 
        icon: "file-text", 
        included: true,
        frequency: "Aylık" 
      },
      { 
        id: "f5", 
        title: "7/24 teknik destek", 
        description: "Gün boyu kesintisiz teknik destek hizmeti", 
        icon: "phone", 
        included: true,
        frequency: "Sürekli" 
      },
      { 
        id: "f6", 
        title: "48 saat içinde müdahale garantisi", 
        description: "Arıza durumunda hızlı yerinde müdahale garantisi", 
        icon: "clock", 
        included: true,
        frequency: "Gerektiğinde" 
      },
      { 
        id: "f7", 
        title: "Öncelikli destek", 
        description: "Tüm hizmet taleplerinizde öncelikli işlem", 
        icon: "award", 
        included: true,
        frequency: "Sürekli" 
      }
    ],
    images: [
      "/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png",
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

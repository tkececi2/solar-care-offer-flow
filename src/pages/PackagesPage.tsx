import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { usePackage } from "@/contexts/PackageContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  BarChart, 
  Zap, 
  Shield, 
  Activity, 
  Droplet, 
  Scan,
  Send,
  TrendingUp,
  Calculator,
  AlertTriangle,
  FileText,
  FileBarChart,
  Check,
  Phone,
  Award,
  Clock,
  Thermometer,
  ClipboardCheck,
  Wrench
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const featureIconMap: Record<string, any> = {
  "droplet": Droplet,
  "scan": Scan,
  "zap": Zap,
  "shield": Shield,
  "shield-alert": AlertTriangle,
  "bar-chart": BarChart,
  "file-bar-chart": FileBarChart,
  "file-text": FileText,
  "activity": Activity,
  "send": Send,
  "trending-up": TrendingUp,
  "trending-down": TrendingUp,
  "calculator": Calculator,
  "check": Check,
  "check-circle": CheckCircle,
  "clipboard-check": ClipboardCheck,
  "alert-triangle": AlertTriangle,
  "phone": Phone,
  "award": Award,
  "clock": Clock,
  "thermometer": Thermometer,
  "wrench": Wrench
};

export default function PackagesPage() {
  const { packages, setSelectedPackage } = usePackage();
  const navigate = useNavigate();
  const [view, setView] = useState<"cards" | "compare">("cards");
  
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    navigate(`/package-detail/${packageId}`);
  };

  const handleGetQuote = (packageId: string) => {
    setSelectedPackage(packageId);
    navigate("/quote");
  };

  const renderFeatureIcon = (iconName: string) => {
    const IconComponent = featureIconMap[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };
  
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-ocean-900 to-ocean-800 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-3 text-white">
              GES Bakım ve İşletme <span className="text-solar-500">Paketleri</span>
            </h1>
            <p className="text-lg text-white/80">
              İhtiyaçlarınıza uygun bakım paketini seçin ve güneş santrallerinizin
              performansını maksimuma çıkarın.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-center">
          <Tabs defaultValue="cards" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cards" onClick={() => setView("cards")}>
                Paket Kartları
              </TabsTrigger>
              <TabsTrigger value="compare" onClick={() => setView("compare")}>
                Karşılaştır
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {view === "cards" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`overflow-hidden hover:shadow-md transition-all h-full ${
                  pkg.popular ? 'border-solar-500 border-2 relative' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-solar-500 text-white text-xs py-1 px-2">
                    Önerilen
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                  
                  <div className="mt-2 text-xl font-bold text-ocean-800">
                    {pkg.price} <span className="text-xs font-normal text-muted-foreground">TL/{pkg.priceUnit}</span>
                  </div>

                  {pkg.minCapacity && (
                    <p className="text-xs text-muted-foreground mt-1 mb-1">
                      {pkg.minCapacity} kWp {pkg.maxCapacity ? `- ${pkg.maxCapacity} kWp` : "ve üzeri"}
                    </p>
                  )}
                  
                  <p className="text-sm text-muted-foreground my-2 line-clamp-2">{pkg.description}</p>
                  
                  <div className="space-y-1 mb-4">
                    {pkg.features.slice(0, 3).map((feature) => (
                      <div key={feature.id} className="flex items-start text-sm">
                        {feature.included ? (
                          <CheckCircle className="text-solar-500 h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="text-muted-foreground/50 h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={!feature.included ? "text-muted-foreground/70 line-clamp-1" : "line-clamp-1"}>
                          {feature.title}
                        </span>
                      </div>
                    ))}
                    
                    {pkg.features.length > 3 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        +{pkg.features.length - 3} daha fazla özellik
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <Button 
                      onClick={() => handleSelectPackage(pkg.id)} 
                      variant="outline"
                      size="sm" 
                      className="flex-1 text-xs"
                    >
                      Detaylar
                    </Button>
                    
                    <Button 
                      onClick={() => handleGetQuote(pkg.id)}
                      className="flex-1 bg-solar-500 hover:bg-solar-600 text-white text-xs"
                      size="sm"
                    >
                      Teklif Al
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-muted font-medium">Özellikler</th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className={`p-4 text-center ${pkg.popular ? 'bg-solar-50 border-t-2 border-solar-500' : 'bg-muted'}`}>
                      <div className="font-bold text-lg">{pkg.name}</div>
                      <div className="mt-2 font-bold text-ocean-800">
                        {pkg.price} <span className="text-xs font-normal text-muted-foreground">TL/{pkg.priceUnit}</span>
                      </div>
                      {pkg.minCapacity && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {pkg.minCapacity} kWp {pkg.maxCapacity ? `- ${pkg.maxCapacity} kWp` : "ve üzeri"}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(new Set(packages.flatMap(pkg => pkg.features.map(f => f.title)))).map((featureTitle, index) => {
                  const feature = packages.flatMap(p => p.features).find(f => f.title === featureTitle);
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : 'bg-white'}>
                      <td className="p-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          {feature && renderFeatureIcon(feature.icon)}
                          <span>{featureTitle}</span>
                        </div>
                      </td>
                      {packages.map((pkg) => {
                        const pkgFeature = pkg.features.find(f => f.title === featureTitle);
                        return (
                          <td key={`${pkg.id}-${index}`} className={`p-4 text-center border-t border-border ${pkg.popular ? 'bg-solar-50/50' : ''}`}>
                            {pkgFeature?.included ? (
                              <div>
                                <CheckCircle className="mx-auto text-solar-500 h-5 w-5" />
                                {pkgFeature.frequency && (
                                  <div className="text-xs text-muted-foreground mt-1">{pkgFeature.frequency}</div>
                                )}
                              </div>
                            ) : (
                              <XCircle className="mx-auto text-muted-foreground/50 h-5 w-5" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                <tr>
                  <td className="p-4 border-t border-border"></td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className={`p-4 text-center border-t border-border ${pkg.popular ? 'bg-solar-50/50' : ''}`}>
                      <div className="grid grid-cols-1 gap-2">
                        <Button 
                          onClick={() => handleGetQuote(pkg.id)}
                          className="bg-solar-500 hover:bg-solar-600 text-white text-xs"
                          size="sm"
                        >
                          Teklif Al
                        </Button>
                        
                        <Button 
                          onClick={() => handleSelectPackage(pkg.id)} 
                          variant="outline"
                          className="border-ocean-800 text-ocean-800 hover:bg-ocean-50"
                          size="sm"
                        >
                          Detayları Gör
                        </Button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-12 bg-card p-6 rounded-lg shadow-sm border border-border">
          <h2 className="text-xl font-bold mb-3">Sık Sorulan Sorular</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center text-base">
                <ChevronRight className="mr-2 h-4 w-4 text-solar-500" />
                Bakım paketleri tüm GES türleri için uygun mudur?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground ml-6">
                Evet, bakım paketlerimiz çatı tipi, arazi tipi ve tüm kapasitelerdeki GES'ler için uygundur. 
                Santralınızın özelliklerine göre hizmet kapsamı özelleştirilebilir.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold flex items-center text-base">
                <ChevronRight className="mr-2 h-4 w-4 text-solar-500" />
                Özel bakım paketleri talep edebilir miyim?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground ml-6">
                Kesinlikle. Güneş santralınızın ihtiyaçlarına göre özelleştirilmiş bakım paketleri sunabiliyoruz. 
                İletişim formu üzerinden bizimle iletişime geçebilirsiniz.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold flex items-center text-base">
                <ChevronRight className="mr-2 h-4 w-4 text-solar-500" />
                Bakım anlaşması süresi ne kadardır?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground ml-6">
                Standart bakım anlaşmaları 1 yıllıktır, ancak 2 veya 3 yıllık anlaşmalar için 
                indirimli fiyatlar sunmaktayız.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


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
  TrendingUp
} from "lucide-react";

// Icon mapping for feature icons
const featureIconMap: Record<string, any> = {
  "droplet": Droplet,
  "scan": Scan,
  "zap": Zap,
  "shield-alert": Shield,
  "bar-chart": BarChart,
  "activity": Activity,
  "send": Send,
  "trending-up": TrendingUp,
};

export default function PackagesPage() {
  const { packages, setSelectedPackage } = usePackage();
  const navigate = useNavigate();
  const [view, setView] = useState<"cards" | "compare">("cards");
  
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    navigate(`/package-detail/${packageId}`);
  };

  // Helper function to render feature icon
  const renderFeatureIcon = (iconName: string) => {
    const IconComponent = featureIconMap[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };
  
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">GES Bakım ve İşletme Paketleri</h1>
            <p className="text-xl text-muted-foreground">
              İhtiyaçlarınıza uygun bakım paketini seçin ve güneş santrallerinizin
              performansını maksimuma çıkarın.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-center">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">{pkg.name}</h3>
                  <p className="text-muted-foreground mt-2">{pkg.description}</p>
                  <div className="mt-4 text-3xl font-bold">
                    {pkg.price} <span className="text-sm font-normal text-muted-foreground">TL/{pkg.priceUnit}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {pkg.features.slice(0, 5).map((feature) => (
                    <div key={feature.id} className="package-feature">
                      {feature.included ? (
                        <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                      ) : (
                        <XCircle className="text-muted-foreground/50 h-5 w-5 mt-0.5" />
                      )}
                      <span className={!feature.included ? "text-muted-foreground/70" : ""}>
                        {feature.title}
                        {feature.frequency && feature.included && (
                          <span className="block text-xs text-muted-foreground">{feature.frequency}</span>
                        )}
                      </span>
                    </div>
                  ))}
                  
                  {pkg.features.length > 5 && (
                    <div className="text-center text-sm text-muted-foreground mt-2">
                      +{pkg.features.length - 5} daha fazla özellik
                    </div>
                  )}
                </div>
                
                <Button onClick={() => handleSelectPackage(pkg.id)} className="w-full">
                  Detayları Gör
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-muted font-medium">Özellikler</th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className={`p-4 text-center ${pkg.popular ? 'bg-primary/10 border-t-2 border-primary' : 'bg-muted'}`}>
                      <div className="font-bold text-lg">{pkg.name}</div>
                      <div className="mt-2 font-bold">
                        {pkg.price} <span className="text-xs font-normal text-muted-foreground">TL/{pkg.priceUnit}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Tüm özellikleri listelemek için benzersiz özellik başlıkları oluşturalım */}
                {Array.from(new Set(packages.flatMap(pkg => pkg.features.map(f => f.title)))).map((featureTitle, index) => {
                  // Her bir özellik için o özelliğe sahip tüm paketleri kontrol edelim
                  const feature = packages[0].features.find(f => f.title === featureTitle) || 
                                  packages[1].features.find(f => f.title === featureTitle) || 
                                  packages[2].features.find(f => f.title === featureTitle);
                  
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
                          <td key={`${pkg.id}-${index}`} className={`p-4 text-center border-t border-border ${pkg.popular ? 'bg-primary/5' : ''}`}>
                            {pkgFeature?.included ? (
                              <div>
                                <CheckCircle className="mx-auto text-primary h-5 w-5" />
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
                    <td key={pkg.id} className={`p-4 text-center border-t border-border ${pkg.popular ? 'bg-primary/5' : ''}`}>
                      <Button onClick={() => handleSelectPackage(pkg.id)}>
                        Detayları Gör
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-16 bg-card p-8 rounded-lg shadow-sm border border-border">
          <h2 className="text-2xl font-bold mb-4">Sık Sorulan Sorular</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold flex items-center text-lg">
                <ChevronRight className="mr-2 h-5 w-5 text-primary" />
                Bakım paketleri tüm GES türleri için uygun mudur?
              </h3>
              <p className="mt-2 text-muted-foreground ml-7">
                Evet, bakım paketlerimiz çatı tipi, arazi tipi ve tüm kapasitelerdeki GES'ler için uygundur. 
                Santralınızın özelliklerine göre hizmet kapsamı özelleştirilebilir.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold flex items-center text-lg">
                <ChevronRight className="mr-2 h-5 w-5 text-primary" />
                Özel bakım paketleri talep edebilir miyim?
              </h3>
              <p className="mt-2 text-muted-foreground ml-7">
                Kesinlikle. Güneş santralınızın ihtiyaçlarına göre özelleştirilmiş bakım paketleri sunabiliyoruz. 
                İletişim formu üzerinden bizimle iletişime geçebilirsiniz.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold flex items-center text-lg">
                <ChevronRight className="mr-2 h-5 w-5 text-primary" />
                Bakım anlaşması süresi ne kadardır?
              </h3>
              <p className="mt-2 text-muted-foreground ml-7">
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

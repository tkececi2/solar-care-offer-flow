
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { CheckCircle, ArrowRight, Sun, Zap, Shield, BarChart } from "lucide-react";
import { usePackage } from "@/contexts/PackageContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const { packages, setSelectedPackage } = usePackage();
  const navigate = useNavigate();
  
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    navigate(`/package-detail/${packageId}`);
  };

  return (
    <MainLayout>
      {/* Hero Section - Modern & Minimal */}
      <section className="relative bg-gradient-to-br from-ocean-900 to-ocean-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Solar<span className="text-solar-500">Enerjin Teklif</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6">
              Güneş enerji santralleriniz için profesyonel bakım paketleri.
              Hemen teklif alın, verimliliğinizi artırın.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/packages")}
                className="bg-solar-500 hover:bg-solar-600 text-white"
              >
                Hemen Teklif Al
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Link to="/contact">İletişime Geç</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Paketler Bölümü - Kompakt Tasarım */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">
              <span className="text-solar-500">Bakım</span> Paketlerimiz
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              İhtiyacınıza uygun bakım paketini seçin, hemen teklifinizi alın
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                          <span className="h-4 w-4 mr-1"></span>
                        )}
                        <span className="line-clamp-1">
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
                      onClick={() => {
                        setSelectedPackage(pkg.id);
                        navigate("/quote");
                      }} 
                      size="sm"
                      className="flex-1 bg-solar-500 hover:bg-solar-600 text-white text-xs"
                    >
                      Teklif Al
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              asChild 
              variant="secondary" 
              className="bg-ocean-800 hover:bg-ocean-700 text-white"
            >
              <Link to="/packages" className="flex items-center">
                <span>Tüm Paketleri Karşılaştır</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Avantajlar - Modern Grid Layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            GES Bakım <span className="text-solar-500">Avantajlarımız</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border border-border rounded-lg hover:border-solar-500/30 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-solar-100 flex items-center justify-center mb-3">
                <Sun className="text-solar-500 h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Üretim Verimliliği</h3>
              <p className="text-sm text-muted-foreground">
                Düzenli bakım ile üretim kaybını önleyin.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg hover:border-solar-500/30 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-solar-100 flex items-center justify-center mb-3">
                <Shield className="text-solar-500 h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Risk Yönetimi</h3>
              <p className="text-sm text-muted-foreground">
                Proaktif bakım ile arızaları önleyin.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg hover:border-solar-500/30 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-solar-100 flex items-center justify-center mb-3">
                <Zap className="text-solar-500 h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Uzman Ekip</h3>
              <p className="text-sm text-muted-foreground">
                Deneyimli teknik personel ve ekipman.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg hover:border-solar-500/30 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-solar-100 flex items-center justify-center mb-3">
                <BarChart className="text-solar-500 h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Raporlama</h3>
              <p className="text-sm text-muted-foreground">
                Düzenli performans raporları.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü - Modern & Minimal */}
      <section className="bg-gradient-to-r from-ocean-900 to-ocean-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            GES'inizin Bakımını Profesyonellere Bırakın
          </h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto opacity-90">
            Güneş santrallerinizin bakım ve performans yönetimini uzmanına bırakın.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate("/quote")} 
              size="lg"
              className="bg-solar-500 hover:bg-solar-600 text-white"
            >
              Hemen Teklif Al
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}


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
      {/* Hero Section */}
      <section className="relative">
        {/* Dark blue background with overlay */}
        <div className="absolute inset-0 bg-ocean-900">
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/95 to-ocean-900/70"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              SolarEnerjin <span className="text-solar-500">Teklif</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Güneş enerji santralleriniz için profesyonel işletme ve bakım paketleri.
              Hemen teklif alın, verimliliğinizi artırın.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
              <Button 
                size="lg" 
                onClick={() => navigate("/packages")}
                className="bg-solar-500 hover:bg-solar-600 text-white"
              >
                Hemen Teklif Al
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/contact">İletişime Geç</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Paketler Bölümü */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-solar-500">Bakım</span> Paketlerimiz
            </h2>
            <p className="text-xl text-muted-foreground">
              İhtiyacınıza uygun bakım paketini seçin, hemen teklifinizi alın
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.slice(0, 3).map((pkg) => (
              <Card 
                key={pkg.id}
                className={`overflow-hidden hover:shadow-lg transition-all ${
                  pkg.popular ? 'border-solar-500 border-2 relative' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-solar-500 text-white text-xs py-1 px-3">
                    Önerilen
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  
                  <div className="mt-4 text-3xl font-bold text-ocean-800">
                    {pkg.price} <span className="text-sm font-normal text-muted-foreground">TL/{pkg.priceUnit}</span>
                  </div>

                  {pkg.minCapacity && (
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      {pkg.minCapacity} kWp {pkg.maxCapacity ? `- ${pkg.maxCapacity} kWp` : "ve üzeri"} için
                    </p>
                  )}
                  
                  <p className="text-muted-foreground my-4">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {pkg.features.slice(0, 4).map((feature) => (
                      <div key={feature.id} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle className="text-solar-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        ) : (
                          <span className="h-5 w-5 mr-2"></span>
                        )}
                        <span>
                          {feature.title}
                          {feature.frequency && feature.included && (
                            <span className="block text-xs text-muted-foreground">{feature.frequency}</span>
                          )}
                        </span>
                      </div>
                    ))}
                    
                    {pkg.features.length > 4 && (
                      <div className="text-center text-sm text-muted-foreground mt-2">
                        +{pkg.features.length - 4} daha fazla özellik
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={() => handleSelectPackage(pkg.id)} 
                      className="w-full bg-ocean-800 hover:bg-ocean-700"
                    >
                      Detayları Gör
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        setSelectedPackage(pkg.id);
                        navigate("/quote");
                      }} 
                      variant="outline"
                      className="w-full border-solar-500 text-solar-500 hover:bg-solar-50"
                    >
                      Hemen Teklif Al
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild 
              variant="secondary" 
              size="lg" 
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

      {/* Referanslar Bölümü */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-solar-500">Referanslarımız</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Türkiye'nin dört bir yanında sunduğumuz GES bakım ve işletme hizmetleri
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ReferenceCard
              title="ISPARTA 12 MWP (GES)"
              capacity="12 MW"
              imageUrl="/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png"
              features={[
                "9 adet köşk ve trafo binası",
                "String invertör kullanımı",
                "Tam kapsamlı bakım ve güvenlik",
                "7/24 bakım ve izleme"
              ]}
            />
            
            <ReferenceCard
              title="BURDUR BÜĞDÜZ 6.73 MWP GES"
              capacity="6.3 MW"
              imageUrl="/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png"
              features={[
                "2 adet köşk ve trafo binası",
                "String invertör kullanımı",
                "Tam kapsamlı bakım ve güvenlik",
                "7/24 bakım ve izleme"
              ]}
            />
            
            <ReferenceCard
              title="BURDUR NECATİ 20 MWP GES"
              capacity="20 MW"
              imageUrl="/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png"
              features={[
                "4 adet köşk ve trafo binası",
                "String invertör kullanımı",
                "Tam kapsamlı bakım ve güvenlik",
                "7/24 bakım ve izleme"
              ]}
            />
            
            <ReferenceCard
              title="ÇANKIRI ELDİVAN 14.62 MWP GES"
              capacity="14.62 MW"
              imageUrl="/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png"
              features={[
                "Bölgesel enerji ihtiyacına yönelik tasarım",
                "String invertör kullanımı",
                "Tam kapsamlı bakım ve güvenlik",
                "7/24 bakım ve izleme"
              ]}
            />
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-solar-500 text-solar-500 hover:bg-solar-50"
              onClick={() => navigate("/contact")}
            >
              Referanslarımız Hakkında Bilgi Alın
            </Button>
          </div>
        </div>
      </section>

      {/* Avantajlar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            GES Bakım <span className="text-solar-500">Avantajlarımız</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border hover:border-solar-500/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-solar-100 flex items-center justify-center mb-4">
                <Sun className="text-solar-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Üretim Verimliliği</h3>
              <p className="text-muted-foreground">
                Düzenli bakım ile üretim kaybını önleyin, santral verimliliğinizi maksimuma çıkarın.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border hover:border-solar-500/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-solar-100 flex items-center justify-center mb-4">
                <Shield className="text-solar-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Yönetimi</h3>
              <p className="text-muted-foreground">
                Proaktif bakım ile arızaları önleyin, acil durum desteğiyle güvende olun.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border hover:border-solar-500/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-solar-100 flex items-center justify-center mb-4">
                <Zap className="text-solar-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uzman Ekip</h3>
              <p className="text-muted-foreground">
                Deneyimli teknik personelimiz ve modern test ekipmanlarımızla kaliteli hizmet.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border hover:border-solar-500/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-solar-100 flex items-center justify-center mb-4">
                <BarChart className="text-solar-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detaylı Raporlama</h3>
              <p className="text-muted-foreground">
                Düzenli üretim ve performans raporlarıyla santral durumunu yakından takip edin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="bg-gradient-to-r from-ocean-900 to-ocean-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GES'inizin Bakımını Profesyonellere Bırakın
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Güneş santrallerinizin bakım ve performans yönetimini üstlenerek,
            siz asıl işinize odaklanın.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate("/quote")} 
              size="lg"
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
      </section>
    </MainLayout>
  );
}

interface ReferenceCardProps {
  title: string;
  capacity: string;
  imageUrl: string;
  features: string[];
}

const ReferenceCard = ({ title, capacity, imageUrl, features }: ReferenceCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 bg-ocean-900 rounded-t-lg overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="font-semibold">Kapasite:</span> {capacity}
        </div>
        <div>
          <h4 className="font-semibold mb-1">Özellikler:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { CheckCircle, ArrowRight, Sun, Zap, Shield, BarChart } from "lucide-react";
import { usePackage } from "@/contexts/PackageContext";
import { useNavigate } from "react-router-dom";

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
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                GES Bakım ve İşletme <span className="text-primary">Çözümleriniz</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Güneş enerji santralleriniz için profesyonel işletme ve bakım paketleri.
                Verimliliğinizi artırın, riskleri azaltın.
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                <Button asChild size="lg" className="animate-pulse">
                  <Link to="/packages">Hemen Teklif Al</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">İletişime Geç</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative animate-float">
                <div className="bg-primary/10 rounded-xl p-8">
                  <img
                    src="/placeholder.svg"
                    alt="GES Bakım"
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-secondary h-5 w-5" />
                    <span className="font-semibold">Profesyonel Bakım</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paketler Bölümü - Öne Çıkarılmış */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Paketler</span> ve Teklif Al
            </h2>
            <p className="text-xl text-muted-foreground">
              İhtiyacınıza uygun bakım paketini seçin, hemen teklifinizi alın
            </p>
          </div>
          
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
                  {pkg.features.slice(0, 4).map((feature) => (
                    <div key={feature.id} className="package-feature">
                      {feature.included ? (
                        <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                      ) : (
                        <></>
                      )}
                      <span className={!feature.included ? "text-muted-foreground/70" : ""}>
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
                    className="w-full"
                  >
                    Detayları Gör
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setSelectedPackage(pkg.id);
                      navigate("/quote");
                    }} 
                    variant="outline"
                    className="w-full"
                  >
                    Hemen Teklif Al
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="secondary" size="lg">
              <Link to="/packages" className="flex items-center">
                <span>Tüm Paketleri Karşılaştır</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Avantajlar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            GES Bakım <span className="text-primary">Avantajlarımız</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sun className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Üretim Verimliliği</h3>
              <p className="text-muted-foreground">
                Düzenli bakım ile üretim kaybını önleyin, santral verimliliğinizi maksimuma çıkarın.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Yönetimi</h3>
              <p className="text-muted-foreground">
                Proaktif bakım ile arızaları önleyin, acil durum desteğiyle güvende olun.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uzman Ekip</h3>
              <p className="text-muted-foreground">
                Deneyimli teknik personelimiz ve modern test ekipmanlarımızla kaliteli hizmet.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart className="text-primary h-6 w-6" />
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
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GES'inizin Bakımını Profesyonellere Bırakın
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Güneş santrallerinizin bakım ve performans yönetimini üstlenerek,
            siz asıl işinize odaklanın.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate("/quote")} 
              variant="secondary" 
              size="lg"
              className="animate-pulse"
            >
              Hemen Teklif Al
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">İletişime Geç</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { CheckCircle, ArrowRight, Sun, Zap, Shield, BarChart } from "lucide-react";

export default function HomePage() {
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
                <Button asChild size="lg">
                  <Link to="/packages">Paketleri İncele</Link>
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

      {/* Avantajlar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            GES Bakım <span className="text-primary">Avantajlarımız</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sun className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Üretim Verimliliği</h3>
              <p className="text-muted-foreground">
                Düzenli bakım ile üretim kaybını önleyin, santral verimliliğinizi maksimuma çıkarın.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Yönetimi</h3>
              <p className="text-muted-foreground">
                Proaktif bakım ile arızaları önleyin, acil durum desteğiyle güvende olun.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uzman Ekip</h3>
              <p className="text-muted-foreground">
                Deneyimli teknik personelimiz ve modern test ekipmanlarımızla kaliteli hizmet.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all">
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

      {/* Paketler Önizlemesi */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bakım ve İşletme <span className="text-primary">Paketlerimiz</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              İhtiyacınıza uygun bakım paketini seçin, GES'inizin 
              performansını ve ömrünü maksimuma çıkarın.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Paket 1 */}
            <div className="package-card">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Yıllık Bakım Paketi</h3>
                <div className="mt-4 text-3xl font-bold">
                  15 <span className="text-sm font-normal text-muted-foreground">TL/kWp/Yıl</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>Yılda 1 kez panel temizliği</span>
                </div>
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>Termal kamera taraması</span>
                </div>
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>İzolasyon testi</span>
                </div>
              </div>
              
              <Button asChild className="w-full">
                <Link to="/packages">Detayları Gör</Link>
              </Button>
            </div>
            
            {/* Paket 2 - Önerilen */}
            <div className="package-card popular">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Basit İşletme Paketi</h3>
                <div className="mt-4 text-3xl font-bold">
                  25 <span className="text-sm font-normal text-muted-foreground">TL/kWp/Yıl</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>Yılda 2 kez panel temizliği</span>
                </div>
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>Termal kamera taraması</span>
                </div>
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>İzolasyon testi</span>
                </div>
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>Acil müdahale desteği (48 saat)</span>
                </div>
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>Aylık üretim raporlaması</span>
                </div>
              </div>
              
              <Button asChild className="w-full">
                <Link to="/packages">Detayları Gör</Link>
              </Button>
            </div>
            
            {/* Paket 3 */}
            <div className="package-card">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Premium İşletme Paketi</h3>
                <div className="mt-4 text-3xl font-bold">
                  40 <span className="text-sm font-normal text-muted-foreground">TL/kWp/Yıl</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>Yılda 4 kez panel temizliği</span>
                </div>
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>Termal kamera taraması</span>
                </div>
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>7/24 izleme ve alarm yönetimi</span>
                </div>
                <div className="package-feature">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5" />
                  <span>Drone ile detaylı inceleme</span>
                </div>
              </div>
              
              <Button asChild className="w-full">
                <Link to="/packages">Detayları Gör</Link>
              </Button>
            </div>
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
            <Button asChild variant="secondary" size="lg">
              <Link to="/packages">Paketleri İncele</Link>
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

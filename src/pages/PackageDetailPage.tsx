import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { usePackage } from "@/contexts/PackageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Droplet,
  Scan,
  Zap,
  Shield,
  BarChart,
  Activity,
  Send,
  TrendingUp,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";

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

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { packages, setSelectedPackage, selectedPackage } = usePackage();

  // Set the selected package based on URL parameter
  useEffect(() => {
    if (id) {
      setSelectedPackage(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!selectedPackage) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <p className="text-xl mb-4">Paket bulunamadı.</p>
            <Button onClick={() => navigate("/packages")}>Paketlere Dön</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleGetQuote = () => {
    if (!user) {
      toast.info("Teklif almak için önce giriş yapmalısınız.");
      navigate("/login");
    } else {
      navigate("/quote");
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/packages")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Paketlere Dön
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon - Paket Bilgileri */}
          <div className="lg:col-span-2">
            <div className={`bg-white rounded-lg shadow-md border overflow-hidden ${selectedPackage.popular ? 'border-primary' : 'border-border'}`}>
              {selectedPackage.popular && (
                <div className="bg-primary text-white text-center py-1 text-sm font-semibold">
                  Önerilen Paket
                </div>
              )}
              <div className="p-8">
                <h1 className="text-3xl font-bold mb-2">{selectedPackage.name}</h1>
                <p className="text-muted-foreground mb-6">{selectedPackage.description}</p>
                
                <div className="text-3xl font-bold mb-6">
                  {selectedPackage.price}{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    TL/{selectedPackage.priceUnit}
                  </span>
                </div>

                <Tabs defaultValue="features">
                  <TabsList className="w-full">
                    <TabsTrigger value="features" className="flex-1">Özellikler</TabsTrigger>
                    <TabsTrigger value="details" className="flex-1">Detaylar</TabsTrigger>
                    <TabsTrigger value="images" className="flex-1">Görseller</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="features" className="mt-6">
                    <div className="space-y-4">
                      {selectedPackage.features.map((feature) => {
                        const IconComponent = featureIconMap[feature.icon];
                        
                        return (
                          <div key={feature.id} className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${feature.included ? 'bg-primary/10' : 'bg-muted'}`}>
                              {IconComponent && <IconComponent className={`h-5 w-5 ${feature.included ? 'text-primary' : 'text-muted-foreground'}`} />}
                            </div>
                            <div>
                              <div className="font-medium flex items-center">
                                {feature.title}
                                {feature.included && (
                                  <CheckCircle className="ml-2 h-4 w-4 text-primary" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                              {feature.frequency && feature.included && (
                                <p className="text-xs font-medium text-primary mt-1">
                                  Sıklık: {feature.frequency}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-6">
                    <div className="space-y-4">
                      <p>
                        {selectedPackage.name} paketimiz, güneş enerji santrallerinizin optimum performansta 
                        çalışmasını sağlamak için tasarlanmıştır. Düzenli bakım ve kontroller ile 
                        santralinizdeki sorunları erken tespit ederek verimin düşmesini önler.
                      </p>
                      <h3 className="font-semibold text-lg">Bakım Kapsamı</h3>
                      <p>
                        Paketimiz, panellerin düzenli temizliği, elektriksel bağlantıların kontrolü, 
                        termal kamera ile sıcak nokta taraması, izolasyon direnci ölçümleri ve 
                        detaylı rapor oluşturmayı içerir.
                      </p>
                      {selectedPackage.id === "standard" || selectedPackage.id === "premium" ? (
                        <>
                          <h3 className="font-semibold text-lg">Uzaktan İzleme</h3>
                          <p>
                            Santralınızın üretim verileri düzenli olarak takip edilerek, performans 
                            düşüşleri anında tespit edilir ve müdahale edilir.
                          </p>
                        </>
                      ) : null}
                      {selectedPackage.id === "premium" && (
                        <>
                          <h3 className="font-semibold text-lg">7/24 Alarm Yönetimi</h3>
                          <p>
                            Santralınız 7/24 izlenerek herhangi bir alarm durumunda anında 
                            bilgilendirilirsiniz. Acil durumlar için 24 saat içinde sahada müdahale garantisi.
                          </p>
                        </>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="images" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedPackage.images.map((image, index) => (
                        <img 
                          key={index} 
                          src={image} 
                          alt={`${selectedPackage.name} görseli ${index + 1}`} 
                          className="w-full h-48 object-cover rounded-lg" 
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-center mt-4">
                      * Görseller temsilidir. Daha fazla örnek için bizimle iletişime geçin.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Teklif ve İletişim Bilgileri */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Hemen Teklif Alın</CardTitle>
                <CardDescription>
                  Bu paketi seçip hızlıca teklif oluşturabilirsiniz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Paket:</span>
                    <span className="font-medium">{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fiyat:</span>
                    <span className="font-medium">
                      {selectedPackage.price} TL/{selectedPackage.priceUnit}
                    </span>
                  </div>
                </div>
                
                <Button onClick={handleGetQuote} className="w-full">
                  Teklif Al
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  {user ? "Özel teklifinizi hemen oluşturun." : "Teklif almak için giriş yapmanız gerekmektedir."}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>İletişim</CardTitle>
                <CardDescription>
                  Daha fazla bilgi almak için bizimle iletişime geçin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Shield className="mr-3 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Profesyonel Ekip</p>
                    <p className="text-muted-foreground">Deneyimli teknik kadro</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Scan className="mr-3 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Modern Ekipman</p>
                    <p className="text-muted-foreground">İleri teknoloji test cihazları</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BarChart className="mr-3 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Detaylı Raporlama</p>
                    <p className="text-muted-foreground">Kapsamlı test sonuçları</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

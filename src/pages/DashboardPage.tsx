import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { usePackage } from "@/contexts/PackageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  FileText,
  User,
  Package,
  Settings,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { quoteDetails, selectedPackage, packages } = usePackage();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we have a recent quote, add it to the list
    const loadQuotes = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Create a list of quotes including the current one if it exists
      let quotesList = [];
      
      if (quoteDetails && selectedPackage) {
        const newQuote = {
          id: `Q${new Date().getTime().toString().slice(-6)}`,
          packageName: selectedPackage.name,
          date: quoteDetails.quoteDate,
          status: "approved",
          totalPrice: quoteDetails.totalPrice * 1.2, // Adding VAT
          packageId: selectedPackage.id,
          plantCapacity: quoteDetails.plantCapacity
        };
        quotesList.push(newQuote);
      }
      
      // Get quotes from localStorage if any
      const storedQuotes = localStorage.getItem('userQuotes');
      if (storedQuotes) {
        quotesList = [...quotesList, ...JSON.parse(storedQuotes)];
      }
      
      // Store updated quotes in localStorage
      if (quoteDetails && selectedPackage) {
        localStorage.setItem('userQuotes', JSON.stringify(quotesList));
      }
      
      setQuotes(quotesList);
      setLoading(false);
    };

    loadQuotes();
  }, [quoteDetails, selectedPackage, packages]);

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="text-destructive mr-2" />
            <h2 className="text-xl font-semibold">Oturum açmanız gerekiyor</h2>
          </div>
          <p className="mb-6">Lütfen dashboard erişimi için giriş yapınız</p>
          <Button onClick={() => navigate("/login")}>Giriş Yap</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Merhaba, {user.name}</h1>
        <p className="text-muted-foreground mb-6">
          GES bakım teklifi almak için hemen başlayın
        </p>

        {/* Ana Dashboard - Basitleştirilmiş */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-full bg-gradient-to-r from-orange-50 to-background">
            <CardHeader>
              <CardTitle className="text-2xl">GES Bakım Teklifi Alın</CardTitle>
              <CardDescription>
                Güneş enerji sisteminiz için profesyonel bakım teklifleri alın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Güneş enerji santrallerinizin bakımı için uygun paketi seçerek hemen teklif alabilirsiniz.</p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate("/packages")} 
                  className="animate-pulse bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Paketleri İncele
                </Button>
                <Button 
                  onClick={() => navigate("/quote")} 
                  variant="outline"
                >
                  Teklif Oluştur
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Sütun - Profil ve Ayarlar */}
          <div className="space-y-6">
            {/* Profil Kartı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profilim
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ad Soyad</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-posta</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                {user.company && (
                  <div>
                    <p className="text-sm text-muted-foreground">Firma</p>
                    <p className="font-medium">{user.company}</p>
                  </div>
                )}
                {user.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Telefon</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate("/profile")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Profili Düzenle
                </Button>
              </CardFooter>
            </Card>

            {/* Santral Bilgileri Kartı */}
            <Card>
              <CardHeader>
                <CardTitle>Santral Bilgileriniz</CardTitle>
                <CardDescription>
                  Daha uygun teklif almak için santral bilgilerinizi ekleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!user.plantDetails?.capacity ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">Henüz santral bilgisi eklenmemiş</p>
                    <Button 
                      onClick={() => navigate("/profile")} 
                      variant="outline" 
                      size="sm"
                    >
                      Santral Bilgisi Ekle
                    </Button>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Santral Kapasitesi</p>
                      <p className="font-medium">{user.plantDetails.capacity} kWp</p>
                    </div>
                    {user.plantDetails.location && (
                      <div>
                        <p className="text-sm text-muted-foreground">Konum</p>
                        <p className="font-medium">{user.plantDetails.location}</p>
                      </div>
                    )}
                    {user.plantDetails.panelCount && (
                      <div>
                        <p className="text-sm text-muted-foreground">Panel Sayısı</p>
                        <p className="font-medium">{user.plantDetails.panelCount}</p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Orta ve Sağ Sütun - Teklifler */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teklifler */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tekliflerim</CardTitle>
                  <CardDescription>
                    Oluşturduğunuz tekliflerin durumunu takip edin
                  </CardDescription>
                </div>
                {quotes.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => navigate("/quote")}
                  >
                    Yeni Teklif Oluştur
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p>Yükleniyor...</p>
                  </div>
                ) : quotes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="text-left py-3 px-2">Teklif No</th>
                          <th className="text-left py-3 px-2">Paket</th>
                          <th className="text-left py-3 px-2">Tarih</th>
                          <th className="text-left py-3 px-2">Tutar</th>
                          <th className="text-left py-3 px-2">Durum</th>
                          <th className="text-left py-3 px-2">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotes.map((quote, index) => {
                          const quotePackage = packages.find(p => p.id === quote.packageId);
                          return (
                            <tr key={index} className="hover:bg-muted/50">
                              <td className="py-2 px-2">{quote.id}</td>
                              <td className="py-2 px-2">{quote.packageName}</td>
                              <td className="py-2 px-2">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(new Date(quote.date))}</span>
                                </div>
                              </td>
                              <td className="py-2 px-2">{quote.totalPrice?.toFixed(2)} TL</td>
                              <td className="py-2 px-2">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                                    quote.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : quote.status === "expired"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {quote.status === "approved"
                                    ? (
                                      <>
                                        <CheckCircle2 className="h-3 w-3" />
                                        <span>Onaylandı</span>
                                      </>
                                    )
                                    : quote.status === "expired"
                                    ? (
                                      <>
                                        <Clock className="h-3 w-3" />
                                        <span>Süresi Doldu</span>
                                      </>
                                    )
                                    : (
                                      <>
                                        <Clock className="h-3 w-3" />
                                        <span>Beklemede</span>
                                      </>
                                    )}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => navigate("/quote-summary")}
                                >
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Detay</span>
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-border rounded-lg">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Henüz teklif almadınız</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      İhtiyacınıza uygun GES bakım paketini seçerek hemen teklifinizi alın
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button 
                        onClick={() => navigate("/packages")} 
                        className="flex items-center bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <span>Paketleri İncele</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hızlı Başlangıç Rehberi */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı Başlangıç</CardTitle>
                <CardDescription>
                  Aşağıdaki adımları takip ederek teklifinizi alın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-full p-2 mr-4">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Santral bilgilerinizi ekleyin</h4>
                      <p className="text-sm text-muted-foreground">
                        Kapasite ve konum bilgilerinizi profilinize ekleyerek size özel teklifler alın
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-full p-2 mr-4">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Bakım paketini seçin</h4>
                      <p className="text-sm text-muted-foreground">
                        İhtiyacınıza uygun bakım paketini seçin ve detayları inceleyin
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-full p-2 mr-4">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Teklif alın</h4>
                      <p className="text-sm text-muted-foreground">
                        Seçtiğiniz paket için teklif oluşturun ve sonucu anında görüntüleyin
                      </p>
                    </div>
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

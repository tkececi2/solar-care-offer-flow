
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
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
  BarChart,
  FileText,
  User,
  Package,
  Settings,
} from "lucide-react";

// Dashboard için mocklanmış teklif ve rapor verileri
type Quote = {
  id: string;
  packageName: string;
  date: Date;
  status: "pending" | "approved" | "expired";
  totalPrice: number;
};

type Report = {
  id: string;
  title: string;
  date: Date;
  type: "maintenance" | "inspection" | "performance";
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock veri yükleme simülasyonu
    const loadMockData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock teklifler
      const mockQuotes: Quote[] = [
        {
          id: "Q2023001",
          packageName: "Basit İşletme Paketi",
          date: new Date(2023, 10, 15),
          status: "pending",
          totalPrice: 7500,
        },
      ];

      // Mock raporlar
      const mockReports: Report[] = [
        {
          id: "R2023001",
          title: "Yıllık Bakım Raporu",
          date: new Date(2023, 9, 10),
          type: "maintenance",
        },
        {
          id: "R2023002",
          title: "Panel Temizlik Raporu",
          date: new Date(2023, 10, 5),
          type: "maintenance",
        },
      ];

      setQuotes(mockQuotes);
      setReports(mockReports);
      setLoading(false);
    };

    loadMockData();
  }, []);

  // Tarih formatlamak için yardımcı fonksiyon
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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
          GES bakım paketlerinizi ve tekliflerinizi buradan takip edebilirsiniz
        </p>

        {/* Ana Dashboard Panelleri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Teklifler Paneli */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Aktif Teklifler</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quotes.filter(q => q.status === "pending").length}</div>
              <p className="text-xs text-muted-foreground">
                Son teklif {quotes.length > 0 ? formatDate(quotes[0].date) : "bulunmuyor"}
              </p>
            </CardContent>
          </Card>

          {/* Santral Kapasite Paneli */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Santral Kapasitesi</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.plantDetails?.capacity || "Tanımlanmadı"}
                {user.plantDetails?.capacity ? " kWp" : ""}
              </div>
              <p className="text-xs text-muted-foreground">
                {user.plantDetails?.panelCount
                  ? `${user.plantDetails?.panelCount} panel`
                  : "Panel sayısı tanımlanmadı"}
              </p>
            </CardContent>
          </Card>

          {/* Raporlar Paneli */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Bakım Raporları</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.length}</div>
              <p className="text-xs text-muted-foreground">
                Son rapor {reports.length > 0 ? formatDate(reports[0].date) : "bulunmuyor"}
              </p>
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

            {/* Hızlı İşlemler */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={() => navigate("/packages")} variant="secondary" className="w-full">
                  Paketleri İncele
                </Button>
                <Button onClick={() => navigate("/quote")} variant="outline" className="w-full">
                  Yeni Teklif Al
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Orta ve Sağ Sütun - Teklifler ve Raporlar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teklifler */}
            <Card>
              <CardHeader>
                <CardTitle>Tekliflerim</CardTitle>
                <CardDescription>
                  Oluşturduğunuz tekliflerin durumunu takip edin
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p>Teklifler yükleniyor...</p>
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
                        </tr>
                      </thead>
                      <tbody>
                        {quotes.map((quote) => (
                          <tr key={quote.id}>
                            <td className="py-2 px-2">{quote.id}</td>
                            <td className="py-2 px-2">{quote.packageName}</td>
                            <td className="py-2 px-2">{formatDate(quote.date)}</td>
                            <td className="py-2 px-2">{quote.totalPrice.toFixed(2)} TL</td>
                            <td className="py-2 px-2">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  quote.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : quote.status === "expired"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {quote.status === "approved"
                                  ? "Onaylandı"
                                  : quote.status === "expired"
                                  ? "Süresi Doldu"
                                  : "Beklemede"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Henüz teklif bulunmuyor</p>
                    <Button 
                      onClick={() => navigate("/packages")} 
                      variant="outline" 
                      className="mt-4"
                    >
                      Teklif Oluştur
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Raporlar */}
            <Card>
              <CardHeader>
                <CardTitle>Bakım Raporlarım</CardTitle>
                <CardDescription>
                  Santrallerinize ait bakım ve kontrol raporları
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p>Raporlar yükleniyor...</p>
                  </div>
                ) : reports.length > 0 ? (
                  <div className="space-y-3">
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-start justify-between border-b border-border pb-2 last:border-0"
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-2 rounded-full ${
                              report.type === "maintenance"
                                ? "bg-blue-100 text-blue-800"
                                : report.type === "inspection"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{report.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(report.date)}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Görüntüle
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">
                      Henüz rapor bulunmuyor
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

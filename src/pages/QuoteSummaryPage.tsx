
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { usePackage } from "@/contexts/PackageContext";
import { Button } from "@/components/ui/button";
import {
  Download,
  Mail,
  Calendar,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";

export default function QuoteSummaryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { quoteDetails, packages, selectedPackage } = usePackage();

  // Eğer teklif bilgisi yoksa, teklif sayfasına yönlendirme yapalım
  useEffect(() => {
    if (!quoteDetails) {
      navigate("/packages");
    }
  }, [quoteDetails, navigate]);

  if (!quoteDetails || !selectedPackage) {
    return (
      <MainLayout>
        <div className="container max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Teklif bilgisi bulunamadı</h1>
          <p className="mb-6 text-muted-foreground">
            Lütfen paket seçimi yaparak tekrar teklif oluşturunuz
          </p>
          <Button onClick={() => navigate("/packages")}>Paketleri İncele</Button>
        </div>
      </MainLayout>
    );
  }

  const pkg = packages.find((p) => p.id === quoteDetails.packageId);

  // Tarih formatlama için yardımcı fonksiyon
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDownloadPDF = () => {
    // PDF indirme simülasyonu - gerçek uygulamada PDF oluşturma kodu olacak
    console.log("PDF indirme işlemi başlatıldı");
    // PDF indirme simülasyonu - bekletip başarıyla tamamlandı mesajı gösteriyoruz
    setTimeout(() => {
      alert("Teklif PDF olarak indirildi!");
    }, 1500);
  };

  const handleSendEmail = () => {
    // E-posta gönderimi simülasyonu - gerçek uygulamada e-posta API'si kullanılacak
    console.log("E-posta gönderimi başlatıldı");
    // E-posta gönderimi simülasyonu - bekletip başarıyla tamamlandı mesajı gösteriyoruz
    setTimeout(() => {
      alert(`Teklifiniz ${quoteDetails.customerEmail} adresine gönderildi!`);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold">Teklifiniz Hazır!</h1>
          <p className="text-muted-foreground mt-2">
            GES bakım teklifiniz başarıyla oluşturuldu
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-border p-6 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary">GESBakım</h2>
              <p className="text-sm text-muted-foreground">Teklif Özeti</p>
            </div>
            <div className="text-right">
              <div className="text-sm">
                <span className="text-muted-foreground">Teklif No:</span>{" "}
                <span className="font-medium">
                  T{new Date(quoteDetails.quoteDate).getFullYear()}
                  {String(new Date(quoteDetails.quoteDate).getMonth() + 1).padStart(2, "0")}
                  {String(new Date(quoteDetails.quoteDate).getDate()).padStart(2, "0")}-
                  {quoteDetails.packageId.toUpperCase().substring(0, 3)}
                </span>
              </div>
              <div className="text-sm mt-1">
                <span className="text-muted-foreground">Tarih:</span>{" "}
                <span className="font-medium">
                  {formatDate(quoteDetails.quoteDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2 text-sm text-muted-foreground">
                MÜŞTERİ BİLGİLERİ
              </h3>
              <p className="font-medium">{quoteDetails.customerName}</p>
              {quoteDetails.companyName && <p>{quoteDetails.companyName}</p>}
              <p>{quoteDetails.customerEmail}</p>
              {quoteDetails.customerPhone && <p>{quoteDetails.customerPhone}</p>}
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm text-muted-foreground">
                SANTRAL BİLGİLERİ
              </h3>
              <p>
                <span className="font-medium">Kapasite:</span>{" "}
                {quoteDetails.plantCapacity} kWp
              </p>
              {quoteDetails.plantLocation && (
                <p>
                  <span className="font-medium">Lokasyon:</span>{" "}
                  {quoteDetails.plantLocation}
                </p>
              )}
              {quoteDetails.panelCount && (
                <p>
                  <span className="font-medium">Panel Sayısı:</span>{" "}
                  {quoteDetails.panelCount}
                </p>
              )}
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">PAKET BİLGİLERİ</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{pkg?.name}</p>
                <p className="text-sm text-muted-foreground">{pkg?.description}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {pkg?.price} TL/{pkg?.priceUnit}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">PAKET KAPSAMI</h3>
            <ul className="space-y-2">
              {pkg?.features.filter(f => f.included).map((feature) => (
                <li key={feature.id} className="flex items-start">
                  <CheckCircle2 className="text-secondary h-5 w-5 mr-2 mt-0.5 shrink-0" />
                  <span>
                    {feature.title}
                    {feature.frequency && (
                      <span className="text-muted-foreground text-sm ml-2">
                        ({feature.frequency})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">FİYATLANDIRMA</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Santralin Toplam Kapasitesi:</span>
                <span>{quoteDetails.plantCapacity} kWp</span>
              </div>
              <div className="flex justify-between">
                <span>Birim Fiyat:</span>
                <span>
                  {pkg?.price} TL/{pkg?.priceUnit}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ara Toplam:</span>
                <span>{quoteDetails.totalPrice.toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between">
                <span>KDV (%20):</span>
                <span>{(quoteDetails.totalPrice * 0.2).toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Genel Toplam:</span>
                <span>{(quoteDetails.totalPrice * 1.2).toFixed(2)} TL</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                Teklif son geçerlilik tarihi: {formatDate(quoteDetails.validUntil)}
              </span>
            </div>
            <div className="flex items-center">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              <span>
                Bu teklif tahmini olup, kesin fiyat için sahada inceleme gerekebilir.
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            className="flex-1"
            onClick={handleDownloadPDF}
            leftIcon={<Download className="mr-2 h-5 w-5" />}
          >
            <Download className="mr-2 h-5 w-5" />
            PDF İndir
          </Button>
          <Button
            className="flex-1"
            variant="secondary"
            onClick={handleSendEmail}
          >
            <Mail className="mr-2 h-5 w-5" />
            E-posta Gönder
          </Button>
        </div>

        <div className="text-center">
          <h3 className="font-semibold mb-2">Sonraki Adımlar</h3>
          <p className="text-muted-foreground mb-6">
            Ekibimiz en kısa sürede sizinle iletişime geçecektir.
            Sorularınız için bize ulaşabilirsiniz.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

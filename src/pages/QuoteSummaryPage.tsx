
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePackage } from "@/contexts/PackageContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Check, Download, FileText, Share2 } from "lucide-react";

export default function QuoteSummaryPage() {
  const { quoteDetails, selectedPackage } = usePackage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!quoteDetails || !selectedPackage) {
      navigate("/packages");
    }
  }, [quoteDetails, selectedPackage, navigate]);

  if (!quoteDetails || !selectedPackage) {
    return null;
  }

  const handleDownload = () => {
    toast.success("Teklif PDF olarak indiriliyor...");
    // PDF indirme işlemi burada gerçekleştirilecek
  };

  const handleShare = () => {
    toast.success("Teklif paylaşım linki kopyalandı!");
    // Paylaşım linki kopyalama işlemi burada gerçekleştirilecek
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <Check className="text-green-600 h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-800">Teklifiniz Başarıyla Oluşturuldu!</h2>
            <p className="text-green-700">
              Teklifiniz ekibimize iletildi. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Teklif Özeti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Paket Bilgileri</h3>
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Paket:</span>
                    <span className="font-medium">{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Birim Fiyat:</span>
                    <span className="font-medium">
                      {selectedPackage.price} TL/{selectedPackage.priceUnit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hizmetler:</span>
                    <span className="font-medium text-right">
                      {selectedPackage.features.slice(0, 3).join(", ")}
                      {selectedPackage.features.length > 3 && "..."}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Santral Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kapasite:</span>
                      <span className="font-medium">{quoteDetails.plantCapacity} kWp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Panel Sayısı:</span>
                      <span className="font-medium">
                        {quoteDetails.panelCount || "Belirtilmedi"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lokasyon:</span>
                      <span className="font-medium">
                        {quoteDetails.plantLocation || "Belirtilmedi"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Müşteri Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ad Soyad:</span>
                      <span className="font-medium">{quoteDetails.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">E-posta:</span>
                      <span className="font-medium">{quoteDetails.customerEmail}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Telefon:</span>
                      <span className="font-medium">
                        {quoteDetails.customerPhone || "Belirtilmedi"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Firma:</span>
                      <span className="font-medium">
                        {quoteDetails.companyName || "Belirtilmedi"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Fiyatlandırma</h3>
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Birim Fiyat:</span>
                    <span className="font-medium">
                      {selectedPackage.price} TL/{selectedPackage.priceUnit}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Kapasite:</span>
                    <span className="font-medium">{quoteDetails.plantCapacity} kWp</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Ara Toplam:</span>
                    <span className="font-medium">
                      {(selectedPackage.price * quoteDetails.plantCapacity).toFixed(2)} TL
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">KDV (%20):</span>
                    <span className="font-medium">
                      {(selectedPackage.price * quoteDetails.plantCapacity * 0.2).toFixed(2)} TL
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Genel Toplam:</span>
                    <span className="text-primary">
                      {(selectedPackage.price * quoteDetails.plantCapacity * 1.2).toFixed(2)} TL
                    </span>
                  </div>
                </div>
              </div>

              {quoteDetails.additionalNotes && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Ek Notlar</h3>
                    <p className="text-muted-foreground bg-muted p-4 rounded-md">
                      {quoteDetails.additionalNotes}
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            PDF İndir
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Teklifi Paylaş
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="secondary"
            className="flex-1"
          >
            <FileText className="mr-2 h-4 w-4" />
            Tekliflerim
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Bu teklif 30 gün süreyle geçerlidir. Detaylı bilgi için lütfen bizimle iletişime geçin.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

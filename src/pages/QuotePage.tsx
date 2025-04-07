
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChevronLeft } from "lucide-react";
import { usePackage } from "@/contexts/PackageContext";
import { NoPackageSelected } from "./quote/NoPackageSelected";
import { QuoteFormWrapper } from "./quote/QuoteFormWrapper";

export default function QuotePage() {
  const { selectedPackage } = usePackage();
  const navigate = useNavigate();

  if (!selectedPackage) {
    return (
      <MainLayout>
        <NoPackageSelected />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Button
          variant="ghost"
          size="sm"
          className="mb-8"
          onClick={() => navigate(`/package-detail/${selectedPackage.id}`)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Paket Detaylarına Dön
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Teklif Oluştur</h1>
          <p className="text-muted-foreground mt-2">
            {selectedPackage.name} paketi için teklif formu
          </p>
        </div>

        <QuoteFormWrapper selectedPackage={selectedPackage} />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Bu form üzerinden aldığınız teklif ön bilgilendirme amaçlıdır.
            Kesin fiyat için detaylı inceleme gerekebilir.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

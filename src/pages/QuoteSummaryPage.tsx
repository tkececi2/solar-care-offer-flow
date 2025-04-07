
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePackage } from "@/contexts/PackageContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QuoteConfirmationBanner } from "@/components/quote/QuoteConfirmationBanner";
import { QuotePackageInfo } from "@/components/quote/QuotePackageInfo";
import { QuotePlantInfo } from "@/components/quote/QuotePlantInfo";
import { QuoteCustomerInfo } from "@/components/quote/QuoteCustomerInfo";
import { QuotePricing } from "@/components/quote/QuotePricing";
import { QuoteNotes } from "@/components/quote/QuoteNotes";
import { QuoteActionButtons } from "@/components/quote/QuoteActionButtons";

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

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <QuoteConfirmationBanner />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Teklif Özeti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <QuotePackageInfo selectedPackage={selectedPackage} />

              <Separator />

              <QuotePlantInfo quoteDetails={quoteDetails} />

              <Separator />

              <QuoteCustomerInfo quoteDetails={quoteDetails} />

              <Separator />

              <QuotePricing 
                quoteDetails={quoteDetails} 
                selectedPackage={selectedPackage} 
              />

              {quoteDetails.additionalNotes && (
                <>
                  <Separator />
                  <QuoteNotes quoteDetails={quoteDetails} />
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <QuoteActionButtons />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Bu teklif 30 gün süreyle geçerlidir. Detaylı bilgi için lütfen bizimle iletişime geçin.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

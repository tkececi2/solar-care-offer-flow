
import { QuoteDetails } from "@/contexts/PackageContext";

interface QuoteCustomerInfoProps {
  quoteDetails: QuoteDetails;
}

export function QuoteCustomerInfo({ quoteDetails }: QuoteCustomerInfoProps) {
  return (
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
  );
}

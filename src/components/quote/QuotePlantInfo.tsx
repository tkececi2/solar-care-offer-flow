
import { QuoteDetails } from "@/contexts/PackageContext";

interface QuotePlantInfoProps {
  quoteDetails: QuoteDetails;
}

export function QuotePlantInfo({ quoteDetails }: QuotePlantInfoProps) {
  return (
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
  );
}

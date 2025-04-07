
import { QuoteDetails, ServicePackage } from "@/contexts/PackageContext";
import { Separator } from "@/components/ui/separator";

interface QuotePricingProps {
  quoteDetails: QuoteDetails;
  selectedPackage: ServicePackage;
}

export function QuotePricing({ quoteDetails, selectedPackage }: QuotePricingProps) {
  return (
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
  );
}


import { ServicePackage } from "@/contexts/PackageContext";

interface QuotePackageInfoProps {
  selectedPackage: ServicePackage;
}

export function QuotePackageInfo({ selectedPackage }: QuotePackageInfoProps) {
  return (
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
            {selectedPackage.features
              .filter(feature => feature.included)
              .slice(0, 3)
              .map(feature => feature.title)
              .join(", ")}
            {selectedPackage.features.length > 3 && "..."}
          </span>
        </div>
      </div>
    </div>
  );
}

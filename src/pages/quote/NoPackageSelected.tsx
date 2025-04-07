
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { usePackage } from "@/contexts/PackageContext";

export const NoPackageSelected = () => {
  const navigate = useNavigate();
  const { packages } = usePackage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-destructive/10 p-4 rounded-lg inline-flex items-center mb-6">
          <AlertTriangle className="text-destructive h-5 w-5 mr-2" />
          <span className="text-destructive">Henüz bir paket seçmediniz.</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Teklif oluşturmak için önce bir paket seçiniz</h2>
        
        <p className="text-muted-foreground mb-8">
          Aşağıdaki paketlerden size uygun olanı seçerek teklifinizi hemen oluşturabilirsiniz.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {packages.map((pkg) => (
            <Button 
              key={pkg.id}
              onClick={() => {
                navigate(`/package-detail/${pkg.id}`);
              }}
              variant={pkg.popular ? "default" : "outline"}
              className="h-auto py-3 flex flex-col items-center"
            >
              <span className="font-bold">{pkg.name}</span>
              <span className="text-xs mt-1">{pkg.price} TL/{pkg.priceUnit}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/packages")} variant="secondary">
            Tüm Paketleri Karşılaştır
          </Button>
        </div>
      </div>
    </div>
  );
};

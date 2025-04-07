
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Package, CheckCircle } from "lucide-react";
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
        
        {packages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all ${
                    pkg.popular ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  {pkg.popular && (
                    <div className="flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full py-1 px-3 mb-3 mx-auto w-fit">
                      En Popüler
                    </div>
                  )}
                  <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
                  <p className="text-2xl font-bold mb-2">{pkg.price} TL<span className="text-xs font-normal text-muted-foreground">/{pkg.priceUnit}</span></p>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  
                  <div className="space-y-2 text-sm mb-4">
                    {pkg.features.slice(0, 3).map((feature) => (
                      <div key={feature.id} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle className="text-primary h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        ) : (
                          <span className="h-4 w-4 mr-2"></span>
                        )}
                        <span className={!feature.included ? "text-muted-foreground/70" : ""}>
                          {feature.title}
                        </span>
                      </div>
                    ))}
                    
                    {pkg.features.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{pkg.features.length - 3} daha fazla özellik
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => navigate(`/package-detail/${pkg.id}`)}
                      variant="outline"
                      className="w-full"
                    >
                      Detayları Gör
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        navigate(`/package-detail/${pkg.id}`);
                      }}
                      className="w-full"
                    >
                      Teklif Al
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/packages")} variant="secondary" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                <span>Tüm Paketleri Karşılaştır</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="mb-4">Şu anda görüntülenecek paket bulunmamaktadır.</p>
            <Button onClick={() => navigate("/")}>
              Ana Sayfaya Dön
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

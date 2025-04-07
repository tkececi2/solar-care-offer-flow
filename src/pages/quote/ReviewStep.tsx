
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ServicePackage } from "@/contexts/PackageContext";
import { ChevronLeft } from "lucide-react";

interface ReviewStepProps {
  form: UseFormReturn<any>;
  selectedPackage: ServicePackage;
  onPrevStep: () => void;
  onSubmit: () => void;
}

export const ReviewStep = ({ form, selectedPackage, onPrevStep, onSubmit }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Teklif Özeti</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-muted-foreground mb-2">Paket Bilgileri</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Paket:</span>
                <span className="font-medium">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Birim Fiyat:</span>
                <span className="font-medium">
                  {selectedPackage.price} TL/{selectedPackage.priceUnit}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-muted-foreground mb-2">Santral Bilgileri</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Kapasite:</span>
                <span className="font-medium">
                  {form.watch("plantCapacity")} kWp
                </span>
              </div>
              <div className="flex justify-between">
                <span>Lokasyon:</span>
                <span className="font-medium">
                  {form.watch("plantLocation") || "Belirtilmedi"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Panel Sayısı:</span>
                <span className="font-medium">
                  {form.watch("panelCount") || "Belirtilmedi"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-muted-foreground mb-2">Müşteri Bilgileri</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Ad Soyad:</span>
                <span className="font-medium">{form.watch("customerName")}</span>
              </div>
              <div className="flex justify-between">
                <span>E-posta:</span>
                <span className="font-medium">{form.watch("customerEmail")}</span>
              </div>
              <div className="flex justify-between">
                <span>Telefon:</span>
                <span className="font-medium">
                  {form.watch("customerPhone") || "Belirtilmedi"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Firma:</span>
                <span className="font-medium">
                  {form.watch("companyName") || "Belirtilmedi"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-muted-foreground mb-2">Fiyatlandırma</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Toplam Fiyat:</span>
                <span className="font-bold">
                  {(selectedPackage.price * (form.watch("plantCapacity") || 0)).toFixed(2)} TL
                </span>
              </div>
              <div className="flex justify-between">
                <span>KDV:</span>
                <span className="font-medium">
                  +%20
                </span>
              </div>
              <div className="flex justify-between">
                <span>Genel Toplam:</span>
                <span className="font-bold text-primary">
                  {(selectedPackage.price * (form.watch("plantCapacity") || 0) * 1.2).toFixed(2)} TL
                </span>
              </div>
            </div>
          </div>
        </div>

        {form.watch("additionalNotes") && (
          <div className="mt-6">
            <h3 className="font-medium text-muted-foreground mb-2">Ek Notlar</h3>
            <p className="text-sm p-3 bg-muted rounded-md">
              {form.watch("additionalNotes")}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevStep}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>
        <Button 
          type="button"
          onClick={onSubmit}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          Teklifi Onayla
        </Button>
      </div>
    </div>
  );
};

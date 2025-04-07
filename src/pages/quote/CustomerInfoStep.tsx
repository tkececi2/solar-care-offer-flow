
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomerInfoStepProps {
  form: UseFormReturn<any>;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const CustomerInfoStep = ({ form, onPrevStep, onNextStep }: CustomerInfoStepProps) => {
  const handleContinue = () => {
    form.trigger(["customerName", "customerEmail"]).then((isValid) => {
      if (isValid) {
        onNextStep();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Müşteri Bilgileri</h2>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Soyad *</FormLabel>
                <FormControl>
                  <Input placeholder="Ahmet Yılmaz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta *</FormLabel>
                <FormControl>
                  <Input placeholder="ornek@firma.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input placeholder="05xx xxx xx xx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firma Adı</FormLabel>
                <FormControl>
                  <Input placeholder="ABC Enerji Ltd. Şti." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ek Notlar</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Teklif ile ilgili belirtmek istediğiniz diğer bilgiler..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
          onClick={handleContinue}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          Devam Et
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

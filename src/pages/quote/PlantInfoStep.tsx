
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { ServicePackage } from "@/contexts/PackageContext";

interface PlantInfoStepProps {
  form: UseFormReturn<any>;
  selectedPackage: ServicePackage;
  onNextStep: () => void;
}

export const PlantInfoStep = ({ form, selectedPackage, onNextStep }: PlantInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Santral Bilgileri</h2>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="plantCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Santral Kapasitesi (kWp) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription>
                  Santralinizin kurulu gücünü kWp cinsinden giriniz
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plantLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Santral Lokasyonu</FormLabel>
                <FormControl>
                  <Input placeholder="İzmir, Türkiye" {...field} />
                </FormControl>
                <FormDescription>
                  Santralinizin bulunduğu şehir veya ilçeyi giriniz
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panelCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Panel Sayısı</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="180"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <PriceCalculator 
        plantCapacity={form.watch("plantCapacity") || 0} 
        pricePerKwp={selectedPackage.price} 
      />

      <div className="flex justify-end">
        <Button type="button" onClick={onNextStep}>
          Devam Et
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface PriceCalculatorProps {
  plantCapacity: number;
  pricePerKwp: number;
}

export const PriceCalculator = ({ plantCapacity, pricePerKwp }: PriceCalculatorProps) => {
  return (
    <div className="bg-primary/5 rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-medium">Tahmini Fiyat:</p>
        <p className="text-sm text-muted-foreground">
          {pricePerKwp} TL/kWp * {plantCapacity} kWp
        </p>
      </div>
      <div className="text-xl font-bold">
        {(pricePerKwp * plantCapacity).toFixed(2)} TL
      </div>
    </div>
  );
};

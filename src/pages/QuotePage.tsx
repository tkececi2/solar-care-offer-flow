
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { usePackage } from "@/contexts/PackageContext";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Form validation schema
const formSchema = z.object({
  customerName: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  customerEmail: z.string().email("Geçerli bir e-posta adresi giriniz"),
  customerPhone: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır").optional(),
  companyName: z.string().optional(),
  plantCapacity: z.number().min(1, "Santral kapasitesi en az 1 kWp olmalıdır"),
  plantLocation: z.string().min(2, "Santral lokasyonu giriniz").optional(),
  panelCount: z.number().optional(),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Teklif adımları için tip tanımı
type QuoteStep = "plant-info" | "customer-info" | "review";

export default function QuotePage() {
  const { user } = useAuth();
  const { selectedPackage, createQuote } = usePackage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<QuoteStep>("plant-info");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: user?.name || "",
      customerEmail: user?.email || "",
      customerPhone: user?.phone || "",
      companyName: user?.company || "",
      plantCapacity: user?.plantDetails?.capacity || 0,
      plantLocation: user?.plantDetails?.location || "",
      panelCount: user?.plantDetails?.panelCount || 0,
      additionalNotes: "",
    },
  });

  if (!selectedPackage) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-destructive/10 p-4 rounded-lg inline-flex items-center mb-6">
            <AlertTriangle className="text-destructive h-5 w-5 mr-2" />
            <span className="text-destructive">Lütfen önce bir paket seçiniz.</span>
          </div>
          <Button onClick={() => navigate("/packages")}>Paketleri İncele</Button>
        </div>
      </MainLayout>
    );
  }

  const handleStepChange = (direction: "next" | "prev") => {
    const steps: QuoteStep[] = ["plant-info", "customer-info", "review"];
    const currentIndex = steps.indexOf(currentStep);

    if (direction === "next" && currentIndex < steps.length - 1) {
      // İleri giderken form validasyonu yapalım
      form.trigger().then((isValid) => {
        if (isValid) {
          setCurrentStep(steps[currentIndex + 1]);
        }
      });
    } else if (direction === "prev" && currentIndex > 0) {
      // Geri giderken validasyon gerekmez
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (currentStep !== "review") {
      handleStepChange("next");
      return;
    }

    createQuote(data);
    toast.success("Teklifiniz başarıyla oluşturuldu!");
    navigate("/quote-summary");
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Button
          variant="ghost"
          size="sm"
          className="mb-8"
          onClick={() => navigate(`/package-detail/${selectedPackage.id}`)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Paket Detaylarına Dön
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Teklif Oluştur</h1>
          <p className="text-muted-foreground mt-2">
            {selectedPackage.name} paketi için teklif formu
          </p>
        </div>

        <div className="mb-12">
          <div className="progress-steps">
            <div className="step">
              <div className={`step-circle ${currentStep === "plant-info" ? "active" : currentStep === "customer-info" || currentStep === "review" ? "complete" : ""}`}>
                1
              </div>
              <div className="text-xs mt-2">Santral Bilgileri</div>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`step-line ${currentStep === "customer-info" || currentStep === "review" ? "complete" : ""}`}></div>
            </div>
            <div className="step">
              <div className={`step-circle ${currentStep === "customer-info" ? "active" : currentStep === "review" ? "complete" : ""}`}>
                2
              </div>
              <div className="text-xs mt-2">Müşteri Bilgileri</div>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`step-line ${currentStep === "review" ? "complete" : ""}`}></div>
            </div>
            <div className="step">
              <div className={`step-circle ${currentStep === "review" ? "active" : ""}`}>
                3
              </div>
              <div className="text-xs mt-2">Teklif Onayı</div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Santral Bilgileri */}
            {currentStep === "plant-info" && (
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

                {/* Toplam Fiyat Hesaplama */}
                <div className="bg-primary/5 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Tahmini Fiyat:</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedPackage.price} TL/kWp * {form.watch("plantCapacity") || 0} kWp
                    </p>
                  </div>
                  <div className="text-xl font-bold">
                    {(selectedPackage.price * (form.watch("plantCapacity") || 0)).toFixed(2)} TL
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={() => handleStepChange("next")}>
                    Devam Et
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Müşteri Bilgileri */}
            {currentStep === "customer-info" && (
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
                    onClick={() => handleStepChange("prev")}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Geri
                  </Button>
                  <Button type="button" onClick={() => handleStepChange("next")}>
                    Devam Et
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Teklif Onayı */}
            {currentStep === "review" && (
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
                    onClick={() => handleStepChange("prev")}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Geri
                  </Button>
                  <Button type="submit">
                    Teklifi Onayla
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Bu form üzerinden aldığınız teklif ön bilgilendirme amaçlıdır.
            Kesin fiyat için detaylı inceleme gerekebilir.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

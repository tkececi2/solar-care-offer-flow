
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { usePackage } from "@/contexts/PackageContext";
import { useNavigate } from "react-router-dom";
import { StepIndicator } from "./StepIndicator";
import { PlantInfoStep } from "./PlantInfoStep";
import { CustomerInfoStep } from "./CustomerInfoStep";
import { ReviewStep } from "./ReviewStep";
import { toast } from "sonner";

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
type QuoteStep = "plant-info" | "customer-info" | "review";

interface QuoteFormWrapperProps {
  selectedPackage: any;
}

export const QuoteFormWrapper = ({ selectedPackage }: QuoteFormWrapperProps) => {
  const { user } = useAuth();
  const { createQuote } = usePackage();
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
    <>
      <StepIndicator currentStep={currentStep} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === "plant-info" && (
            <PlantInfoStep 
              form={form} 
              selectedPackage={selectedPackage}
              onNextStep={() => handleStepChange("next")} 
            />
          )}

          {currentStep === "customer-info" && (
            <CustomerInfoStep 
              form={form} 
              onPrevStep={() => handleStepChange("prev")}
              onNextStep={() => handleStepChange("next")}
            />
          )}

          {currentStep === "review" && (
            <ReviewStep 
              form={form} 
              selectedPackage={selectedPackage}
              onPrevStep={() => handleStepChange("prev")}
              onSubmit={form.handleSubmit(onSubmit)}
            />
          )}
        </form>
      </Form>
    </>
  );
};

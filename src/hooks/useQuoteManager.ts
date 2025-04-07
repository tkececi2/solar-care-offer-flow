
import { useState } from "react";
import { QuoteDetails, ServicePackage } from "@/contexts/PackageContext";
import { createAndSaveQuote } from "@/services/quoteService";
import { toast } from "sonner";

export const useQuoteManager = (userId?: string) => {
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);

  // Teklif oluşturma
  const createQuote = async (
    selectedPackage: ServicePackage, 
    details: Partial<QuoteDetails>
  ) => {
    if (!selectedPackage || !userId) {
      toast.error("Teklif oluşturulamadı. Lütfen tekrar giriş yapın.");
      return null;
    }
    
    try {
      const newQuote = await createAndSaveQuote(selectedPackage, details, userId);
      setQuoteDetails(newQuote);
      toast.success("Teklifiniz başarıyla oluşturuldu!");
      return newQuote;
    } catch (error) {
      console.error("Teklif oluşturma hatası:", error);
      toast.error("Teklif oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.");
      return null;
    }
  };

  // Teklifi temizleme
  const clearQuote = () => {
    setQuoteDetails(null);
  };

  return {
    quoteDetails,
    createQuote,
    clearQuote
  };
};

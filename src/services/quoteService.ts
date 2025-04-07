
import { ServicePackage, QuoteDetails } from "@/contexts/PackageContext";
import { sendQuoteToOwner, formatQuoteForEmail } from "@/utils/quoteNotifications";
import { toast } from "sonner";

// Teklif oluşturma ve saklama hizmetleri
export const createAndSaveQuote = async (
  selectedPackage: ServicePackage, 
  details: Partial<QuoteDetails>,
  userId: string
): Promise<QuoteDetails> => {
  // Teklif geçerlilik tarihi oluşturma (30 gün)
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);

  // Toplam fiyat hesaplama
  const totalPrice = selectedPackage.price * (details.plantCapacity || 0);

  // Yeni teklif oluşturma
  const newQuote: QuoteDetails = {
    packageId: selectedPackage.id,
    customerName: details.customerName || "",
    customerEmail: details.customerEmail || "",
    customerPhone: details.customerPhone,
    companyName: details.companyName,
    plantCapacity: details.plantCapacity || 0,
    plantLocation: details.plantLocation,
    panelCount: details.panelCount,
    additionalNotes: details.additionalNotes,
    totalPrice: totalPrice,
    quoteDate: new Date(),
    validUntil: validUntil,
    userId: userId
  };

  // Local storage için teklif objesi
  const quoteForStorage = {
    id: `Q${new Date().getTime().toString().slice(-6)}`,
    packageName: selectedPackage.name,
    date: newQuote.quoteDate,
    status: "approved",
    totalPrice: totalPrice * 1.2, // KDV dahil fiyat (%20)
    packageId: selectedPackage.id,
    plantCapacity: details.plantCapacity || 0,
    userId: userId
  };

  // Yerel depolamadan teklifleri alma
  const storedQuotes = localStorage.getItem('userQuotes');
  let quotes = storedQuotes ? JSON.parse(storedQuotes) : [];
  
  // Yeni teklifi dizinin başına ekle
  quotes = [quoteForStorage, ...quotes];
  
  // Güncellenmiş teklif listesini yerel depolamaya kaydet
  localStorage.setItem('userQuotes', JSON.stringify(quotes));
  
  try {
    // E-posta için teklif verisini biçimlendirme
    const formattedQuote = formatQuoteForEmail(newQuote, selectedPackage);
    
    // Teklif bildirimini gönder
    await sendQuoteToOwner({
      ...formattedQuote,
      quoteData: newQuote,
      packageData: selectedPackage
    });
    
    console.log("Teklif başarıyla site sahibine gönderildi");
  } catch (error) {
    console.error("Teklif bildirimi gönderimi hatası:", error);
    toast.error("Teklifiniz kaydedildi ancak e-posta bildirimi gönderilemedi.");
  }
  
  return newQuote;
};

// Kullanıcının tekliflerini getirme
export const getUserQuotes = (userId: string): any[] => {
  const storedQuotes = localStorage.getItem('userQuotes');
  if (!storedQuotes) return [];
  
  // Tüm teklifleri parse et ve sadece bu kullanıcıya ait olanları filtele
  const allQuotes = JSON.parse(storedQuotes);
  return allQuotes.filter((quote: any) => quote.userId === userId);
};


// This file contains utilities for sending quote notifications to the site owner

/**
 * Sends the quote to the site owner
 * Note: This is a mock implementation. In a production environment,
 * this would connect to a backend service or API to send emails.
 */
export const sendQuoteToOwner = (quoteDetails: any) => {
  // Log the notification (for demonstration purposes)
  console.log('Quote notification would be sent to site owner:', quoteDetails);
  
  // In a real implementation with Supabase or another backend:
  // 1. This would call an API endpoint or serverless function
  // 2. The backend would handle sending an email to the site owner
  // 3. It might also store the quote in a database for the owner's dashboard
  
  return {
    success: true,
    message: 'Quote notification sent successfully (mock)'
  };
};

/**
 * Formats quote data for email
 */
export const formatQuoteForEmail = (quoteDetails: any, packageDetails: any) => {
  const quoteDate = new Date(quoteDetails.quoteDate).toLocaleDateString('tr-TR');
  
  return {
    subject: `Yeni Teklif: ${packageDetails.name} - ${quoteDetails.customerName}`,
    body: `
      Yeni Teklif Bilgisi:
      
      Paket: ${packageDetails.name}
      Müşteri: ${quoteDetails.customerName}
      Email: ${quoteDetails.customerEmail}
      Telefon: ${quoteDetails.customerPhone || "Belirtilmedi"}
      Firma: ${quoteDetails.companyName || "Belirtilmedi"}
      
      Santral Bilgileri:
      - Kapasite: ${quoteDetails.plantCapacity} kWp
      - Lokasyon: ${quoteDetails.plantLocation || "Belirtilmedi"}
      - Panel Sayısı: ${quoteDetails.panelCount || "Belirtilmedi"}
      
      Fiyatlandırma:
      - Toplam Fiyat: ${quoteDetails.totalPrice.toFixed(2)} TL
      - KDV Dahil: ${(quoteDetails.totalPrice * 1.2).toFixed(2)} TL
      
      Oluşturulma Tarihi: ${quoteDate}
      
      ${quoteDetails.additionalNotes ? `Ek Notlar: ${quoteDetails.additionalNotes}` : ""}
    `.trim()
  };
};


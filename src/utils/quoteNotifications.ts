
// This file contains utilities for sending quote notifications to the site owner
import emailjs from '@emailjs/browser';

// EmailJS servis bilgileri
const EMAIL_SERVICE_ID = 'service_d04w8b5';  // EmailJS Dashboard'dan alınan service ID
const EMAIL_TEMPLATE_ID = 'template_4f9cnr1';  // EmailJS Dashboard'dan alınan template ID
const EMAIL_USER_ID = 'Vx2iP4szPar7xhQWi';  // EmailJS Dashboard'dan alınan public key

/**
 * Sends the quote to the site owner using EmailJS
 */
export const sendQuoteToOwner = async (quoteDetails: any) => {
  try {
    console.log('Sending quote notification to site owner:', quoteDetails);
    
    // EmailJS ile e-posta gönderimi
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      {
        subject: quoteDetails.subject,
        message: quoteDetails.body,
        to_email: 'site.owner@example.com', // Site sahibinin gerçek e-posta adresi
      },
      EMAIL_USER_ID
    );

    console.log('Email sent successfully:', response);
    return {
      success: true,
      message: 'Teklif bildirimi başarıyla gönderildi'
    };
  } catch (error) {
    console.error('Failed to send quote notification:', error);
    return {
      success: false,
      message: 'Teklif bildirimi gönderilirken bir hata oluştu'
    };
  }
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

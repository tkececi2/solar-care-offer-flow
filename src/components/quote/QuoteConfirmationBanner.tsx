
import { Check, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { initEmailJS } from "@/utils/quoteNotifications";

export function QuoteConfirmationBanner() {
  const [emailStatus, setEmailStatus] = useState<'pending' | 'success' | 'error'>('pending');
  
  useEffect(() => {
    // Initialize EmailJS when component mounts
    try {
      initEmailJS();
      setEmailStatus('success');
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
      setEmailStatus('error');
    }
  }, []);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 flex items-center">
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
        <Check className="text-green-600 h-6 w-6" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-green-800">Teklifiniz Başarıyla Oluşturuldu!</h2>
        <p className="text-green-700 mb-1">
          Teklifiniz ekibimize iletildi. En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        {emailStatus === 'success' ? (
          <p className="text-sm text-green-600">
            Teklifiniz EmailJS üzerinden site yöneticisine e-posta olarak iletilmiştir.
          </p>
        ) : emailStatus === 'error' ? (
          <div className="flex items-center text-sm text-amber-600 mt-1">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span>E-posta gönderiminde bir sorun oluştu, ancak teklifiniz kaydedildi.</span>
          </div>
        ) : (
          <p className="text-sm text-green-600">
            E-posta gönderimi işlemi devam ediyor...
          </p>
        )}
      </div>
    </div>
  );
}

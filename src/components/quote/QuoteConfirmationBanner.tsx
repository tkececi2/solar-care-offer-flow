
import { Check } from "lucide-react";

export function QuoteConfirmationBanner() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 flex items-center">
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
        <Check className="text-green-600 h-6 w-6" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-green-800">Teklifiniz Başarıyla Oluşturuldu!</h2>
        <p className="text-green-700">
          Teklifiniz ekibimize iletildi. En kısa sürede sizinle iletişime geçeceğiz.
        </p>
      </div>
    </div>
  );
}

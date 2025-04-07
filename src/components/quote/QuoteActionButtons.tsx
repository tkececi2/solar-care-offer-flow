
import { Button } from "@/components/ui/button";
import { Download, FileText, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function QuoteActionButtons() {
  const navigate = useNavigate();
  
  const handleDownload = () => {
    toast.success("Teklif PDF olarak indiriliyor...");
    // PDF indirme işlemi burada gerçekleştirilecek
  };

  const handleShare = () => {
    toast.success("Teklif paylaşım linki kopyalandı!");
    // Paylaşım linki kopyalama işlemi burada gerçekleştirilecek
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button onClick={handleDownload} className="flex-1">
        <Download className="mr-2 h-4 w-4" />
        PDF İndir
      </Button>
      <Button onClick={handleShare} variant="outline" className="flex-1">
        <Share2 className="mr-2 h-4 w-4" />
        Teklifi Paylaş
      </Button>
      <Button
        onClick={() => navigate("/dashboard")}
        variant="secondary"
        className="flex-1"
      >
        <FileText className="mr-2 h-4 w-4" />
        Tekliflerim
      </Button>
    </div>
  );
}

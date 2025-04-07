
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export const NoPackageSelected = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="bg-destructive/10 p-4 rounded-lg inline-flex items-center mb-6">
        <AlertTriangle className="text-destructive h-5 w-5 mr-2" />
        <span className="text-destructive">Lütfen önce bir paket seçiniz.</span>
      </div>
      <Button onClick={() => navigate("/packages")}>Paketleri İncele</Button>
    </div>
  );
};

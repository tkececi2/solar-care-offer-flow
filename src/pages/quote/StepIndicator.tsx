
import React from "react";

type QuoteStep = "plant-info" | "customer-info" | "review";

interface StepIndicatorProps {
  currentStep: QuoteStep;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        <div className={`flex flex-col items-center ${currentStep === "plant-info" ? "text-orange-600 font-medium" : currentStep === "customer-info" || currentStep === "review" ? "text-orange-600" : "text-gray-400"}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === "plant-info" ? "bg-orange-600 text-white" : currentStep === "customer-info" || currentStep === "review" ? "bg-orange-100 text-orange-600 border-2 border-orange-600" : "bg-gray-100 text-gray-400"}`}>
            1
          </div>
          <span className="text-xs">Santral Bilgileri</span>
        </div>
        
        <div className={`h-1 flex-1 mx-2 ${currentStep === "customer-info" || currentStep === "review" ? "bg-orange-600" : "bg-gray-200"}`}></div>
        
        <div className={`flex flex-col items-center ${currentStep === "customer-info" ? "text-orange-600 font-medium" : currentStep === "review" ? "text-orange-600" : "text-gray-400"}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === "customer-info" ? "bg-orange-600 text-white" : currentStep === "review" ? "bg-orange-100 text-orange-600 border-2 border-orange-600" : "bg-gray-100 text-gray-400"}`}>
            2
          </div>
          <span className="text-xs">Müşteri Bilgileri</span>
        </div>
        
        <div className={`h-1 flex-1 mx-2 ${currentStep === "review" ? "bg-orange-600" : "bg-gray-200"}`}></div>
        
        <div className={`flex flex-col items-center ${currentStep === "review" ? "text-orange-600 font-medium" : "text-gray-400"}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === "review" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-400"}`}>
            3
          </div>
          <span className="text-xs">Teklif Onayı</span>
        </div>
      </div>
    </div>
  );
};


import React from "react";

type QuoteStep = "plant-info" | "customer-info" | "review";

interface StepIndicatorProps {
  currentStep: QuoteStep;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="mb-12">
      <div className="progress-steps">
        <div className="step">
          <div className={`step-circle ${currentStep === "plant-info" ? "active" : currentStep === "customer-info" || currentStep === "review" ? "complete" : ""}`}>
            1
          </div>
          <div className="text-xs mt-2">Santral Bilgileri</div>
        </div>
        <div className="flex-1 flex items-center">
          <div className={`step-line ${currentStep === "customer-info" || currentStep === "review" ? "complete" : ""}`}></div>
        </div>
        <div className="step">
          <div className={`step-circle ${currentStep === "customer-info" ? "active" : currentStep === "review" ? "complete" : ""}`}>
            2
          </div>
          <div className="text-xs mt-2">Müşteri Bilgileri</div>
        </div>
        <div className="flex-1 flex items-center">
          <div className={`step-line ${currentStep === "review" ? "complete" : ""}`}></div>
        </div>
        <div className="step">
          <div className={`step-circle ${currentStep === "review" ? "active" : ""}`}>
            3
          </div>
          <div className="text-xs mt-2">Teklif Onayı</div>
        </div>
      </div>
    </div>
  );
};

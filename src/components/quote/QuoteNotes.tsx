
import { QuoteDetails } from "@/contexts/PackageContext";

interface QuoteNotesProps {
  quoteDetails: QuoteDetails;
}

export function QuoteNotes({ quoteDetails }: QuoteNotesProps) {
  if (!quoteDetails.additionalNotes) {
    return null;
  }
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Ek Notlar</h3>
      <p className="text-muted-foreground bg-muted p-4 rounded-md">
        {quoteDetails.additionalNotes}
      </p>
    </div>
  );
}

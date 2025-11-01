

"use client";

import { useParams } from "next/navigation";
import EditQuotationForm from "@/modules/sales//QuotationEditForm";

export default function Page() {
  const params = useParams();
  const quotationNumber = params.id; // e.g., "Q-1234"

  return <EditQuotationForm quotationNumber={quotationNumber} />;
}

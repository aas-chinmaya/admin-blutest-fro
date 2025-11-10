// // ProposalContent.jsx
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   DollarSign,
//   CheckCircle2,
//   Send,
//   CheckSquare,
// } from "lucide-react";

// export default function ProposalContent({

// }) {
//   return (
//     <div className="space-y-6">
   

//     </div>
//   );
// }



"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, PlusCircle, Loader2 } from "lucide-react";

export default function ProposalContent() {
  const [momExists, setMomExists] = useState(null); // null = loading, true/false = status
  const [loading, setLoading] = useState(false);

  // 🧩 Simulate checking MoM existence (replace with real API later)
  useEffect(() => {
    async function checkMomStatus() {
      setLoading(true);
      try {
        // Example: call your backend API to check if a MoM exists
        // const res = await fetch(`/api/mom/check?meetingId=MEET-001`);
        // const data = await res.json();
        // setMomExists(data.exists);

        // 🔹 Mock behavior — assume no MoM exists
        setTimeout(() => {
          setMomExists(false);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error("Error checking MoM:", err);
        setMomExists(false);
        setLoading(false);
      }
    }
    checkMomStatus();
  }, []);

  const handleCreateQuotation = () => {
    alert("Quotation request creation started (connect your logic here)");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Quotation Request
        </h2>

        {loading ? (
          <Badge variant="outline" className="flex items-center gap-1">
            <Loader2 className="animate-spin w-3 h-3" />
            Checking...
          </Badge>
        ) : momExists ? (
          <Badge variant="success">MoM Created</Badge>
        ) : (
          <Badge variant="destructive">No MoM Found</Badge>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        {loading ? (
          <p className="text-gray-500 text-sm">Checking MoM status...</p>
        ) : momExists ? (
          <p className="text-gray-600 text-sm">
            A MoM is already created for this meeting. You can now proceed with proposal actions.
          </p>
        ) : (
          <div className="flex flex-col gap-4 items-start">
            <p className="text-gray-600 text-sm">
              No Minutes of Meeting (MoM) found. You need to create one before proceeding.
            </p>
            <Button
              onClick={handleCreateQuotation}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Create Quotation Request
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

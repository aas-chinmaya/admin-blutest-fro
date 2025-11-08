// ProposalContent.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  CheckCircle2,
  Send,
  CheckSquare,
} from "lucide-react";

export default function ProposalContent({
  selectedMeeting,
  meetingEnded,
  hasMOM,
  hasQuotation,
  updateStatus,
  setShowQuotation,
  quotation,
  handleSendQuotation,
  handleAgreement,
  feedback,
  setFeedback,
  handleFeedbackSubmit,
  formatDate,
}) {
  const isCompleted = selectedMeeting?.meetingStatus === "completed";
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {isCompleted && meetingEnded && hasMOM && !hasQuotation && (
          <Button
            className="w-full justify-start"
            onClick={() => setShowQuotation(true)}
            disabled={updateStatus === "loading"}
          >
            <DollarSign className="w-4 h-4 mr-2" /> Create Quotation
          </Button>
        )}

        {hasQuotation && (
          <>
            <Button className="w-full justify-start" variant="outline" disabled>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Quotation Created
            </Button>
            {quotation.status !== "sent" && (
              <Button
                className="w-full justify-start"
                onClick={handleSendQuotation}
              >
                <Send className="w-4 h-4 mr-2" /> Send Quotation
              </Button>
            )}
            {quotation.status === "sent" && !quotation.clientAgreed && (
              <Button
                className="w-full justify-start"
                onClick={handleAgreement}
              >
                <CheckSquare className="w-4 h-4 mr-2" /> Client Agreed
              </Button>
            )}
          </>
        )}
      </div>

      {isCompleted && meetingEnded && hasQuotation && quotation.status === "sent" && !quotation.feedback && (
        <div className="space-y-2">
          <Label>Feedback</Label>
          <div className="flex gap-2">
            <Textarea
              placeholder="Enter client feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleFeedbackSubmit} disabled={!feedback.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {hasQuotation && (
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">Quotation</h3>
          <p className="text-sm font-medium">{quotation.title || "Untitled Quotation"}</p>
          <p className="text-xl font-bold text-purple-700">
            ${quotation.amount.toLocaleString()} {quotation.currency}
          </p>
          <p className="text-sm text-gray-600">
            Valid until {quotation.validUntil ? formatDate(quotation.validUntil) : "N/A"}
          </p>
          {quotation.feedback && (
            <p className="text-sm mt-2 italic">Feedback: {quotation.feedback}</p>
          )}
          {quotation.clientAgreed && (
            <Badge className="mt-2 bg-green-600">Client Agreed</Badge>
          )}
        </div>
      )}
    </div>
  );
}
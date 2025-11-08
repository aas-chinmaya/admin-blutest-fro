"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, History, Plus } from "lucide-react";

export default function MomContent({ meetingId }) {
  return (
    <div className="min-h-screen w-full space-y-6">
      {/* ================= HEADER / ACTION BAR ================= */}
      <div className="w-full flex flex-wrap gap-3 items-center justify-between border-b pb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
          Minutes of Meeting (MOM)
        </h2>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-1" /> Create MOM
          </Button>
        </div>
      </div>

      {/* ================= MAIN CONTENT (2 Columns) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-6">
        {/* LEFT COLUMN — MOM Content */}
        <div className="space-y-6 text-sm leading-relaxed">
          {/* Meeting Summary Section */}
          <section className=" pt-4">
            <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              Meeting Summary
            </h3>
            <p className="text-gray-600">
              Summary details will appear here once MOM is created.
            </p>
          </section>
          {/* MOM Status Card */}
          <div className="w-full bg-gray-100 p-4 rounded-md text-gray-600">
            <p>No Minutes of Meeting (MOM) data available yet.</p>
          </div>


  
        </div>

        {/* RIGHT COLUMN — History */}
        <aside className="lg:border-l lg:pl-6 space-y-3 text-sm">
          <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <History className="w-5 h-5" /> History
          </h3>

          {/* Placeholder for now since no data */}
          <p className="text-gray-500">No MOM history available.</p>
        </aside>
      </div>
    </div>
  );
}

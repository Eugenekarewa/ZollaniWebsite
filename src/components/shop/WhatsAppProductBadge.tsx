import React from "react";
import { MessageCircle, Clock } from "lucide-react";

interface WhatsAppProductBadgeProps {
  senderPhone?: string;
  createdAt?: string;
}

export function WhatsAppProductBadge({ 
  senderPhone, 
  createdAt 
}: WhatsAppProductBadgeProps) {
  if (!senderPhone && !createdAt) return null;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
      <MessageCircle className="h-3.5 w-3.5" />
      <span>Posted via WhatsApp</span>
      {senderPhone && (
        <span className="hidden sm:inline">• {senderPhone}</span>
      )}
      {createdAt && (
        <span className="hidden sm:inline">• {new Date(createdAt).toLocaleDateString()}</span>
      )}
    </div>
  );
}
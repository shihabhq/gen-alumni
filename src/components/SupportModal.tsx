// SupportModal.tsx
import React, { useState } from "react";
import { X, Copy, Check } from "lucide-react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bkashNumber = "01928316192";
  const nagadNumber = "01928316192";

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Support Our Initiative
          </h2>

          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            The website needs around <strong>1200BDT</strong> worth of server
            running each month. To help us run this initiative further, your
            support is very valuable for the whole community.
          </p>

          {/* Payment Options */}
          <div className="grid grid-cols-1  gap-4">
            {/* bKash */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors">
              <div className="flex items-center gap-4">
                {/* Left: Big Logo */}
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0">
                  {/* <span className="text-white font-bold text-xl">bKash</span> */}
                  <img src="/bkash.png" className="w-full" alt="" />
                </div>

                {/* Right: Text and Number */}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    bKash Personal
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-mono text-base font-semibold text-gray-800">
                      {bkashNumber}
                    </p>
                    <button
                      onClick={() => copyToClipboard(bkashNumber, "bkash")}
                      className="text-gray-500 hover:text-pink-500 transition-colors p-1"
                      title="Copy number"
                    >
                      {copiedField === "bkash" ? (
                        <Check size={20} className="text-pink-500" />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Nagad */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
              <div className="flex items-center gap-4">
                {/* Left: Big Logo */}
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0">
                  {/* <span className="text-white font-bold text-xl">bKash</span> */}
                  <img src="/nagad.png" className="w-full" alt="" />
                </div>

                {/* Right: Text and Number */}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    Nagad Personal
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-mono text-base font-semibold text-gray-800">
                      {nagadNumber}
                    </p>
                    <button
                      onClick={() => copyToClipboard(nagadNumber, "nagad")}
                      className="text-gray-500 hover:text-orange-500 transition-colors p-1"
                      title="Copy number"
                    >
                      {copiedField === "nagad" ? (
                        <Check size={20} className="text-orange-500" />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Thank you for your generous support! 💚
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

"use client";
import { useState } from "react";

export default function PaymentSection() {
  const [showWidget, setShowWidget] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const onramperApiKey = process.env.NEXT_PUBLIC_ONRAMPER_API_KEY;
  const onramperUrl = `https://buy.onramper.dev?apiKey=${onramperApiKey}`;

  return (
    <div className="max-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
        {!showWidget ? (
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Ready to Pay?</h2>
            <button
              onClick={() => setShowWidget(true)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Continue to Payment
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                setShowWidget(false);
                setIframeLoaded(false);
              }}
              className="flex items-center text-sm text-gray-500 hover:text-teal-600 transition duration-200"
            >
              ← Back
            </button>
            {!iframeLoaded && (
              <div className="flex justify-center items-center h-96">
                <div className="loader">Loading...</div>
              </div>
            )}
            <div
              className={`aspect-w-9 aspect-h-16 overflow-hidden rounded-lg ${
                iframeLoaded ? "" : "hidden"
              }`}
            >
              <iframe
                src={onramperUrl}
                title="Onramper Payment Widget"
                allow="accelerometer; autoplay; camera; gyroscope; payment; microphone"
                allowFullScreen
                className="w-full h-[600px] rounded-lg border"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

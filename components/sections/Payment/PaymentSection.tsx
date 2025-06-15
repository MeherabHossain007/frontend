"use client";
import { useState } from "react";

export default function PaymentSection() {
  const [showWidget, setShowWidget] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const onramperApiKey = process.env.NEXT_PUBLIC_ONRAMPER_API_KEY;
  const onramperUrl = `https://buy.onramper.dev?apiKey=${onramperApiKey}`;

  return (
    <div className="w-full">
      {!showWidget ? (
        <div className="flex flex-col items-center space-y-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Ready to Pay?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your payment securely through our trusted payment provider.
          </p>
          <button
            onClick={() => setShowWidget(true)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
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
            className="flex items-center text-sm text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition duration-200 self-start"
          >
            ← Back
          </button>

          {!iframeLoaded && (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          )}

          <div
            className={`transition-opacity duration-300 ${
              iframeLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            <iframe
              src={onramperUrl}
              title="Onramper Payment Widget"
              allow="accelerometer; autoplay; camera; gyroscope; payment; microphone"
              allowFullScreen
              className="w-full h-screen rounded-lg"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function PaymentSection() {
  const [showWidget, setShowWidget] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      {!showWidget ? (
        <button
          onClick={() => setShowWidget(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md"
        >
          Continue to Payment
        </button>
      ) : (
        <div className="w-full max-w-lg bg-white rounded-xl shadow p-4">
          <button
            onClick={() => setShowWidget(false)}
            className="text-gray-600 hover:text-teal-600 mb-4 flex items-center"
          >
            ← Back
          </button>
          <div className="overflow-hidden rounded-lg">
            <iframe
              src="https://onramp.money/main/buy/?appId=2"
              title="Onramper Widget"
              height="630px"
              width="420px"
              allow="accelerometer; autoplay; camera; gyroscope; payment; microphone"
            />
          </div>
        </div>
      )}
    </div>
  );
}

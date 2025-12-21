'use client';

import { useState } from 'react';

export default function SetupGuidePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🔑 API Keys Setup Guide
          </h1>
          <p className="text-lg text-gray-600">
            Simple step-by-step instructions. Only takes 5 minutes!
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    i <= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {i}
                </div>
                {i < 3 && (
                  <div
                    className={`h-1 w-24 mx-2 ${
                      i < step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              HubSpot Key
            </span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Add to Project
            </span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Test Connection
            </span>
          </div>
        </div>

        {/* Step 1: Get HubSpot Key */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Step 1: Get Your HubSpot API Key
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 font-medium mb-2">
                  ℹ️ What is this for?
                </p>
                <p className="text-blue-800 text-sm">
                  This lets your dashboards save and load customer/booking data from HubSpot.
                  Without it, the dashboards can't show any data.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Go to HubSpot</p>
                    <a
                      href="https://app.hubspot.com/settings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      https://app.hubspot.com/settings →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Click "Integrations" in left sidebar</p>
                    <p className="text-gray-600 text-sm">Look for the menu on the left side</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Click "Private Apps" or "API Keys"</p>
                    <p className="text-gray-600 text-sm">Might be one or the other depending on your account</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Click "Create private app" or "Create API key"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Name it "Brooklyn Maids Dashboard"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Give it these permissions:</p>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>crm.objects.contacts.read</li>
                      <li>crm.objects.contacts.write</li>
                      <li>crm.objects.deals.read</li>
                      <li>crm.objects.deals.write</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    7
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Click "Create app"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Copy the API key</p>
                    <p className="text-gray-600 text-sm">
                      It will start with <code className="bg-gray-100 px-2 py-1 rounded">pat-na1-...</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-900 font-medium mb-2">
                  ⚠️ Can't find it?
                </p>
                <p className="text-yellow-800 text-sm mb-2">
                  Different HubSpot accounts show this in different places. Try:
                </p>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside ml-2">
                  <li>Settings → Integrations → Private Apps</li>
                  <li>Settings → Integrations → API Key</li>
                  <li>Settings → Account Setup → Integrations</li>
                </ul>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 text-lg"
              >
                I Got My API Key! Next Step →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Add to Project */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Step 2: Add Key to Your Project
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 font-medium mb-2">
                  ℹ️ What are we doing?
                </p>
                <p className="text-blue-800 text-sm">
                  We're creating a file that stores your API key securely. This file is NOT committed
                  to Git, so your key stays private.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">Open your code editor (VS Code, Cursor, etc.)</p>
                    <p className="text-gray-600 text-sm">Navigate to the v4-theme folder</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      Create a new file called <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
                    </p>
                    <p className="text-gray-600 text-sm mb-2">Right in the v4-theme root folder (same level as package.json)</p>
                    <p className="text-xs text-gray-500">
                      📁 v4-theme/<br />
                      &nbsp;&nbsp;├── 📄 .env.local ← Create this file<br />
                      &nbsp;&nbsp;├── 📄 package.json<br />
                      &nbsp;&nbsp;└── 📁 src/
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      Paste this into the file:
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                      <div>HUBSPOT_API_KEY=paste_your_key_here</div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      ⚠️ Replace "paste_your_key_here" with your actual HubSpot key from Step 1
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">Save the file</p>
                    <p className="text-gray-600 text-sm">Ctrl+S (Windows) or Cmd+S (Mac)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">Restart your dev server</p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                      <div># Press Ctrl+C to stop the server</div>
                      <div># Then start it again:</div>
                      <div className="text-green-400">npm run dev</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-900 font-medium mb-2">
                  🔒 Security Note
                </p>
                <p className="text-yellow-800 text-sm">
                  NEVER commit .env.local to Git! It's already in .gitignore, so you're safe.
                  Don't share your API key with anyone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  File Created! Next Step →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Test */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Step 3: Test Your Connection
            </h2>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-900 font-medium mb-2">
                  🎉 Almost done!
                </p>
                <p className="text-green-800 text-sm">
                  Let's verify your HubSpot API key is working correctly.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      Make sure your dev server is running
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono">
                      <div className="text-green-400">npm run dev</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      Click the button below to test
                    </p>
                    <a
                      href="/test-hubspot"
                      target="_blank"
                      className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                    >
                      Test HubSpot Connection →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      What you should see:
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium text-lg">✅ HubSpot connection working!</p>
                      <p className="text-green-700 text-sm mt-1">
                        Contacts Found: 0 (or however many you have)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-900 font-medium mb-2">
                  ❌ Seeing an error?
                </p>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                  <li>Double-check your API key in .env.local (no extra spaces)</li>
                  <li>Make sure you restarted your dev server</li>
                  <li>Verify the API key is correct in HubSpot</li>
                  <li>Check that you gave the right permissions (contacts & deals)</li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 mb-4">✅ Next Steps Once Working:</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <a
                    href="/test-booking"
                    className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-center font-medium"
                  >
                    Create Test Bookings
                  </a>
                  <a
                    href="/customer-dashboard"
                    className="px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-center font-medium"
                  >
                    View Customer Dashboard
                  </a>
                  <a
                    href="/admin-dashboard"
                    className="px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-center font-medium"
                  >
                    View Admin Dashboard
                  </a>
                  <a
                    href="/dashboard-demo"
                    className="px-4 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 text-center font-medium"
                  >
                    See All Features
                  </a>
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                ← Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

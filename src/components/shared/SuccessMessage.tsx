'use client';

import { useRouter } from 'next/navigation';
import { BRANDING } from '@/config/branding';

interface SuccessMessageProps {
  type: 'quote' | 'booking';
  confirmationNumber?: string;
  frequency?: string;
  inline?: boolean;
  onClose?: () => void;
}

export default function SuccessMessage({ type, confirmationNumber, frequency, inline = false, onClose }: SuccessMessageProps) {
  const router = useRouter();

  const handleGetAnotherQuote = () => {
    router.push('/test-quote');
  };

  const handleGoHome = () => {
    if (inline && onClose) {
      onClose();
    } else {
      router.push('/');
    }
  };

  const containerClasses = inline 
    ? "w-full py-8"
    : "min-h-screen bg-[#1a3755] flex items-center justify-center px-4 py-12";

  return (
    <div className={containerClasses}>
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center space-y-5">
          <div className="animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#dfbd69] mb-3">
              {type === 'quote' ? 'Quote Request Received!' : 'Booking Request Received!'}
            </h3>
            
            <p className="text-white/90 text-base sm:text-lg">
              {type === 'quote' 
                ? "We've saved your information to make booking easier."
                : "Your booking request has been submitted successfully."}
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/20">
            {type === 'quote' ? (
              <>
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-[#dfbd69] block mb-3 text-base">What happens next?</strong>
                  You'll receive a quote via text in about 60 seconds
                  <br /><br />
                  A team member will follow up to answer questions and help you schedule using your saved details.
                </p>

                {frequency && frequency !== 'Once' && frequency !== 'One Time' && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-white text-sm leading-relaxed">
                      <strong className="text-[#dfbd69] block mb-2">About {frequency} Service</strong>
                      Save up to 20% with recurring service and enjoy flexible scheduling with the same trusted team each visit.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-[#dfbd69] block mb-3 text-base">What happens next?</strong>
                You'll receive an email with a link to your dashboard where you can add payment details.
                <br /><br />
                We'll reach out by text to confirm your booking and answer any questions.
              </p>
            )}
          </div>

          {confirmationNumber && (
            <div className="text-white/70 text-sm mt-4">
              <p>Your request number: <span className="font-mono text-[#dfbd69]">{confirmationNumber}</span></p>
              <p className="mt-1">Save this for reference when booking.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleGoHome}
              className="flex-1 bg-white/20 text-white py-3 px-6 rounded-lg hover:bg-white/30 font-semibold transition-all duration-300 hover:-translate-y-[1px]"
            >
              {inline ? 'Close' : 'Go to Home Page'}
            </button>
            <button
              onClick={handleGetAnotherQuote}
              className="flex-1 bg-[#dfbd69] text-slate-900 py-3 px-6 rounded-lg hover:bg-[#dfbd69]/90 font-semibold transition-all duration-300 hover:-translate-y-[1px]"
            >
              Book Another Service
            </button>
          </div>

          <div className="pt-4 border-t border-white/20">
            <p className="text-white/80 text-sm mb-2">
              Questions? Call or text us!
            </p>
            <a 
              href={BRANDING.phone.href} 
              className="text-[#dfbd69] hover:text-[#dfbd69]/80 transition-colors text-lg font-semibold"
            >
              {BRANDING.phone.display}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}




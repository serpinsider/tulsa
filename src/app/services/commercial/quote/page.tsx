'use client';

import CommercialStepWizard from '@/components/specialty-wizards/CommercialStepWizard';

export default function CommercialQuotePage() {
  return (
    <main className="min-h-screen pt-20" style={{ background: 'rgba(15, 23, 42, 1)' }}>
      <div className="w-full max-w-full sm:container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: 'var(--form-bg-color, rgba(45, 20, 16, 0.5))' }}>
            <CommercialStepWizard />
          </div>
        </div>
      </div>
    </main>
  );
}

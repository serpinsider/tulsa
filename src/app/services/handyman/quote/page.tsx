'use client';

import HandymanStepWizard from '@/components/specialty-wizards/HandymanStepWizard';
import { INLINE_STYLES } from '@/styles/colors';

export default function HandymanQuotePage() {
  return (
    <main className="min-h-screen pt-32" style={INLINE_STYLES.primary}>
      <div className="w-full max-w-full sm:container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            <HandymanStepWizard />
          </div>
        </div>
      </div>
    </main>
  );
}

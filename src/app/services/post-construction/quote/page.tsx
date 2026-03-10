'use client';

import PostConstructionStepWizard from '@/components/specialty-wizards/PostConstructionStepWizard';
import { INLINE_STYLES } from '@/styles/colors';

export default function PostConstructionQuotePage() {
  return (
    <main className="min-h-screen pt-32" style={INLINE_STYLES.primary}>
      <div className="w-full max-w-full sm:container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10" style={{ background: 'var(--form-bg-color, rgba(45, 20, 16, 0.5))' }}>
            <PostConstructionStepWizard />
          </div>
        </div>
      </div>
    </main>
  );
}

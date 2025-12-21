'use client';

import { ReactNode } from 'react';

// No auth system - just a passthrough
export default function SessionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

interface OptimizedUser {
  id?: string;
  email?: string | null;
  phone?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

interface OptimizedSession {
  session: {
    user: OptimizedUser;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Optimized session hook that reduces unnecessary re-renders
 */
export function useOptimizedSession(): OptimizedSession {
  const { data: session, status } = useSession();

  const optimizedSession = useMemo(() => {
    if (status === 'loading') return { session: null, isLoading: true, isAuthenticated: false };
    if (!session) return { session: null, isLoading: false, isAuthenticated: false };
    
    return {
      session: {
        user: {
          id: session.user?.id,
          email: session.user?.email,
          phone: session.user?.phone,
          firstName: session.user?.firstName,
          lastName: session.user?.lastName,
          role: session.user?.role
        }
      },
      isLoading: false,
      isAuthenticated: true
    };
  }, [session, status]);

  return optimizedSession;
}
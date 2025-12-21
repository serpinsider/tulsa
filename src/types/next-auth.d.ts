import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      hubspotContactId?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
    hubspotContactId?: string;
  }
}


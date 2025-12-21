// Stubbed auth - no longer using NextAuth/Postgres
// Sites only use BookingKoala embed + Formspree quote bot

export const auth = async () => null;
export const signIn = async () => {};
export const signOut = async () => {};
export const handlers = { GET: async () => new Response(null, { status: 404 }), POST: async () => new Response(null, { status: 404 }) };


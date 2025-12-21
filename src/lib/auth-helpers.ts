import { sql } from '@vercel/postgres';

/**
 * Auto-create user account for customer when booking is created
 * This allows customers to log in immediately after booking using magic link or Google
 */
export async function ensureCustomerAccount(
  email: string,
  name: string,
  hubspotContactId?: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      // User already exists, update HubSpot contact ID if provided
      const userId = existingUser.rows[0].id;
      if (hubspotContactId) {
        await sql`
          UPDATE users 
          SET "hubspotContactId" = ${hubspotContactId}
          WHERE id = ${userId}
        `;
      }
      return { success: true, userId };
    }

    // Create new user account
    const result = await sql`
      INSERT INTO users (email, name, role, "emailVerified", "hubspotContactId")
      VALUES (${email}, ${name}, 'customer', NOW(), ${hubspotContactId || null})
      RETURNING id
    `;

    const userId = result.rows[0]?.id;

    return { success: true, userId };
  } catch (error) {
    console.error('Error ensuring customer account:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}


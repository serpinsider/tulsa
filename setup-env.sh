#!/bin/bash

# Create .env.local file for Sac Maids development
cat > .env.local << 'EOF'
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-key-change-in-production-123456789"

# Google OAuth (optional - can be left empty for testing)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe (optional for testing)
STRIPE_RESTRICTED_KEY=""
STRIPE_PUBLISHABLE_KEY=""

# OpenPhone (optional for testing)
OPENPHONE_API_KEY=""
OPENPHONE_DEFAULT_NUMBER=""

# Base URL for the application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
CRM_BASE_URL="http://localhost:3000"

# Formspree (optional for testing)
FORMSPREE_URL=""

# Analytics (for admin dashboard)
ANALYTICS_API_KEY=""
EOF

echo "✅ Created .env.local file with development environment variables"
echo "🔐 NEXTAUTH_SECRET has been set for development"
echo "🚀 You can now run 'npm run dev' to start the server"

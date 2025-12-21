-- NextAuth.js Database Schema for Vercel Postgres
-- This schema supports multiple authentication providers and account linking

CREATE TABLE IF NOT EXISTS verification_token (
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  PRIMARY KEY (identifier, token)
);

CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  role VARCHAR(50) DEFAULT 'customer',
  "hubspotContactId" VARCHAR(255),
  PRIMARY KEY (id)
);

-- Indexes for performance
CREATE UNIQUE INDEX IF NOT EXISTS accounts_provider_providerAccountId_key ON accounts (provider, "providerAccountId");
CREATE UNIQUE INDEX IF NOT EXISTS sessions_sessionToken_key ON sessions ("sessionToken");
CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON users (email);
CREATE INDEX IF NOT EXISTS accounts_userId_idx ON accounts ("userId");
CREATE INDEX IF NOT EXISTS sessions_userId_idx ON sessions ("userId");


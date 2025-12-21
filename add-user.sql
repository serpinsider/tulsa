-- Add Eric as admin user
INSERT INTO users (name, email, "emailVerified", image)
VALUES 
  ('Eric', 'eric@serp.gg', NOW(), NULL)
ON CONFLICT (email) DO NOTHING;

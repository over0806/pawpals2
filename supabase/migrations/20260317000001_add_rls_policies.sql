-- Enable RLS
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoption_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for pets (Public Read)
CREATE POLICY "Allow public read access for pets" ON pets
  FOR SELECT TO anon USING (true);

-- Policies for adoption_requests (Public Read & Insert)
CREATE POLICY "Allow public read access for adoption_requests" ON adoption_requests
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert access for adoption_requests" ON adoption_requests
  FOR INSERT TO anon WITH CHECK (true);

-- Policies for chats & messages (Public Read & Insert for demo purposes)
-- NOTE: In a production app, these should be restricted to authenticated users
CREATE POLICY "Allow public read access for chats" ON chats
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert access for chats" ON chats
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public read access for messages" ON messages
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert access for messages" ON messages
  FOR INSERT TO anon WITH CHECK (true);

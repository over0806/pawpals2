-- Alter adoption_requests table to add pet_id
ALTER TABLE adoption_requests ADD COLUMN pet_id UUID REFERENCES pets(id);

-- Update existing records if possible (optional, but good for consistency)
-- For now, we'll just allow NULL for old records or let the user handle it.
-- But for new records, we want to ensure we have it.

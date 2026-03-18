-- Create pets table
CREATE TABLE pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('公', '母')) NOT NULL,
  location TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  energy INTEGER NOT NULL,
  playfulness INTEGER NOT NULL,
  training INTEGER NOT NULL,
  shelter TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create adoption_requests table
CREATE TABLE adoption_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_name TEXT NOT NULL,
  pet_breed TEXT NOT NULL,
  pet_image TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT CHECK (status IN ('審核中', '已通過', '已拒絕')) NOT NULL DEFAULT '審核中',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chats table
CREATE TABLE chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_name TEXT NOT NULL,
  participant_avatar TEXT NOT NULL,
  last_message TEXT,
  last_message_time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  content TEXT NOT NULL,
  time TEXT NOT NULL,
  is_me BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial mock data for pets
INSERT INTO pets (name, breed, age, gender, location, image, description, energy, playfulness, training, shelter)
VALUES 
('Buddy', '小獵犬', '2 歲', '公', '加州，沙加緬度', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ZOnqNTcumPrWlw1BKbWvPqKpiAhJ20i8GRlmahwK-7c1SPymcRXjNdjMkcRBdnB-1WWegxDCSp7qXbJG2lOBDFa8jsZyKZBZdRQXpsQWnduHV8DiyjYmR7VeWrs53nZZ63sswG6_xqBIK17WoucUiDpE3Y8741QKCSPAa9ZHahXaFGnwOrfpQcYUFy8r0Mghzmrs78Ltq6ToyUwTp3z2gLljUzJ2VwDpYjbQIQPlZLV2NTNckCrXlC7eG-HTsOMPfVWEf3yvRA', 'Buddy 是一隻充滿活力且友善的小獵犬，他非常喜歡玩接球以及探索新的步道。他與小孩及其他寵物相處融洽，是任何活躍家庭的理想新成員。他已經接受過居家訓練，並且聽得懂「坐下」和「等一下」等基本指令。', 85, 95, 70, '爪爪收容所'),
('Max', '黃金獵犬', '2 歲', '公', '紐約市', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD8fMYGlDebsLt3TIMubfeeIsOlmIXfwnIL78WtSvLUCdvH4tkhNb-yQrb_EwIJnC0j2gx02WSlDt5wL1QHWivEQvMt4ALtYtnfp8hrSvNfy_l9zUNYmfomcxFIsTu7eGYsyFHJsDMV8H-gWxRjEbmoE1OOchrM7ejpOjvu2C55h1F_9Jz8DQO8PG28oa263wbwkOxDfjIqm2Wj9lnM4NdQIZaiaoZeAaSPiT7rFpBglDuZ9a6BTq_t7t7i29pN6SSwl2a9L0QOw', 'Max 是一隻溫柔的黃金獵犬，喜歡在公園散步和與人親近。', 60, 80, 90, '溫馨動物之家'),
('Luna', '波斯貓', '1 歲', '母', '紐約市', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR_JJ0ni94MsADjBGNNhHDsiS9ZREt-VLfHmTG_276yN3t1SUQxOK4UERMTZHonDuN-zU5NfZaNgVr0U964VtuckvRLlhr_MB5LGkCR0nsYdlZWp-4jwXCNCU7LvXPjE1Q0ptFxU_HRkPubAK-JIKfBmSjZ_32qS4s5NwjhsCTLnVHT3lyXCT2Z86PtN1V6FrxYLxCjQVoLLBn4Dc04LkdtFWYKZdsKQea3Pg6fsP6KiqTg3FSoFS4UR7Lp4ddueGFJAZJpxCItQ', 'Luna 是一隻優雅的波斯貓，喜歡安靜的環境和主人的陪伴。', 30, 50, 40, '喵喵俱樂部'),
('Charlie', '小獵犬', '3 歲', '公', '紐約市', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhYmfgNiyvCEJ1aRA7PKDxS0JW4b3Qrj7aooeovoJsHSXGRKXGCU9Ahq5G_cB6cxDELSNDRFV-HcsGM5hW8qeTljNX207_m39rSWDH-VZQAm_jCGeCD20DvDFbhSreUUKxtozBfAVyJM7IszCP71q03msu1BSdOVb3y4e22zYOKoA-xiaY2Fn9MtHAHz1aTCBGroQ9yPnzQ4-7WmhyL_xxl_Dq7JnWujf7YJiWUt3tXnb89_6HMg3tQ-6SFZtbq81RL_2XisdQsA', 'Charlie 是一隻聰明的小獵犬，對世界充滿好奇。', 75, 85, 80, '爪爪收容所'),
('Bella', '英短藍貓', '2 歲', '母', '紐約市', 'https://lh3.googleusercontent.com/aida-public/AB6AXuACUIff_FdT0mr4RqJlJpZb7XRRa9eRQSVr_tO5VyZnz3X9LlunKQq_dKmccIEz2GKuhqfJrA3ssgHi4ef58ieDslEDPmEptgCeNrDpTGn9V806FyNa7K8oUW5ZyPK-c9J_3DU5Gx4SqxkfdLqEVaN154Z-1V5jqfWRSh2GUUWm44Bilig1zowgWyi65Opr8wpCiU-R2EfeaOYBUHdga6F9htA2NPaYUyqqsgDx7NWaKhgrjQcBG4HKjHP8IMSLGYyjfH7UP_lEWA', 'Bella 是一隻活潑的英短藍貓，非常親人。', 50, 70, 30, '喵喵俱樂部');

-- Insert initial mock data for adoption_requests
INSERT INTO adoption_requests (pet_name, pet_breed, pet_image, date, status)
VALUES 
('Rex', '黃金獵犬', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD8fMYGlDebsLt3TIMubfeeIsOlmIXfwnIL78WtSvLUCdvH4tkhNb-yQrb_EwIJnC0j2gx02WSlDt5wL1QHWivEQvMt4ALtYtnfp8hrSvNfy_l9zUNYmfomcxFIsTu7eGYsyFHJsDMV8H-gWxRjEbmoE1OOchrM7ejpOjvu2C55h1F_9Jz8DQO8PG28oa263wbwkOxDfjIqm2Wj9lnM4NdQIZaiaoZeAaSPiT7rFpBglDuZ9a6BTq_t7t7i29pN6SSwl2a9L0QOw', '2023年10月12日', '審核中'),
('Luna', '暹羅混血', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwcK3siMAy_L8RVqixVh9J4RQrLY5r4KHxT_8s38yuAXPq0FSSnt1kqF5S03h1KS04KBy-a6H5CWAFt1P6yY11HD4W24tLQl0fLnvzNmTcSYwjw8X0YxyFKhiF7wJUObA2pkyDvHu1dvQigtUjVIKx1ZtceZwJX-8O5aR2wLsTijJRlMYaFBMXKNC-9-8VpLaaffODTBvdTcjKpnzH78eNObwwhNc1DW6WeH_l5NIe2uDVxveCoHvCouv2_G3x5UzTo_T1lRFnBQ', '2023年9月28日', '已通過');

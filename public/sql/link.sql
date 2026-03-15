-- SQL schema and seed data generated from src/assets/link.csv

CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  timecode TEXT NOT NULL,
  channel TEXT NOT NULL,
  tags TEXT NOT NULL
);

INSERT INTO links (url, timecode, channel, tags) VALUES
  ('https://www.youtube.com/watch?v=DRc7ISfv6GA', '10:55', 'joyca', 'text'),
  ('https://www.youtube.com/watch?v=DRc7ISfv6GA', '11:00', 'joyca', 'jingle'),
  ('https://www.youtube.com/watch?v=cTsONdoPgiU', '7:10', 'amixem', 'transition'),
  ('https://www.youtube.com/watch?v=JJcKDAMb27k', '17:55', 'amixem', 'carte');


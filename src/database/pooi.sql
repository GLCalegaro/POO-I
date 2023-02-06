-- Active: 1675102700112@@127.0.0.1@3306
CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title TEXT NOT NULL,
    duration INTEGER NOT NULL,
    upload_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO videos (id, title, duration)
VALUES
	("V001", "Oh No - BMTH", 305),
	("V002", "Wondeful Life - BMTH", 273);

SELECT * FROM videos;

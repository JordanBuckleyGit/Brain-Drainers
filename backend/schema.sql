DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

-- INSERT INTO user (username, email, password_hash)
-- VALUES ('testuser', 'test@example.com', 'testpasswordhash');

CREATE TABLE session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    timestamp TEXT NOT NULL,      -- ISO format string (e.g., 2025-06-12T12:34:56Z)
    duration INTEGER NOT NULL,    -- Duration in minutes
    FOREIGN KEY (user_id) REFERENCES user(id)
);

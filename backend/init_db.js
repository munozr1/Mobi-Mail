const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('emaildb');

db.serialize(() => {
  // Create the users table
  db.run(`CREATE TABLE users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP );`);

  db.run(`CREATE TABLE emails (
      email_id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_id INTEGER NOT NULL,
      to_id INTEGER NOT NULL,
      subject TEXT,
      body TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (from_id) REFERENCES users(user_id),
      FOREIGN KEY (to_id) REFERENCES users(user_id) );`);

});
db.run("INSERT INTO users (email, username, password_hash) VALUES ('jane.doe@example.com', 'janedoe', '$2b$10$iHlo18sK8djz5.ATaAkJ5eF43D/YogmJ4k9dGSgStW4oHqQlqO72C')");

db.run("INSERT INTO users (email, username, password_hash) VALUES ('john.smith@example.com', 'johnsmith', '$2b$10$y7eyGV8sK8djz7.ATaLkS3eT43D/YogmM4j49k9dGsgStW9gHqQlR12A')");

// Insert the email
db.run("INSERT INTO emails (from_id, to_id, subject, body) VALUES (1, 2, 'Hello!', 'Just wanted to say hi and check in.')");


db.close();

// INSERT INTO users (email, username, password_hash)
// VALUES ('test@example.com', 'testuser', '$2b$10$iHlo19sK8djz5.ATaAkJ5eH43D/YogmJ4k9dgSgSzW4wHqQlqO72C');

// INSERT INTO emails (sender_id, subject, body)
// VALUES (1, 'Meeting Reminder', 'Don't forget our meeting tomorrow at 2 PM!');

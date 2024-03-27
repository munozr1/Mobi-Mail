const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('emaildb');

db.serialize(() => {
  // Create the users table
  db.run(`CREATE TABLE users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      username TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
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

// Insert the email


db.close();

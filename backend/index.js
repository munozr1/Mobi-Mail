const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

let db = new sqlite3.Database('emaildb');


app.use(express.json());

// 1. Create a new user
app.post('/users', (req, res) => {
    app.post('/users', async (req, res) => {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Username, password, and email are required.' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 8);

            db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                const createdUserId = this.lastID;
                res.status(201).json({ userId: createdUserId, username, email });
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
});

// 2. Retrieve a user's sent emails
app.get('/users/:userId/sent', (req, res) => {
  const userId = req.params.userId;

  db.all(`SELECT * FROM emails WHERE sender_id = ${userId}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });


});

// 3. Retrieve a user's received emails
app.get('/inbox', (req, res) => {
    const userId = req.params.userId;
    const query = `SELECT * FROM emails WHERE email_id = ${req.body.userId}`
    db.run(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/emails', (req, res) => {

    const { senderId, recipient, subject, body } = req.body;
    const queryRes = db.all(`SELECT user_id FROM users WHERE email = "${recipient}"`, (err, rows) => {
      if (err) {
        console.log("bruh", err.message);
        return res.status(500).json({ error: err.message });
      } else {
        recipientId = rows[0].user_id;
        console.log("got ID: ", recipientId)
        return recipientId;
      }
    });

    db.run('BEGIN TRANSACTION;');

    try {

        const emailInsertStmt = db.prepare('INSERT INTO emails (from_id, to_id, subject, body) VALUES (?, ?, ?, ?)');
        emailInsertStmt.run(senderId, queryRes, subject, body);

        db.run('COMMIT;');
        res.status(201).json({ message: 'Email sent successfully' });
    } catch (error) {
        db.run('ROLLBACK;');
        res.status(500).json({ error: error.message });
    }
});



app.listen(port, () => {
    console.log(`Email backend server listening on port ${port}`);
});

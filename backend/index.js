const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const port = 8080;

const db = new sqlite3.Database('emaildb');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(express.json());
app.use(cors(corsOptions));

app.post('/users', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required.' });
    }

    try {
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        db.run('INSERT INTO users (username, email, password_hash, salt) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, salt], function(err) {
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

app.post('/auth', cors(), async (req, res) => {
    const { email, password } = req.body;

    db.all(`SELECT * FROM users WHERE email = "${email}"`, async (err, rows) => {
        if (err)
            return res.status(500).json({ error: err.message });
        else if (rows.length === 0)
            return res.status(401).json({ error: 'User not found' });

        const user = rows[0];
        const hashedPassword = await bcrypt.hash(password, user.salt);
        if (hashedPassword !== user.password_hash) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        res.json({ userId: user.user_id, username: user.username, email: user.email });
    });
});

// 2. Retrieve a user's sent emails
app.get('/sent', (req, res) => {
  const userId = req.query.userId;

  db.all(`SELECT * FROM emails WHERE from_id = ${userId}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });

});

app.get('/inbox', (req, res) => {

    const userId = req.query.userId;
    console.log("inbox => ",userId);
    const query = `SELECT * FROM emails WHERE to_id = ${userId}`
    console.log(query)
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("rows => ", rows);
        res.json(rows);

    });
});

app.post('/emails', (req, res) => {
    const { senderId, recipient, subject, body } = req.body;
    let id = 0;
    const aueryRes= db.all(`SELECT user_id FROM users WHERE email = "${recipient}"`, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        id = rows[0].user_id;
        console.log(rows)
        console.log(id)
        try {
            const emailInsertStmt = db.prepare('INSERT INTO emails (from_id, to_id, subject, body) VALUES (?, ?, ?, ?)');
            emailInsertStmt.run(senderId, id, subject, body);
            res.status(201).json({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
      }
    });


});

app.get('/search', (req, res) => {
    const { userId, query } = req.query;

        if (!userId || !query) {
        return res.status(400).json({ error: 'UserId and query string are required.' });
    }

    const querySql = `SELECT * FROM emails WHERE (to_id = ? OR from_id = ?) AND body LIKE ?`;
    const queryParams = [userId, userId, `%${query}%`];

    db.all(querySql, queryParams, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


app.listen(port, () => {
    console.log(`Email backend server listening on port ${port}`);
});

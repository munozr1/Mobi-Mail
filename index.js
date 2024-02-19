const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Initialize the database
db.serialize(() => {
  db.run("CREATE TABLE emails (id INTEGER PRIMARY KEY, toAddress TEXT, fromAddress TEXT, subject TEXT, body TEXT)");
});

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080, clientTracking: true, maxPayload: 1024 });

wss.on('connection', function connection(ws) {
  if (wss.clients.size > 30) {
    ws.terminate();
    return;
  }

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Simple POP3 implementation with vulnerability
    if (message === '.') {
      ws.send('Enter command mode. Warning: This server contains a vulnerability.');
    } else {
      // Handle message as command if in command mode
      // This is a simplified and unsafe example. Actual command handling and database operations should be implemented here.
      const command = message.split(' ')[0].toUpperCase();
      switch (command) {
        case 'RETR':
          // Example of retrieving all emails (illustrative purpose only)
          db.all("SELECT * FROM emails", [], (err, rows) => {
            if (err) {
              ws.send('Error retrieving emails.');
              throw err;
            }
            rows.forEach((row) => {
              ws.send(`Email: ${row.id}, To: ${row.toAddress}, From: ${row.fromAddress}, Subject: ${row.subject}, Body: ${row.body}`);
            });
          });
          break;
        default:
          ws.send('Command not recognized.');
      }
    }
  });

  ws.on('close', function close() {
    console.log('Connection closed');
  });

  ws.send('Connected to the custom POP3 server. Please login.');
});

console.log('WebSocket server started on port 8080.');

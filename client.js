const WebSocket = require("ws");

// Connect to the WebSocket server
const ws = new WebSocket("ws://69.164.201.78:8080");

ws.on("open", function open() {
  console.log("Connected to the server.");
  // Simulate sending an email - This part should be aligned with the server's expected format
  const email = {
    to: "recipient@example.com",
    from: "sender@example.com",
    subject: "Test Email",
    body: "This is a test email sent via WebSocket.",
  };
  // Send the email as a JSON string
  ws.send(JSON.stringify(email));
});

ws.on("message", function incoming(data) {
  console.log("Received:", data);
});

ws.on("close", function close() {
  console.log("Disconnected from the server.");
});

ws.on("error", function error(err) {
  console.error("WebSocket error:", err);
});

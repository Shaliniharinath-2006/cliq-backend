const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let pinnedMessage = ""; // in-memory storage (resets on restart)

// Pin a message
app.post("/pin", (req, res) => {
    const { message } = req.body;
    pinnedMessage = message || "";
    res.json({ success: true, pinned_message: pinnedMessage });
});

// Unpin
app.post("/unpin", (req, res) => {
    pinnedMessage = "";
    res.json({ success: true, pinned_message: pinnedMessage });
});

// Get pinned
app.get("/pinned", (req, res) => {
    res.json({ success: true, pinned_message: pinnedMessage });
});

app.listen(3000, () => console.log("Server running on port 3000"));

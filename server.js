const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Store pinned message
let globalPin = null;

// Store deadlines per user
let userDeadlines = {
    "shaliniharinath4@gmail.com": [
        { project: "UI Revamp", deadline: "2025-12-05" }
    ],
    "tejaswinit075@gmail.com": [
        { project: "Testing", deadline: "2025-12-07" }
    ]
};

// Admin list
const admins = ["shaliniharinath4@gmail.com"];

// Get global pin
app.get('/pin', (req, res) => {
    res.json({ pin: globalPin });
});

// Set global pin
app.post('/pin', (req, res) => {
    const { message, admin } = req.body;
    if(!admins.includes(admin)) return res.status(403).json({ error: "Not authorized" });
    globalPin = { message, pinned_by: admin, timestamp: new Date() };
    res.json({ success: true, pin: globalPin });
});

// Remove pin
app.delete('/pin', (req, res) => {
    const { admin } = req.body;
    if(!admins.includes(admin)) return res.status(403).json({ error: "Not authorized" });
    globalPin = null;
    res.json({ success: true });
});

// Get deadlines for a user
app.get('/deadlines', (req, res) => {
    const user = req.query.user;
    res.json({ deadlines: userDeadlines[user] || [] });
});

// Add/update user deadline (optional)
app.post('/deadlines', (req, res) => {
    const { user, project, deadline } = req.body;
    if(!userDeadlines[user]) userDeadlines[user] = [];
    userDeadlines[user].push({ project, deadline });
    res.json({ success: true, deadlines: userDeadlines[user] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


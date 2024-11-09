const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { WebSocketServer } = require("ws");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Models
const User = require("./models/User");

//cors setup
const allowedOrigin = "https://communion-nmleeiqbr-navdeep-rajpurohits-projects.vercel.app/";  // Vercel frontend URL
app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true  // Allow credentials (cookies or JWT)
}));

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Routes

// Registration Route
app.post("/api/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, religion } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      religion,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed." });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: `${user.firstName} ${user.lastName}` },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, username: `${user.firstName} ${user.lastName}` }); // Send username along with the token
  } catch (error) {
    res.status(500).json({ message: "Login failed." });
  }
});

// WebSocket for Group Chat
const wss = new WebSocketServer({ noServer: true });
const clients = new Map();

wss.on("connection", (ws, req) => {
  ws.on("message", (data) => {
    const messageData = JSON.parse(data);

    if (messageData.type === "join-group") {
      ws.group = messageData.group;
      ws.username = messageData.username; // Store username when joining a group
      // Notify the group that a new user has joined
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.group === ws.group) {
          client.send(JSON.stringify({ 
            username: "System", 
            text: `${ws.username} joined the group`, 
            type: "join" 
          }));
        }
      });
    } else if (messageData.type === "message") {
      // Broadcast user's message in the group
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.group === ws.group) {
          client.send(JSON.stringify({ 
            username: ws.username, 
            text: messageData.text, 
            type: "message" 
          }));
        }
      });
    }
  });

  ws.on("close", () => {
    // Notify the group that a user has left
    if (ws.group && ws.username) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.group === ws.group) {
          client.send(JSON.stringify({ 
            username: "System", 
            text: `${ws.username} left the group`, 
            type: "leave" 
          }));
        }
      });
    }
  });
});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

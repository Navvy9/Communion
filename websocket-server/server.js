const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { WebSocketServer } = require("ws");
const cors = require("cors");
require("dotenv").config();
const bodyParser=require("body-parser");
const crypto= require("crypto");
const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 8080;

// Models
const User = require("./models/User");
const Message = require("./models/Message");
const HelpAlert=require("./models/HelpAlert");
const Event=require("./models/Event");
const Donation = require("./models/Donation"); // Import the schema


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
console.log(process.env.RAZORPAY_KEY); // Should print your key
console.log(process.env.RAZORPAY_SECRET); // Should print your secret



//cors setup

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
app.get("/api/messages", authMiddleware, async (req, res) => {
  try {
    const { group } = req.query; // Optional query parameter to filter by group
    const filter = group ? { group } : {};
    const messages = await Message.find(filter).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to load messages." });
  }
});

// WebSocket for Group Chat
const wss = new WebSocketServer({ noServer: true });
const clients = new Map();

wss.on("connection", (ws, req) => {
  ws.on("message", async (data) => {
    const messageData = JSON.parse(data);

    if (messageData.type === "join-group") {
      ws.group = messageData.group;
      ws.username = messageData.username;

      // Load previous messages for this group
      try {
        const previousMessages = await Message.find({ group: ws.group }).sort({ timestamp: 1 }).exec();
        ws.send(JSON.stringify({ type: "previous-messages", messages: previousMessages }));
      } catch (err) {
        console.error("Error loading previous messages:", err);
      }

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
      // Save the message to the database
      const newMessage = new Message({
        group: ws.group,
        username: ws.username,
        text: messageData.text,
      });
      await newMessage.save();

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

// Create Help Alert
// Create Help Alert
app.post("/api/helpalerts", authMiddleware, async (req, res) => {
  try {
    const { name, helpNeeded, email, phoneNumber } = req.body;

    const newHelpAlert = new HelpAlert({
      name,
      helpNeeded,
      email,
      phoneNumber,
      userId: req.user.id, // Get user ID from the authenticated token
    });

    await newHelpAlert.save();
    res.status(201).json(newHelpAlert);
  } catch (err) {
    res.status(500).json({ message: "Failed to create help alert." });
  }
});


// Get All Help Alerts
app.get("/api/helpalerts", async (req, res) => {
  try {
    const helpAlerts = await HelpAlert.find().sort({ createdAt: -1 });
    res.json(helpAlerts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch help alerts." });
  }
});
// Delete Help Alert
app.delete("/api/helpalerts/:id", authMiddleware, async (req, res) => {
  try {
    const helpAlert = await HelpAlert.findById(req.params.id);

    if (!helpAlert) {
      return res.status(404).json({ message: "Help Alert not found." });
    }

    // Check if the logged-in user is the creator of the Help Alert
    if (helpAlert.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own Help Alerts." });
    }

    await helpAlert.remove();
    res.status(200).json({ message: "Help Alert deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete Help Alert." });
  }
});
// Update Help Alert status
app.put("/api/helpalerts/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'fulfilled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const helpAlert = await HelpAlert.findById(req.params.id);

    if (!helpAlert) {
      return res.status(404).json({ message: "Help Alert not found." });
    }

    if (helpAlert.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own Help Alerts." });
    }

    helpAlert.status = status;
    await helpAlert.save();

    res.json(helpAlert);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status." });
  }
});

// ReligiousEventsCalender

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort events by date
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events." });
  }
});
app.post("/api/events", authMiddleware, async (req, res) => {
  const { date, eventName, venue, description } = req.body;

  if (!date || !eventName || !venue || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newEvent = new Event({
      date,
      eventName,
      venue,
      description,
      participants: 0,
      username: req.user.username, // Extracted from the JWT token
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to create event." });
  }
});

// Delete an Event
app.delete("/api/events/:id", authMiddleware, async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Check if the authenticated user is the creator of the event
    if (event.username !== req.user.username) {
      return res.status(403).json({ message: "You can only delete your own events." });
    }

    // Delete the event
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event." });
  }
});

app.post("/api/events/:id/participate", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.participants += 1;
    await event.save();

    res.status(200).json(event); // Send the updated event back
  } catch (error) {
    console.error("Error updating participation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DonationComponent


// Create a new donation request
// app.post("/api/donations", authMiddleware, async (req, res) => {
//   try {
//     const { projectName, description, upi } = req.body;

//     const donationRequest = new Donation({
//       projectName,
//       description,
//       upi,
//       donations: [],
//       userId: req.user.id, // Get the authenticated user's ID
//     });

//     await donationRequest.save();
//     res.status(201).json(donationRequest);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create donation request." });
//   }
// });

// // Get all donation requests
// app.get("/api/donations", async (req, res) => {
//   try {
//     const donationRequests = await Donation.find().sort({ createdAt: -1 });
//     res.json(donationRequests);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch donation requests." });
//   }
// });

// // Add a donation to a request
// app.post("/api/donations/:id/donate", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { donorName, amount } = req.body;

//     const donationRequest = await Donation.findById(id);
//     if (!donationRequest) {
//       return res.status(404).json({ message: "Donation request not found." });
//     }

//     donationRequest.donations.push({ donorName, amount });
//     await donationRequest.save();
//     res.status(200).json(donationRequest);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add donation." });
//   }
// });

// // Verify a donation
// app.post("/api/donations/:id/verify", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { donorName } = req.body;

//     const donationRequest = await Donation.findById(id);
//     if (!donationRequest) {
//       return res.status(404).json({ message: "Donation request not found." });
//     }

//     if (donationRequest.userId.toString() !== req.user.id) {
//       return res.status(403).json({ message: "You can only verify donations for your own requests." });
//     }

//     donationRequest.verifiedBy = donorName;
//     await donationRequest.save();
//     res.status(200).json(donationRequest);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to verify donation." });
//   }
// });


app.post('/api/donations', async (req, res) => {
  const { projectName, description, targetAmount, accountDetails } = req.body;
  try {
    const donation = new Donation({ projectName, description, targetAmount, accountDetails });
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create donation request', error: err.message });
  }
});

// Get all donation requests
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donation requests', error: err.message });
  }
});

// Create Razorpay order
app.post('/api/donations/checkout', async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 50000, // Fixed amount in paise (500 INR)
      currency: 'INR',
      receipt: `receipt_test_${Date.now()}`,
    });

    console.log('Order Created:', order);
    res.json({ orderId: order.id });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ message: 'Failed to create Razorpay order', error: err.message });
  }
});


// Verify Razorpay payment
app.post('/api/donations/verify', async (req, res) => {
  const { orderId, paymentId, signature, donationId, amount } = req.body;
  try {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === signature) {
      const donation = await Donation.findById(donationId);
      if (!donation) {
        return res.status(404).json({ message: 'Donation request not found' });
      }

      donation.raisedAmount += amount;
      donation.donors.push(paymentId); // Add Razorpay payment ID
      await donation.save();

      res.status(200).json({ message: 'Payment verified and donation updated' });
    } else {
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Payment verification failed', error: err.message });
  }
});














const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

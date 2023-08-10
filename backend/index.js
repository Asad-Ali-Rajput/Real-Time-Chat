// require("dotenv").config();
// const roomRoutes = require("./routes/roomRoutes");
// const { app, server } = require("./routes/socket");
// const debugPrint = require("./utils/debugPrint");
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/router')

// app.use("/rooms", roomRoutes);
// app.use("/user", roomRoutes);
// mongoose.connect('mongodb+srv://asadalirajput453:01QK11VPRWrYr60s@cluster0.mkdznh6.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });

// require("./routes/router")(app)
// server.listen(process.env.PORT | 8080, () => {
//   console.log("Before debugPrint");
//   debugPrint({ message: "SERVER RUNNING" });
//   console.log("After debugPrint");
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Update this with your frontend URL
};

app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://asadalirajput453:01QK11VPRWrYr60s@cluster0.mkdznh6.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // poolSize: 10,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const User = require('./model/userModel');
const Chatroom = require('./model/chatroomModel');
const Message = require('./model/messageModel');

app.post('/signup', async (req, res) => {
  console.log(req)
  try {
    const { email, password, firstname, lastname, pic, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
      pic,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/update', (req, res) => {
  try {
    // Extract user data from JWT (You should implement proper middleware for this)
    const userId = req.userId;
    const newUsername = req.body.username;

    // Find user by ID and update username
    User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          return res.status(500).json({ message: 'Update failed' });
        }
        res.status(200).json({ message: 'Update successful', updatedUser });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Update this with your frontend URL
    methods: ["GET", "POST"],
  },
});

let roomUsers = {};

io.on("connection", (socket) => {
  io.emit("users_response", roomUsers);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    roomUsers = {
      ...roomUsers,
      [roomId]: [...(roomUsers[roomId] ?? []), socket.id],
    };
    io.emit("users_response", roomUsers);
    console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing_response", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    for (const [roomId, users] of Object.entries(roomUsers)) {
      if (users.includes(socket.id)) {
        roomUsers[roomId] = [...users.filter((id) => id !== socket.id)];
        io.emit("receive_message", {
          text: "A user left the room.",
          socketId: "not available",
          roomId: roomId,
        });
      }
    }
    io.emit("users_response", roomUsers);
  });
});

// GET all chat rooms
app.get('/chatrooms', async (req, res) => {
  try {
    const chatrooms = await Chatroom.find().populate('participants', 'username');
    res.json(chatrooms);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST create a new chat room
app.post('/createroom', async (req, res) => {
  const { name, participants, chatroomID } = req.body;

  try {
    const newChatroom = await Chatroom.create({ name, participants, chatroomID });
    res.status(201).json(newChatroom);
  } catch (error) {
    console.log(error, req.body);
    res.status(400).json({ message: 'Invalid input' });
  }
});

app.post('/createmessage', async (req, res) => {
  const { roomId, sender, text } = req.body;

  try {
    const newMessage = await Message.create({ roomId, sender, text });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

// GET all messages for a chat room
app.get('/getmessages/:roomId', async (req, res) => {
  const roomId = req.params.roomId;

  try {
    const messages = await Message.find({ roomId })
      .populate('sender', 'username') // Populate sender details
      .sort({ timestamp: 1 }); // Sort messages by timestamp in ascending order
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

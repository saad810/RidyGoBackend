require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');

const corsOptions = require("./config/corsOptions");
const OrderRoutes = require("./routes/OrderRoutes");
const UserRoutes = require("./routes/UserRoutes");
const RiderRoutes = require("./routes/RiderRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/order", OrderRoutes);
app.use("/user", UserRoutes);
app.use("/rider", RiderRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database connected");

  // Socket.io logic
  io.on('connection', (socket) => {
    console.log('A client connected');

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
  });

  // Start the server
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error("Database connection error:", err);
});

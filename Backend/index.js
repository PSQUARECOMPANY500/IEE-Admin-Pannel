const express = require("express");
const { createServer: createHttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const serviceEnggRoutes = require("./Routes/ServiceEngineerRoutes/ServiceEnggRoute");
const clientRoutes = require("./Routes/ClientRoutes/ClientRoutes");
const AdminRoutes = require("./Routes/AdminRoutes/AdminRoute");
const chatRoute = require("./Routes/ChatRoute/ChatRoute");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ------ Routes ------
// ---------service engg routes---------
app.use("/serviceEngg", serviceEnggRoutes);

// -------------client routes----------
app.use("/client", clientRoutes);

// ---------------AdminRoutes-----------
app.use("/admin", AdminRoutes);

// ------------chatRoute-------------
app.use("/chat", chatRoute);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database connected successfully");
}

// Create HTTP server for Express app
const httpServer = createHttpServer(app);

// Create Socket.IO server using the same HTTP server instance
const io = new SocketServer(httpServer, {
  cors: {
    origin: ["http://localhost:3000","https://iee-admin-pannel.onrender.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket io");

  socket.on("setup", (userData) => {
    socket.join(userData);
    console.log("userData", userData);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    console.log("*-*-*-*--*", newMessageRecieved);
    if (!newMessageRecieved || !newMessageRecieved.Sender) {
      console.log("Invalid message format");
      return;
    }

    console.log("/***", newMessageRecieved.ChatId);
    var chat = newMessageRecieved.ChatId;
    if (!chat.Users) return console.log("chat users not defined");
    if (chat.Users[0] == newMessageRecieved.Sender[0]) return;

    console.log("newMessageRecieved", newMessageRecieved);
    socket.emit("message recieved", newMessageRecieved);
  });

  socket.on("connect_error", (error) => {
    console.error("Failed to connect to socket.io:", error);
  });


  socket.on("disconnect", () => {
    console.log(`A user disconnected:`);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

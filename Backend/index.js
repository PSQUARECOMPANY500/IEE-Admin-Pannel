const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const serviceEnggRoutes = require("./Routes/ServiceEngineerRoutes/ServiceEnggRoute");
const clientRoutes = require("./Routes/ClientRoutes/ClientRoutes");
const AdminRoutes = require("./Routes/AdminRoutes/AdminRoute");
const chatRoute = require("./Routes/ChatRoute/ChatRoute");

require("dotenv").config();

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Specify your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//------ Routes------

// ---------service engg routes---------
app.use("/serviceEngg", serviceEnggRoutes);

//-------------client routes----------
app.use("/client", clientRoutes);

//---------------AdminRoutes-----------
app.use("/admin", AdminRoutes);


//------------chatRoute-------------
app.use("/chat", chatRoute)

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database connected successfully");
}

io.on("connection", (socket) => {
  // console.log(`A user connected: ${socket.id}`);
  console.log("connected to socket io");

  socket.on("setup",(userData) => {
    socket.join(userData);
    console.log("userData",userData)
    socket.emit("connected")
  });


  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room " + room)
  })

  socket.on("disconnect", () => {
    console.log(`A user disconnected: ${socket.id}`);
  });


socket.on("new message", (newMessageRecived) => {
  var chat = newMessageRecived.chat;

  if(!chat){
    return console.log("chat users not defined")
  }

  chat.users.forEach((user) => {
    if(user._id == newMessageRecived.sender._id) return;
  })

  socket.in(user._id).emit("message recieved",newMessageRecived)

})
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

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
    origin: ["http://localhost:3000","https://e908-2405-201-5015-f007-b1ac-2e64-4897-f77a.ngrok-free.app","http://localhost:8081"], // Specify your frontend URL
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
app.use("/chat", chatRoute);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database connected successfully");
}

io.on("connection", (socket) => {
  // console.log(`A user connected: ${socket.id}`);
  console.log("connected to socket io");

// setTimeout(()=>{
//   socket.emit("pankaj", "pankaj mitar");
// },1000)



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
    // console.log("*-*-*-*--*",newMessageRecieved)
    if (!newMessageRecieved || !newMessageRecieved.Sender) {
      // console.log("Invalid message format");
      return;
    }

    console.log("/***", newMessageRecieved.ChatId);
    var chat = newMessageRecieved.ChatId;
    if (!chat.Users) return console.log("chat users not defined");
    if (chat.Users[0] == newMessageRecieved.Sender[0]) return; //if you want to true the condition then change the chat.User[1] to chat.User[0];

    console.log("newMessageRecieved",newMessageRecieved);

    // socket.in(chat.Users[1]).emit("message recieved", newMessageRecieved);
    socket.emit("message recieved",newMessageRecieved);
  });
  socket.on("disconnect", () => {
    console.log(`A user disconnected:`);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

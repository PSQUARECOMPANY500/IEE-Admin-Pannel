const express = require("express");
const { createServer: createHttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/ServiceEngineerRoutes/ServiceEnggRoute");
const clientRoutes = require("./Routes/ClientRoutes/ClientRoutes");
const AdminRoutes = require("./Routes/AdminRoutes/AdminRoute");
const chatRoute = require("./Routes/ChatRoute/ChatRoute");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// ------ Routes ------
// ---------service engg routes---------
app.use("/api/serviceEngg", router);

// -------------client routes----------
app.use("/api/client", clientRoutes);

// ---------------AdminRoutes-----------
app.use("/api/admin", AdminRoutes);

// ------------chatRoute-------------
app.use("/api/chat", chatRoute);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database connected successfully");
}

// Create HTTP server for Express app
const httpServer = createHttpServer(app);

// Listen on separate ports for HTTP and Socket.IO
const httpPort = process.env.PORT || 3000;
const socketPort = process.env.SOCKET_PORT || 4000;

httpServer.listen(httpPort, () => {
  console.log(`HTTP server listening on port ${httpPort}`);
});

const io = new SocketServer();
io.listen(socketPort);
console.log(`Socket.IO server listening on port ${socketPort}`);

// Listen for new connections
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  socket.on("aloo",(recivedMessaege) => { 
    console.log("message si recives",recivedMessaege)
    io.emit('messagerecieved',recivedMessaege)
  });

  socket.on('newEnggmessage', (messageRecives)=>{
    console.log("pankaj side" , messageRecives);
    io.emit("EnggNewMessage",messageRecives)
  })
});

// Listen for disconnections
io.on("disconnect", () => {
  console.log(`A user disconnected:`);
});

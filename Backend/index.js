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
const io = new SocketServer(httpServer, {cors: {origin: "*"}});
// console.log("index.js",io)

// Listen for new connections
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
;

// Emit a message every second
setInterval(() => {
  io.emit('testing', "press hai ye")
}, 10000);


socket.on("newmessage",(recivedMessaege) => { 
  console.log("message si recives",recivedMessaege)
  socket.emit('message recieved',recivedMessaege)
});




})

// Listen for disconnections
io.on("disconnect", () => {
  console.log(`A user disconnected:`);
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});





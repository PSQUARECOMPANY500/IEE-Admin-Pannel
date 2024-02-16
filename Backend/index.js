const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const serviceEnggRoutes = require("./Routes/ServiceEngineerRoutes/ServiceEnggRoute");
const clientRoutes = require("./Routes/ClientRoutes/ClientRoutes");
const AdminRoutes = require("./Routes/AdminRoutes/AdminRoute");

require("dotenv").config();

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:3000", // Specify your frontend URL
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

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://psqrco:psquare@ieelifts.pkgmk5k.mongodb.net/");
  console.log("Database connected successfully");
}

// io.on("connection", (socket) => {
//   console.log(`A user connected: ${socket.id}`);

//   socket.on("send_message",(data) => {
//     console.log(data);
//   });

// });

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

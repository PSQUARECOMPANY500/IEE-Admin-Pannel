const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const serviceEnggRoutes = require("./Routes/ServiceEngineerRoutes/ServiceEnggRoute");
const clientRoutes = require("./Routes/ClientRoutes/ClientRoutes");
const AdminRoutes = require("./Routes/AdminRoutes/AdminRoute");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:3000'] }));
// Use the cors middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database connected successfully");
}


//------ Routes------

// ---------service engg routes---------
app.use("/serviceEngg", serviceEnggRoutes);

//-------------client routes----------
app.use("/client", clientRoutes);

//---------------AdminRoutes-----------
app.use("/admin", AdminRoutes);

app.listen(process.env.PORT , () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

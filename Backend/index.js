const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware

const serviceEnggRoutes = require("./Routes/ServiceEngineerRoutes/ServiceEnggRoute");
const clientRoutes = require("./Routes/ClientRoutes/ClientRoutes");
const AdminRoutes = require("./Routes/AdminRoutes/AdminRoute");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/");
  console.log("Database connected successfully");
}
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the cors middleware
app.use(cors());

//------ Routes------

// ---------service engg routes---------
app.use("/serviceEngg", serviceEnggRoutes);

//-------------client routes----------
app.use("/client", clientRoutes);

//---------------AdminRoutes-----------
app.use("/admin", AdminRoutes);

app.listen(8000, "0.0.0.0", () => {
  console.log(`Listening on port 8000`);
});

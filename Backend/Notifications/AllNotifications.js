const mongoose = require("mongoose");

async function watchForLoginChanges(io) {
  try {
    const callbackModel = mongoose.model("CallbackRequests");

    // Create a change stream for the Login collection
    const clientCallback = callbackModel.watch();

    clientCallback.on("change", (change) => {
      console.log("Login change detected:", change);
      io.emit("callbackClient", change);
    });
  } catch (error) {
    console.error("Error starting change stream:", error);
  }
}

module.exports = watchForLoginChanges;

const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");

// Connect mongoBD
const uri =
  "mongodb+srv://minhthao56:minhthao56@cluster0-dfzmq.gcp.mongodb.net/instagram?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connecting to momgoDB cloud...");
});

// Creata endpoint
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/users", userRouter);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

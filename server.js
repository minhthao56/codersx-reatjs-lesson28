const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Require internal
const userRouter = require("./routers/users.router");
const postRouter = require("./routers/post.router");

//Port
const port = 3001;
// Connect mongoBD
const uri =
  "mongodb+srv://minhthao56:minhthao56@cluster0-dfzmq.gcp.mongodb.net/instagram?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connecting to momgoDB cloud...");
});
// Cors
app.use(cors());
// Request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creata endpoint
app.use("/users", userRouter);
app.use("/posts", postRouter);

//Listen
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

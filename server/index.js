const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  path: "/api/socket.io",
});

module.exports = io;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", require("./routes/api"));

app.use(errorHandler);

server.listen(3001, () => console.log("listen 3001!"));

function errorHandler(err, req, res, next) {
  res.status(err.code).send({ msg: err.message });
}

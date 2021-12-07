const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

module.exports = io;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/covid", require("./routes/covidRouter"));
app.use("/user", require("./routes/userRouter"));
app.use("/developer", require("./routes/developerRouter"));

app.use(errorHandler);

server.listen(3001, () => console.log("listen 3001!"));

function errorHandler(err, req, res, next) {
  res.status(err.code).send({ msg: err.message });
}

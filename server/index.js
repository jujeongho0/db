const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/covid", require("./routes/covidRouter"));
app.use("/user", require("./routes/userRouter"));
app.use("/developer", require("./routes/developerRouter"));

app.use(errorHandler);
app.listen(3001, () => console.log("listen 3001!"));

function errorHandler(err, req, res, next) {
  res.status(err.code).send({ msg: err.message });
}

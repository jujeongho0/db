const request = require("request");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const _ = require("lodash");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./area"));
app.use(errorHandler);

// const area = [
//   "서울",
//   "부산",
//   "대구",
//   "인천",
//   "광주",
//   "대전",
//   "울산",
//   "세종",
//   "경기",
//   "강원",
//   "충북",
//   "충남",
//   "전북",
//   "전남",
//   "경북",
//   "경남",
//   "제주",
// ];

// setInterval(() => {
//   try {
//     request.get(
//       "https://apiv2.corona-live.com/domestic-updates.json",
//       (err, __, response) => {
//         const data = JSON.parse(response).updates.data;
//         const transData = data.map((v) => ({
//           date: v.datetime,
//           city: area[v.city],
//           num: Number(v.src.split("명")[0]),
//         }));
//         if (!_.isEqual(prevData, transData[0])) {
//           io.emit("realtime", transData[0]);
//         }
//         prevData = transData[0];
//       }
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }, 5000);

function errorHandler(err, req, res, next) {
  res.status(err.code).send({ msg: err.message });
}

server.listen(3001, () => console.log("listen 3001!"));

const mysql = require("mysql");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "covid",
  port: 3306,
};

const pool = mysql.createPool(dbConfig); //연결커넥션 범위
pool.getConnection(function (err, conn) {
  if (err) {
    console.error("db connection error:", err);
    return; //커넥션 종료
  }

  console.log("db connection success");
}); //node dbConnection.js로 확인

module.exports = pool;

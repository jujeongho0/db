const realTimeData = require("../realtime_parser");
const mysql = require("mysql");
const io = require("../index");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "covid",
  port: 3306,
};

function korTime() {
  const date = new Date();
  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  date.setHours(hours - offset);
  return date;
}

const pool = mysql.createPool(dbConfig); //연결커넥션 범위
pool.getConnection(function (err, conn) {
  if (err) {
    console.error("db connection error:", err);
    return; //커넥션 종료
  }

  console.log("db connection success");

  let isDelete = false;
  // 실시간 데이터 주기적으로 삽입
  setInterval(() => {
    // 오후 한시에 real_time table 삭제
    const currDate = korTime();
    console.log(currDate.getUTCHours(), currDate.getUTCMinutes(), isDelete);
    if (
      currDate.getUTCHours() == 9 &&
      currDate.getUTCMinutes() == 0 &&
      !isDelete
    ) {
      isDelete = true;
      conn.query("DELETE FROM today_confirmed");
    } else if (
      currDate.getUTCHours() >= 9 &&
      currDate.getUTCMinutes() >= 1 &&
      isDelete
    ) {
      isDelete = false;
    }
    realTimeData().then((data) => {
      const sqlData = data.map((v) => ({
        insert: `INSERT INTO today_confirmed(today_area,today_district,today_confirmed) VALUES ('${v.area}','${v.district}',${v.num});`,
        select: `SELECT today_area,today_district,today_confirmed FROM today_confirmed WHERE today_area = '${v.area}' AND today_district = '${v.district}'`,
        update: `UPDATE today_confirmed SET today_confirmed = ${v.num} WHERE today_area = '${v.area}' AND today_district = '${v.district}'`,
        num: v.num,
      }));

      try {
        sqlData.forEach((sql) => {
          conn.query(sql.select, function (err, result) {
            if (result.length >= 1) {
              conn.query(sql.update);
              if (sql.num - result[0].today_confirmed > 0) {
                io.emit("realtime", {
                  area: result[0].today_area,
                  district: result[0].today_district,
                  num: sql.num - result[0].today_confirmed,
                });
              }
            } else if (result.length == 0) {
              conn.query(sql.insert);
            }
          });
        });
        console.log(korTime(), "실시간 데이터 완료");
      } catch (e) {}
    });
  }, 10000);
}); //node dbConnection.js로 확인

module.exports = pool;

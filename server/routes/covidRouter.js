const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const pool = require("./dbConnection");

router.get("/distLevels", distLevel_list);
router.get("/covidInfos", covidInfo_list);
router.get("/covidInfos/district", covidDistrict_list);
router.get("/vaccInfos", vaccInfo_list);
router.get("/dailyInfos", dailyInfo_list);
router.post("/real_times", real_time_lsit);

function real_time_lsit(req, res, next) {
  const id = req.body.id;

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    let sql;
    sql = "SELECT user_district FROM user WHERE user_rrn = ?";
    conn.query(sql, id, function (err, result) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      console.log(result[0].user_district);
      const userDistrict = result[0].user_district;
      console.log(userDistrict);

      if (userDistrict == "") {
        sql = "SELECT * FROM real_time_confirmed";
      } else {
        sql = mysql.format(
          "SELECT distinct A.real_time, A.real_area, A.real_district, A.real_confirmed FROM real_time_confirmed as A INNER JOIN user as B ON A.real_district = B.user_district WHERE B.user_district = ?",
          [userDistrict]
        );
      }

      conn.query(sql, function (err, results) {
        if (err) {
          err.code = 500;
          return next(err);
        }
        console.log(results);

        const real_timeInfo = {
          count: results.length,
          data: results,
        };
        conn.release();
        res.json(real_timeInfo);
      });
    });
  });
}

function distLevel_list(req, res, next) {
  const date = req.query.date;
  const area = req.query.area;
  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }

    const sql = mysql.format(
      "SELECT area_dist_level,dist_info,dist_standard FROM area,social_dist WHERE area_name = ? AND area.update_date = ? AND area.area_dist_level = social_dist.dist_level",
      [area, date]
    );

    conn.query(sql, function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }

      const areaDistlevel = {
        count: results.length,
        data: results,
      };
      conn.release();
      res.json(areaDistlevel);
    });
  });
}

// SELECT area_name, avg(area_confirmed) FROM area WHERE update_date BETWEEN '2021-11-24' AND '2021-11-30' GROUP BY area_name;
function covidInfo_list(req, res, next) {
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;
  const area_name =
    req.query.area !== undefined ? decodeURI(req.query.area) : undefined;

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }

    let range = false;
    let sql;
    if (end_date == undefined || start_date == end_date) {
      sql = mysql.format(
        `SELECT * FROM area WHERE update_date = ?${
          area_name ? ` AND area_name = '${area_name}'` : ""
        }`,
        [start_date]
      );
    } else {
      sql = mysql.format(
        `SELECT area_name, avg(area_confirmed) as area_confirmed, avg(area_isolated) as area_isolated, avg(area_deseased) as area_deseased, avg(area_recovered) as area_recovered, ROUND(avg(area_dist_level)) as area_dist_level FROM area WHERE update_date BETWEEN ? AND ? GROUP BY area_name${
          area_name ? ` HAVING area_name = '${area_name}'` : ""
        }`,
        [start_date, end_date]
      );
      range = true;
    }
    conn.query(sql, function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      const covidInfo = {
        count: results.length,
        data: results,
        range,
      };
      conn.release();
      res.json(covidInfo);
    });
  });
}

function covidDistrict_list(req, res, next) {
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;
  const area = decodeURI(req.query.area);

  pool.getConnection(function (err, conn) {
    let range = false;
    let sql;
    if (end_date == undefined || start_date == end_date)
      sql = mysql.format(
        "SELECT district, district_confirmed FROM district WHERE update_date = ? AND area_name = ?",
        [start_date, area]
      );
    else {
      sql = mysql.format(
        "SELECT district , avg(district_confirmed) as district_confirmed FROM district WHERE update_date BETWEEN ? AND ? AND area_name = ? GROUP BY district",
        [start_date, end_date, area]
      );
      range = true;
    }
    conn.query(sql, function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }

      const covidDistrict = {
        count: results.length,
        data: results,
        range,
      };
      conn.release();
      res.json(covidDistrict);
    });
  });
}

function vaccInfo_list(req, res, next) {
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;
  pool.getConnection(function (err, conn) {
    let sql;
    let range = false;
    if (end_date == undefined || start_date == end_date) {
      sql = mysql.format("SELECT * FROM vaccine WHERE update_date = ?", [
        [start_date],
      ]);
    } else {
      sql = mysql.format(
        "SELECT vacc_name, avg(vacc_once) as vacc_once, avg(vacc_fully) as vacc_once, avg(vacc_boost) as vacc_boost FROM vaccine WHERE update_date BETWEEN ? AND ? GROUP BY vacc_name",
        [start_date, end_date]
      );
      range = true;
    }
    conn.query(sql, function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      const vaccInfo = {
        count: results.length,
        data: results,
        range,
      };
      conn.release();
      res.json(vaccInfo);
    });
  });
}

function dailyInfo_list(req, res, next) {
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;
  const columns = decodeURI(req.query.columns);

  pool.getConnection(function (err, conn) {
    let sql;
    let range = false;
    if (end_date == undefined || start_date == end_date) {
      sql = mysql.format(
        `SELECT ${columns} FROM daily_data WHERE update_date = ?`,
        [start_date]
      );
    } else {
      sql = mysql.format(
        `SELECT ${columns} FROM daily_data WHERE update_date BETWEEN ? AND ?`,
        [start_date, end_date]
      );
      range = true;
    }
    conn.query(sql, function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      const dailyInfo = {
        count: results.length,
        data: results,
        range,
      };
      conn.release();
      res.json(dailyInfo);
    });
  });
}

module.exports = router;

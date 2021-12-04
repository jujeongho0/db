const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const pool = require("./dbConnection");

router.get("/distLevels", distLevel_list); //
router.get("/covidInfos", covidInfo_list);
router.get("/covidInfos/district", covidDistrict_list);
router.get("/vaccInfos", vaccInfo_list);
router.get("/dailyInfos", dailyInfo_list); //

function distLevel_list(req, res, next) {
  const date = req.query.date;
  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }

    const sql =
      "SELECT area_name, area_dist_level FROM area WHERE update_date = ?";
    conn.query(sql, date, function (err, results) {
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

// SELECT area_name, sum(area_confirmed) FROM area WHERE update_date BETWEEN '2021-11-24' AND '2021-11-30' GROUP BY area_name;
function covidInfo_list(req, res, next) {
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }

    let range = false;
    let sql;
    if (end_date == undefined || start_date == end_date) {
      sql = mysql.format("SELECT * FROM area WHERE update_date = ?", [
        [start_date],
      ]);
    } else {
      sql = mysql.format(
        "SELECT area_name, sum(area_confirmed), sum(area_isolated), sum(area_deseased), sum(area_recovered), avg(area_dist_level) FROM area WHERE update_date BETWEEN ? AND ? GROUP BY area_name",
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
        "SELECT district , sum(district_confirmed) FROM district WHERE update_date BETWEEN ? AND ? AND area_name = ? GROUP BY district",
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
        "SELECT vacc_name, sum(vacc_once), sum(vacc_fully), sum(vacc_boost) FROM vaccine WHERE update_date BETWEEN ? AND ? GROUP BY vacc_name",
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
  const date = req.query.date;

  pool.getConnection(function (err, conn) {
    const sql = "SELECT * FROM daily_data WHERE update_date >= ?";
    conn.query(sql, date, function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }

      const dailyInfo = {
        count: results.length,
        data: results,
      };
      conn.release();
      res.json(dailyInfo);
    });
  });
}

module.exports = router;

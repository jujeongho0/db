const express = require("express");
const router = express.Router();
const pool = require("./dbConnection");

router.get("/areaDistlevels", areaDistlevel_list);
// router.get('/areaCovidgraphs', areaCovidinfo_list);
router.get("/areaDistlevels/:date", areaDistlevel_detail);
// router.get('/areaCovidgraphs/:date', areaCovidinfo_detail);
//router.post('/user/:id', insertUser);
router.post("/user", addUser);
router.put("/user/:id", modifyUserState);

function modifyUserState(req, res, next) {
  const id = req.params.id;
  const user_vacc_boost_name = req.body.user_vacc_boost_name;

  const info = {};
  if (vacc_boost_name) {
    //해당 이름이 기입된 경우 할당
    info.user_vacc_boost_name = user_vacc_boost_name;
  }

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }

    const sql = "UPATE FROM user SET ? WHERE user_rrn = ?";
    conn.query(sql, [info, id], function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      res.send({ msg: success });
      conn.release();
    });
  });
}

function addUser(req, res, next) {
  console.log(req.body);
  const name = req.body.name;
  const rrn = req.body.rrn;
  const sex = req.body.sex;
  const area = req.body.area;
  const vacc_name = req.body.vacc_name;
  const vacc_boost_name = req.body.vacc_boost_name;
  const vaccinated = req.body.vaccinated;
  const vaccinated_date = req.body.vaccinated_date;
  //parseInt(req.body.parser); 문자열-> 숫자로 변환
  const state = req.body.state;

  const userInfo = {
    user_name: name,
    user_rrn: rrn,
    user_sex: sex,
    user_area: area,
    user_vacc_name: vacc_name,
    user_vacc_boost_name: vacc_boost_name,
    user_vaccinated: vaccinated,
    user_vaccinated_date: vaccinated_date,
    user_state: state,
  };

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    const sql = "INSERT INTO user SET ?";
    conn.query(sql, userInfo, function (err, result) {
      res.send({ msg: "success" });
      conn.release();
    });
  });
}

function areaDistlevel_list(req, res, next) {
  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }

    const sql = "SELECT * FROM area";
    conn.query(sql, function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }

      const areaDistlevel_list_v = {
        count: results.length,
        data: results,
      };

      conn.release();
      res.send(areaDistlevel_list_v);
    });
  });
}

// function areaCovidinfo_list(req, res, next){

// };

function areaDistlevel_detail(req, res, next) {
  const date = req.params.date;

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }

    const sql = "SELECT * FROM area WHERE update_date =?";
    conn.query(sql, date, function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }

      if (results.length == 0) {
        res.status(404).send({ msg: "Not Found" });
        return;
      }

      const areaDistlevel_detail_v = results[0];

      conn.release();
      res.send(areaDistlevel_detail_v);
    });
  });
}

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("./dbConnection");

router.post("/addUser", addUser); //정보 등록
router.put("/infoEdit", modifyUser); //정보 전체 수정
router.patch("/state", modifyUserState); //유저 상태 변화
router.patch("/boost", modifyUserBoost); //부스터샷 변화
router.post("/login", login);

function login(req, res, next) {
  const rrn = req.body.rrn;
  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    const sql = "SELECT * FROM user WHERE user_rrn = ?";
    conn.query(sql, rrn, function (err, result) {
      if (result.length) res.send({ msg: "success", result: result[0] });
      else if (!result.length) res.send({ msg: "fail" });
      conn.release();
    });
  });
}

//유저 정보 등록
function addUser(req, res, next) {
  const name = req.body.name;
  const rrn = req.body.rrn;
  const sex = req.body.sex;
  const area = req.body.area;
  const district = req.body.district;
  const vacc_name = req.body.vacc_name;
  const vaccinated = req.body.vaccinated;
  const vaccinated_date = req.body.vaccinated_date;

  const userInfo = {
    user_name: name,
    user_rrn: rrn,
    user_sex: sex,
    user_area: area,
    user_district: district,
    user_vacc_name: vacc_name,
    user_vaccinated: vaccinated,
    user_vaccinated_date: vaccinated_date,
  };

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    const sql = "INSERT INTO user SET ?";
    conn.query(sql, userInfo, function (err, result) {
      if (err) {
        err.code = 500;
        return next(err);
      }

      res.send({ msg: "success" });
      conn.release();
    });
  });
}

//유저 정보 전체 수정
function modifyUser(req, res, next) {
  const id = req.body.id;
  const name = req.body.name;
  const rrn = req.body.rrn;
  const sex = req.body.sex;
  const area = req.body.area;
  const vacc_name = req.body.vacc_name;
  const vacc_boost_name = req.body.vacc_boost_name;
  const vaccinated = req.body.vaccinated;
  const vaccinated_date = req.body.vaccinated_date;
  const state = req.body.state;

  const info = {};
  if (name) {
    info.user_name = name;
  }
  if (rrn) {
    info.user_rrn = rrn;
  }
  if (sex) {
    info.user_sex = sex;
  }
  if (area) {
    info.user_area = area;
  }
  if (vacc_name) {
    info.user_vacc_name = vacc_name;
  }
  if (vacc_boost_name) {
    info.user_vacc_boost_name = vacc_boost_name;
  }
  if (vaccinated) {
    info.user_vaccinated = vaccinated;
  }
  if (vaccinated_date) {
    info.user_vaccinated_date = vaccinated_date;
  }
  if (state) {
    info.user_state = state;
  }

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }

    const sql = "UPDATE user SET ? WHERE user_rrn = ?";
    conn.query(sql, [info, id], function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      res.send({ msg: "success" });
      conn.release();
    });
  });
}

//유저 상태 변화
function modifyUserState(req, res, next) {
  const id = req.body.id;
  const state = req.body.state;

  const info = {
    user_state: state,
  };

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    const sql = "UPDATE user SET ? WHERE user_rrn = ?";
    conn.query(sql, [info, id], function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      res.json({ msg: "success" });
    });
    //const sql2 = 'UPDATE realtime SET ? WHERE area = ?';
  });
}

//부스터샷 변화
function modifyUserBoost(req, res, next) {
  const id = req.body.id;
  const boost = req.body.boost;

  const info = {
    user_vacc_boost_name: boost,
  };

  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    const sql = "UPDATE user SET ? WHERE user_rrn = ?";
    conn.query(sql, [info, id], function (err) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      res.send({ msg: "success" });
      conn.release();
    });
  });
}

module.exports = router;

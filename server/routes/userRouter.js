const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const pool = require("./dbConnection");

router.post("/addUser", addUser); //정보 등록
router.put("/infoEdit", modifyUser); //정보 전체 수정
router.patch("/userVaccine", modifyUserVacc); //회원 백신 접종 정보 변경(user)
// router.patch("/boost", modifyUserBoost); 
router.post("/login", login);
router.delete("/withdrawal", withdrawal);
router.get("/nearHospital", nearHospital);
router.get("/todayDistrictInfo", todayDistrictInfo);
router.get("/todayAreaInfo", todayAreaInfo);

function nearHospital(req, res, next) {
  const rrn = req.query.rrn;
  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    let sql;
    sql =
      "SELECT hospital_name FROM user INNER JOIN hospital ON user_district = hospital_district AND hospital_area = user_area";
    conn.query(sql, rrn, function (err, result) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      res.json({
        ...result[0],
      });
    });
  });
}

function todayAreaInfo(req, res, next) {
  const rrn = req.query.rrn;
  const yesterday = req.query.yesterday;
  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    let sql;
    sql =
      "SELECT sum(today_confirmed) as user_area_confirmed FROM user,today_area WHERE user.user_rrn = ? AND user.user_area = today_area.today_area GROUP BY today_area";
    conn.query(sql, rrn, function (err, result) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      sql = mysql.format(
        `SELECT (${result[0].user_area_confirmed} - area_confirmed) as area_compare_yesterday FROM area,user WHERE update_date = ? AND user_rrn = ? AND user_area  = area_name`,
        [yesterday, rrn]
      );
      conn.query(sql, function (err, result2) {
        res.json({
          ...result[0],
          ...result2[0],
        });
      });
    });
  });
}

function todayDistrictInfo(req, res, next) {
  const rrn = req.query.rrn;
  const yesterday = req.query.yesterday;
  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    let sql;

    sql =
      "SELECT today_confirmed as user_district_confirmed FROM user,today_area WHERE user.user_rrn = ? AND user.user_district = today_area.today_district AND user.user_area = today_area.today_area";
    conn.query(sql, rrn, function (err, result) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      let user_district_confirmed = 0;
      if (result && result.length > 0) {
        user_district_confirmed = result[0].user_district_confirmed;
      }
      sql = mysql.format(
        `SELECT (${user_district_confirmed} - district_confirmed) as district_compare_yesterday FROM district,user WHERE update_date = ? AND user_rrn = ? AND user_district = district`,
        [yesterday, rrn]
      );
      conn.query(sql, function (err, result2) {
        let district_compare_yesterday = 0;
        if (result2 && result2.length > 0) {
          district_compare_yesterday = result2[0].district_compare_yesterday;
        }
        res.json({
          user_district_confirmed,
          district_compare_yesterday,
        });
      });
    });
  });
}

function withdrawal(req, res, next) {
  const rrn = req.body.rrn;
  pool.getConnection(function (err, conn) {
    if (err) {
      err.code = 500;
      return next(err);
    }
    const sql = "DELETE FROM user WHERE user_rrn = ?";
    conn.query(sql, rrn, function (err, result) {
      res.send({ msg: "success", result: result[0] });
      conn.release();
    });
  });
}

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
  //const vacc_boost_name = req.body.vacc_boost_name;
  const vaccinated = req.body.vaccinated;
  const vaccinated_date = req.body.vaccinated_date;
  //const state = req.body.state;

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
  // if (vacc_boost_name) {
  //   info.user_vacc_boost_name = vacc_boost_name;
  // }
  if (vaccinated) {
    info.user_vaccinated = vaccinated;
  }
  if (vaccinated_date) {
    info.user_vaccinated_date = vaccinated_date;
  }
  // if (state) {
  //   info.user_state = state;
  // }

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

//회원 백신 접종 정보 변경(user)
function  modifyUserVacc(req, res, next) {
  const id = req.body.id;
  const v_name = req.body.user_vacc_name;
  const v_step = req.body.user_vaccinated; 
  const v_date = req.body.user_vaccinated_date;
 
  

  const info = {
    user_vacc_name: v_name ,
    user_vaccinated: v_step,
    user_vaccinated_date: v_date,
  };

  pool.getConnection(function (err, conn) {
    if (err) { err.code = 500; return next(err); }
    
    const sql = "UPDATE user SET ? WHERE user_rrn = ?";
    conn.query(sql, [info, id], function (err, results) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      res.json({ msg: "success" });
    });
  });
}


//부스터샷 변화
// function modifyUserBoost(req, res, next) {
//   const id = req.body.id;
//   const boost = req.body.boost;

//   const info = {
//     user_vacc_boost_name: boost,
//   };

//   pool.getConnection(function (err, conn) {
//     if (err) {
//       err.code = 500;
//       return next(err);
//     }
//     const sql = "UPDATE user SET ? WHERE user_rrn = ?";
//     conn.query(sql, [info, id], function (err) {
//       if (err) {
//         err.code = 500;
//         return next(err);
//       }
//       res.send({ msg: "success" });
//       conn.release();
//     });
//   });
// }

module.exports = router;

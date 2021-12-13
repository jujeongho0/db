const express = require('express');
const router = express.Router();
const pool = require('./dbConnection');

router.put('/distlevelInfo', modify_distlevelInfo);  //거리두기 단계 데이터 수정(social_dist) 
//router.delete('/realtime', delete_realtime);
router.delete('/hospital', delete_hospital); //지역별 선별진료소 삭제(hospital)
router.patch('/areaSDLevel', change_area_SDLevel)//지역 거리두기 단계 변경(area)


//지역 거리두기 단계 변경(area)
function change_area_SDLevel(req, res, next) {
    const a_name = req.body.area_name;
    const a_level = req.body.area_dist_level;
  
    const info = { 
        area_dist_level: a_level,
    };
  
    pool.getConnection(function (err, conn) {
      if (err) {
        err.code = 500;
        return next(err);
      }
      const sql = "UPDATE area SET ? WHERE area_name = ?";
      conn.query(sql, [info, a_name], function (err, results) {
        if (err) {
          err.code = 500;
          return next(err);
        }
        res.json({ msg: "success" });
      });
    });
}


//지역별 선별진료소 삭제(hospital) 
function delete_hospital(req, res, next){
    const h_name = req.query.hospital;

    pool.getConnection(function(err,conn){
        if(err){ err.code = 500; return next(err); }
        const sql = 'DELETE FROM hospital WHERE hospital_name = ?';
        conn.query(sql, h_name, function(err, results){
            if(err){
                err.code = 500;
                return next(err);
            }
            res.send({msg: 'success'});
            conn.release();
        });
    });
};

//거리두기 단계 데이터 수정(social_dist) 
function modify_distlevelInfo(req, res, next){ 
    const level = req.query.level;

    const dist_level = req.body.dist_level;
    const dist_info = req.body.dist_info;
    const dist_standard = req.body.dist_standard;
    const dist_gathering = req.body.dist_gathering;
  
    const info = {};
    if(dist_level){
        info.dist_level = dist_level;
    }
    if(dist_info){
         info.dist_info = dist_info;
    }
    if(dist_standard){
        info.dist_standard = dist_standard;
    }
    if(dist_gathering){
        info.dist_gathering = dist_gathering;
    }
       
    pool.getConnection(function(err,conn){
        if(err){
            err.code = 500;
            return next(err);
        }

        const sql = 'UPDATE social_dist SET ? WHERE dist_level = ?';
        conn.query(sql, [info, level], function(err, results){
            if(err){
                err.code = 500;
                return next(err);
            }
            res.send({msg: 'success'});
            conn.release();
        });
    
    });
};


// function delete_realtime(req, res, next){
//     const date = req.query.date;

//     pool.getConnection(function(err,conn){
//         if(err){
//             err.code = 500;
//             return next(err);
//         }
//         const sql = 'DELETE FROM real_time_confirmed WHERE real_time <= ?';
//         conn.query(sql, date, function(err, results){
//             if(err){
//                 err.code = 500;
//                 return next(err);
//             }
//             res.send({msg: 'success'});
//             conn.release();
//         });
//     });
   
// };



module.exports = router;
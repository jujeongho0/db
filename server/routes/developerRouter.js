const express = require('express');
const router = express.Router();
const pool = require('./dbConnection');

router.put('/distlevelInfo', modify_distlevelInfo); //거리두기 단계 정보 수정
router.delete('/realtime', delete_realtime);//실시간테이블 관리 -> 지난 날짜 삭제 


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


function delete_realtime(req, res, next){
    const date = req.query.date;

    pool.getConnection(function(err,conn){
        if(err){
            err.code = 500;
            return next(err);
        }
        const sql = 'DELETE FROM real_time_confirmed WHERE real_time <= ?';
        conn.query(sql, date, function(err, results){
            if(err){
                err.code = 500;
                return next(err);
            }
            res.send({msg: 'success'});
            conn.release();
        });
    });
   
};



module.exports = router;
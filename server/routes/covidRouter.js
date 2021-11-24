const express = require('express');
const router = express.Router();
const pool = require('./dbConnection');

router.get('/distLevels/:date', distLevel_list); //
router.get('/covidInfos/:date', covidInfo_list);
router.get('/covidInfos/:date/district', covidDistrict_list);
router.get('/vaccInfos/:date', vaccInfo_list);
router.get('/dailyInfos/:date', dailyInfo_list); //

function  distLevel_list(req, res, next){
    const date = req.params.date;

    pool.getConnection(function(err,conn){
        if(err){
            err.code = 500;
            return next(err);
        }

        const sql = 'SELECT area_name, area_dist_level FROM area WHERE update_date = ?';
        conn.query(sql,date, function(err, results){
            if(err){
                err.code = 500;
                return next(err);
            }
    
            const areaDistlevel = {
                count : results.length,
                data :  results
            };           
            conn.release();
            res.json(areaDistlevel);
        });
    });
};

function covidInfo_list(req, res, next){
    const date = req.params.date;

    pool.getConnection(function(err,conn){
        if(err){
            err.code = 500;
            return next(err);
        }

        const sql = 'SELECT * FROM area WHERE update_date = ?';
        conn.query(sql,date, function(err, results){
            if(err){
                err.code = 500;
                return next(err);
            }
    
            const covidInfo = {
                count : results.length,
                data :  results
            };           
            conn.release();
            res.json(covidInfo);
        });
    });
};

function  covidDistrict_list(req, res, next){
    const date = req.params.date;

    pool.getConnection(function(err,conn){

        const sql = 'SELECT * FROM district WHERE update_date = ?';
        conn.query(sql,date, function(err, results){
            if(err){
                err.code = 500;
                return next(err);
            }
    
            const covidDistrict = {
                count : results.length,
                data :  results
            };           
            conn.release();
            res.json(covidDistrict);
        });
    });
};

function  vaccInfo_list(req, res, next){
    const date = req.params.date;

    pool.getConnection(function(err,conn){

        const sql = 'SELECT * FROM vaccine WHERE update_date = ?';
        conn.query(sql,date, function(err, results){
            if(err){
                err.code = 500;
                return next(err);
            }
    
            const vaccInfo = {
                count : results.length,
                data :  results
            };           
            conn.release();
            res.json(vaccInfo);
        });
    });
};

function  dailyInfo_list(req, res, next){
    const date = req.params.date;

    pool.getConnection(function(err,conn){

        const sql = 'SELECT * FROM daily_data WHERE update_date = ?';
        conn.query(sql,date, function(err, results){
            if(err){
                err.code = 500;
                return next(err);
            }
    
            const dailyInfo = {
                count : results.length,
                data :  results
            };           
            conn.release();
            res.json(dailyInfo);
        });
    });
};

module.exports = router;

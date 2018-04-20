let mysql = require('mysql');
let db = require('../config/db');
let pool = mysql.createPool(db);

module.exports = {
    connPool(sql, val, cb) {
        pool.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err, rows) => {

                if (err) {
                    console.log(err);
                    cb(err, rows);
                } else {
                    cb(rows, err);
                    //释放连接
                    conn.release();
                }

            });
        });
    },

    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        let obj = { code, msg, data };

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
};
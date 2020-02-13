var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    pages: function (callback) {
        pool.query('select count(list_id) from todo_lists;', function (error, result, fields) {
            if (error) throw error;
            callback(result);
        });
    },
    list: function (pageNum, callback) {
        pool.query(`select * from todo_lists limit ${(pageNum - 1) * 10},10;`, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    add: function (params, callback) {
        // params.info params.weight
        pool.query(`INSERT INTO todo_lists ( list_info, create_time, list_weight ) VALUES ( "${params.info}", ${new Date().getTime()}, ${params.weight} );`, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    deleteById: function (id, callback) {
        pool.query(`delete from todo_lists where list_id = ${id}`, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    update: function (params, callback) {
        pool.query(`UPDATE todo_lists SET list_info='${params.info}', list_weight='${params.weight}' WHERE list_id=${params.id};`, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    }
};

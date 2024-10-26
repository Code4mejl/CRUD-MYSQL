const mysql = require("mysql2/promise"); 

const mySqlPool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"WJ28@krhps",
    database:"student_db",
});

module.exports = mySqlPool;
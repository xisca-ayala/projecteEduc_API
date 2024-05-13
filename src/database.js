const mysql = require("mysql2");

const pool = mysql.createPool({
    host                : "localhost",
    user                : "root",
    password            : "Xismaygi86!",
    database            : "AppBooks",
    waitForConnections  : true,
    connectionLimit     : 10,
    maxIdle             : 10,
    idleTimeout         : 60000,
    queueLimit          : 0
}).promise();

console.log("Conexión con la BBDD Creada");

module.exports = {pool}; 
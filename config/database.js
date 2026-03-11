const mysql = require('mysql2');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1819diana',
    database: 'BD_Express_2026'
});

conexion.connect(function(err){
    if(err)
        throw err;
    console.log('Conexion a BD exitosa!!!');
});

module.exports = conexion;
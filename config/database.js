const mysql = require('mysql2');

const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306 // Puerto estándar de Clever Cloud
});

conexion.connect(function(err){
    if(err){
        console.error('Error de conexión a la BD:', err);
        return;
    }
    console.log('¡Conexión a BD en la nube exitosa!');
});

module.exports = conexion;

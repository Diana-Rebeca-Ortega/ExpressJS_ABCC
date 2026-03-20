'use strict';

const conexion = require('../config/database');

let Alumno = function(alumno){
    this.NumControl = alumno.NumControl; 
    this.Nombre     = alumno.Nombre;
    this.PrimerAp   = alumno.PrimerAp;
    this.SegundoAp  = alumno.SegundoAp;
    this.FechaNac   = alumno.FechaNac;
    this.Semestre   = alumno.Semestre;
    this.Carrera    = alumno.Carrera;
};

// --- CONSULTA DE TODOS (El que fallaba en el forEach) ---
Alumno.findAll = function(result){
    // Al usar el pool, es mejor manejar el error directamente aquí
    conexion.query("SELECT * FROM alumnos", function(err, res){
        if(err){
            console.error("Error en findAll:", err);
            return result(err, null);
        }
        // Aseguramos que siempre devolvemos un arreglo
        result(null, res || []);
    });
};

// --- BUSQUEDA POR ID ---
Alumno.findById = function(nc, result){
    conexion.query("SELECT * FROM alumnos WHERE NumControl = ?", [nc], function(err, res){
        if(err){
            console.error("Error en findById:", err);
            return result(err, null);
        }
        // res[0] porque SELECT devuelve un arreglo y solo queremos un alumno
        result(null, res[0] || {});
    });
};

// --- ALTA ---
Alumno.create = function(alumno, result){
    conexion.query("INSERT INTO alumnos SET ?", alumno, function(err, res){
        if(err){
            console.error("Error en create:", err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

// --- BAJA ---
Alumno.delete = function(nc, result){
    conexion.query("DELETE FROM alumnos WHERE NumControl = ?", [nc], function(err, res){
        if(err){
            console.error("Error en delete:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// --- CAMBIOS ---
Alumno.update = function(id, alumno, result){
    conexion.query(
        "UPDATE alumnos SET Nombre = ?, PrimerAp = ?, SegundoAp = ?, FechaNac = ?, Semestre = ?, Carrera = ? WHERE NumControl = ?",
        [alumno.Nombre, alumno.PrimerAp, alumno.SegundoAp, alumno.FechaNac, alumno.Semestre, alumno.Carrera, id], 
        function(err, res){
            if(err){
                console.error("Error en update:", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
};

module.exports = Alumno;
'use strict';

const conexion =require('../config/database');
let Alumno = function(alumno){
    // Estos nombres deben ser IGUALES a tu tabla en MySQL
    this.NumControl = alumno.NumControl; 
    this.Nombre     = alumno.Nombre;
    this.PrimerAp   = alumno.PrimerAp;
    this.SegundoAp  = alumno.SegundoAp;
    this.FechaNac   = alumno.FechaNac;
    this.Semestre   = alumno.Semestre;
    this.Carrera    = alumno.Carrera;
};

//===================LOGICA PARA LA BD DE DATOS RELACIONAL========
Alumno.create = function(alumno, result){
    conexion.query("INSERT INTO alumnos SET ?", alumno, function(err, res){
            if(err){
                console.log("Error: ", err);
                result(err, null);
            }else{
                console.log("Insrcion EXITOSA");
                result(null, res.insertId);
            }
    });
}

//BAJAS
Alumno.delete = function(nc, result){
    conexion.query("DELETE FROM alumnos WHERE NumControl= ?", [nc], function(err, res){
     if(err){
                console.log("Error: ", err);
                result(null,err);
            }else{
                console.log("Eliminacion EXITOSA");
                result(null, res.insertID);
            }
    });

}
//CAMBIOS 
Alumno.update = function(id, alumno, result){
    conexion.query("UPDATE alumnos SET Nombre = ?, PrimerAp =?, SegundoAp=?, FechaNac=?, Semestre=?, Carrera =? WHERE NumControl = ?",
        [alumno.Nombre, alumno.PrimerAp, alumno.SegundoAp, alumno.FechaNac, alumno.Semestre, alumno.Carrera, id], function(err,res){
            if(err){
                console.log("Error: ", err);
                result(err, null);
            }else{
                console.log("Modificacion EXITOSA");
                result(null, res);
            }
        }
    )
}
//CONSULTAS

Alumno.findById = function(nc, result){
    conexion.query("SELECT * FROM alumnos WHERE NumControl =?", [nc], function(err, res){
          if(err){
                console.log("Error: ", err);
                result(err, null);
            }else{
                console.log("Modificacion EXITOSA");
                result(null, res);
            }
    })
}

Alumno.findAll = function(result){
    conexion.query("SELECT * FROM alumnos", function(err, res){
          if(err){
                console.log("Error: ", err);
                result(err, null);
            }else{
                console.log("Datos encontrados:", res);
                result(null, res);
            }
    })
}

module.exports  = Alumno;
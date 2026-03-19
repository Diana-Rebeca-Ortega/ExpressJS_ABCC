'use strict';

const conexion =require('../config/database');
let Alumno = function(alumno){
   this.Num_Control = alumno.Num_Control; 
    this.Nombre = alumno.Nombre;
    this.Primer_Ap = alumno.Primer_Ap;
    this.Segundo_Ap = alumno.Segundo_Ap;
    this.Fecha_Nac = alumno.Fecha_Nac;
    this.Semestre = alumno.Semestre;
    this.Carrera = alumno.Carrera;
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
    conexion.query("DELETE FROM alumnos WHERE Num_Control= ?", [nc], function(err, res){
     if(err){
                console.log("Error: ", err);
                result(err, null);
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
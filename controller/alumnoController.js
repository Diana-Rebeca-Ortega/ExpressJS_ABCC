'use strict';

const Alumno = require('../models/alumno');

//----- Crear nuevo alumno -----
exports.create = function(req, res){
    const a = {
        NumControl : req.body.NumControl,
        Nombre     : req.body.Nombre,
        PrimerAp   : req.body.PrimerAp,
        SegundoAp  : req.body.SegundoAp,
        FechaNac   : req.body.FechaNac,
        Semestre   : req.body.Semestre,
        Carrera    : req.body.Carrera  
    }

    if(req.body.constructor === Object && Object.keys(req.body).length === 0 ){
        res.status(400).send({error: true, message: 'Falta informacion'});
    } else {
        const alumno = new Alumno(a);

        Alumno.create(alumno, function(err, result){
            if(err) {
                console.log("Error al insertar:", err);
                res.send(err);
            } else {
                console.log("Guardando alumno exitosamente");
                req.flash('message', '¡Alumno AGREGADO con EXITO!');
                res.redirect('/');
            }
        });
    }
};

//----- Eliminar un alumno -----
exports.delete = function(req, res){
    Alumno.delete(req.params.id, function(err){
        if(err) res.send(err);
        req.flash('message', '¡Alumno ELIMINADO con EXITO!');
        res.redirect('/');
    });
};
//editar 
exports.update = function(req, res) {
    const a = {
        NumControl : req.body.NumControl,
        Nombre     : req.body.Nombre,
        PrimerAp   : req.body.PrimerAp,
        SegundoAp  : req.body.SegundoAp,
        FechaNac   : req.body.FechaNac,
        Semestre   : req.body.Semestre,
        Carrera    : req.body.Carrera  
    };

    Alumno.update(req.params.id, new Alumno(a), function(err, result) {      
        if(err) {
            return res.status(500).send(err);
        }
        
        res.json({ 
            success: true, 
            message: '¡Alumno ACTUALIZADO Correctamente!' 
        });
    });
};

//----- Mostrar TODOS los alumnos (API) -----
exports.findAll = function(req, res){
    Alumno.findAll(function(err, alumnos){
        if(err) res.send(err);
        res.status(200).send(alumnos);
    });
};

//----- Buscar un Alumno por ID -----
exports.findById = function(req, res){
    Alumno.findById(req.params.id, function(err, alumno){
        if(err) res.send(err);
        res.json(alumno);
    });
};
const Alumno = require ('../models/alumno');
exports.create = function(req,res){
    //Validacion 
    //ALTA DE UN NUEVO ALUMNO
    const a = {
        NumControl : req.body.num_control, 
         Nombre : req.body.nombre, 
          PrimerAp : req.body.primer_ap, 
           SegundoAp : req.body.segundo_ap, 
            FechaNac : req.body.fecha_nac, 
             Semestre : req.body.semestre, 
              Carrera : req.body.carrera, 
}
const alumno = new Alumno(a);
Alumno.create(alumno, function(){
    console.log("Insercion alumno", req.body);
    if(err)
        res.send(err);
    req.flash('message', "Alumno AGREGADO con EXito!!");
    res.redirect('/');
})
}
 //BAJA DE UN NUEVO ALUMNO
exports.delete = function(req, res){
Alumno.delete(req.params.ed, function(err){

    if(err)
        res.send(err);

        req.flash('message', 'Alumno eliminado con EXICO')
        res.redirect('/');
    });
};
//Modificacion de un Alumno =========================
exports.update = function(req, resp){
    Alumno.findById(req.params.id, function (err, alumno){
       const a = {
        NumControl : req.body.num_control, 
         Nombre : req.body.nombre, 
          PrimerAp : req.body.primer_ap, 
           SegundoAp : req.body.segundo_ap, 
            FechaNac : req.body.fecha_nac, 
             Semestre : req.body.semestre, 
              Carrera : req.body.carrera, 
}
Alumno.update(req.params.id, new Alumno (a), function(err, alumno){
        req.flash('message', 'Alumno modificado con EXICO')
        res.redirect('/');
        });
    });
};

//Consultar todos los alumnos
exports.findAll = function(req, res){
    Alumno.findAll(function(err, alumno){
        if(err)
            res.send(err);

        res.status(200).send(alumnos);
    });
};

//Consultar por ID (numero de control)
exports.findById = function(){
    Alumno.findById(req.params.id, function(err, alumno){
        if(err)
            res.send(err);

        res.json(alumno);
    });
};

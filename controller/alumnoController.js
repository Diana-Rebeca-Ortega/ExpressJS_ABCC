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

 //BAJA DE UN NUEVO ALUMNO
}
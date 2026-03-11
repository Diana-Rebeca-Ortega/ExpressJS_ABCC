const express = require('express');
const router = express.Router();

const alumno_controller = require('../controller/alumnoController');

//ALTAS
router.post('/', alumno_controller.findAll);

//BAJAS
router.post('/eliminar/:id', alumno_controller.delete);

//CAMBIOS 
router.post('/:id', alumno_controller.update);

//CONSULTAS todos los alumnos
router.get('/', alumno_controller.findAll)

router.get('/:id', alumno_controller.findById);

module.exports = router;//para acceder al router desde fuera


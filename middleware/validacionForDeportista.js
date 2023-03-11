const path = require('path');
const { body } = require('express-validator');

module.exports = [
body('nombre')
	.notEmpty().withMessage('escribir nombre'),
body('email')
    .notEmpty().withMessage('escribir un correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
body('telefono')
	.notEmpty().withMessage("completa este campo").bail()
    .isNumeric().withMessage('debes escribir un numero de contacto'),
body('estatura')
    .notEmpty() .withMessage('debes escribir tu estatura').bail()
    .isNumeric().withMessage('escribir tu estatura en numeros'),	
	
body('peso')
    .notEmpty() .withMessage('debes escribir tu peso en kilos').bail()
    .isNumeric().withMessage('escribir tu peso en kilos'),

body('indice_masa_corporal')
    .notEmpty() .withMessage('debes escribir indice de masa corporal').bail()
    .isNumeric().withMessage('escribir tu IMC'),	

body('salto_vertical')
    .notEmpty() .withMessage('debes escribir tu saltabilidad').bail()
    .isNumeric().withMessage('escribir tu saltabilidad en metros'),



body('salto_horizontal')
    .notEmpty() .withMessage('debes escribir tu saltabilidad').bail()
    .isNumeric().withMessage('escribir tu saltabilidad en metros'),

body('envergadura')
    .notEmpty() .withMessage('debes escribir tu envergadura').bail()
    .isNumeric().withMessage('escribir tu envergadura en metros'),	

body('velocidad')
    .notEmpty() .withMessage('debes escribir tu velocidad').bail()
    .isNumeric().withMessage('escribir tu velocidad en metros'),


body('fecha_nacimiento')
	.notEmpty().withMessage('este campo no debe estar vacio').bail()	
    .isDate().withMessage('elige fecha de nacimiento'),	
    
 body('edad')
	.notEmpty().withMessage('debes escribir tu edad').bail()
    .isNumeric().withMessage('debes escribir tu edad en numeros'),
body('perfil')
	.notEmpty().withMessage('selecciona una opcion').bail()
    .isString().withMessage('debes elegir tu prfil dominante'),

// body('categoria_id')
// 	.notEmpty().withMessage('selecciona una opcion').bail()
//     .isString().withMessage('debes elegir tu categoria'),
    
// body('posicion_id')
// 	.notEmpty().withMessage('este campo no debe estar vacio').bail()
//     .isString().withMessage('debes elegir una posicion'),
 
body('video_url')
	.notEmpty().withMessage('selecciona un video').bail()
    .isString().withMessage('debes subir un video'),   
body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error(' subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]
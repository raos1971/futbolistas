const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('nombre')
	.notEmpty().withMessage('escribir nombre'),
	body('pais')
	.notEmpty().withMessage('debes escribir un pais'),
	body('ciudad')
	.notEmpty().withMessage('escribir una ciudad'),
	body('email')
		.notEmpty().withMessage('escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password')
	.notEmpty().withMessage('Tienes que escribir una contraseña'),
	
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
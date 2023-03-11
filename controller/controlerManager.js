const { userInfo } = require("os");
const path = require("path");
const fs = require("fs");
const { info } = require("console");
const {  validationResult } = require('express-validator');
 //const User = require('../model/User');
 const bcryptjs = require('bcryptjs');
//const productsFilePath = path.join(__dirname, "../data/manager.json");
//const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const db= require("../src/database/models");
const usuario = db.Manager;


const userController = {

  
	createUsuario: (req,res) => {

    let resultValidation = validationResult(req);
    //    //validacion de losdatos en el formulario 
      
        if (resultValidation.errors.length > 0) {
          return res.render('registroManager', {
            errors: resultValidation.mapped(),//me entrega los errores en un objeto literal
            old: req.body //guarda loscampos que estan diligenciados
          });
        }
        //verificacion del campo email
        //let verificarEmail = usuario.findByField('email', req.body.email);
    
        // if (verificarEmail) {
        //   return res.render('registroManager', {
        //     errors: {
        //       email: {
        //         msg: 'Este email ya está registrado'
        //       }
        //     },
        //     old: req.body
        //   });
        // }

	usuario
    .create(
        {
            nombre: req.body.nombre,
            email: req.body.email,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            avatar: req.file.filename,
            password: bcryptjs.hashSync(req.body.password, 10)
            /* password: bcryptjs.hash(req.body.password, 10), */
            
       }

    )
    .then(()=> {
     
        return res.redirect('loginManager')})            
    .catch(error => res.send(error))
},
  
  //crear login por get
  managerVista: (req, res) => {
    res.render("registroManager");
  },
   
  // crearRegistroManager: (req, res) => {
   
//     let resultValidation = validationResult(req);
//    //validacion de losdatos en el formulario 
  
//     if (resultValidation.errors.length > 0) {
// 			return res.render('registroManager', {
// 				errors: resultValidation.mapped(),//me entrega los errores en un objeto literal
// 				old: req.body //guarda loscampos que estan diligenciados
// 			});
// 		}
//     //verificacion del campo email
//     let verificarEmail = User.findByField('email', req.body.email);

// 		if (verificarEmail) {
// 			return res.render('registroManager', {
// 				errors: {
// 					email: {
// 						msg: 'Este email ya está registrado'
// 					}
// 				},
// 				old: req.body
// 			});
// 		}
       //esta variable guarda lo que viene por el req body
    //   let userToCreate = {
    //     ...req.body,
    //     password: bcryptjs.hashSync(req.body.password, 10),
    //     file: req.file
    //   }
    //   //utilizo el metodo User en su metodo create y le paso como parametro la variable userToCreate 
    //  User.create(userToCreate);
        
    // return res.render('loginManager');
    
  //},
  

   login: (req, res) => {
    res.render("loginManager");
  }, 
  processLogin: (req, res) => {

	let buscarUsuario = User.findByField('email', req.body.email);

	if(buscarUsuario) {
		// si esta logeado comparo la contraseña variable devuelve un booleano
		let compararPassword = bcryptjs.compareSync(req.body.password, buscarUsuario.password);//
		//si existe
		if (compararPassword) {

        req.session.userLogged = buscarUsuario;

		console.log(req.session.userLogged);
			return res.redirect("verDeportista");//index
		}
		//de lo contrario
		return res.render('loginManager', {
			errors: {
				email: {
					msg: 'password incorrecto'
				}
			}
		});
		
	}//cierre del if userToLogged si existe en la base de datos y return de si no existe
	return res.render('loginManager', {
					errors: {
						email: {
							msg: 'no estas registrado'
						}
					}
				});
	// 
  },
   
  
    
}
module.exports = userController;
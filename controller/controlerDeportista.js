const { userInfo } = require("os");
const path = require("path");
const fs = require("fs");
const { info } = require("console");
const { validationResult } = require("express-validator");

const bcryptjs = require("bcryptjs");

const db = require("../src/database/models");//trae todos los modelos
const deportista = db.Deportista;//traigo el modelo
const categoria = db.Categoria;
const posicion = db.Posicion;
const Op = db.Sequelize.Op;//operadores poder trabajar con LIKE, WHERE,


const productController = {
  deportistadb: (req, res) => {
    deportista
      .findAll({
        include: ["posicion", "categoria"],
      })
      .then((respuesta) => {
        return res.render("deportistadb.ejs", { respuesta });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  formulario: (req, res) => {
   
    res.render("formularioDeportista");
   
  },

  createDeportista: (req, res) => {
    let validacionDeportista = validationResult(req);

    if (validacionDeportista.errors.length > 0) {

      return res.render("formularioDeportista", {
        errors: validacionDeportista.mapped(), //me entrega los errores en un objeto literal
        old: req.body, //guarda loscampos que estan diligenciados
      });
    }

    deportista
      .create({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        estatura: req.body.estatura,
        peso:req.body.peso,
        indice_masa_corporal:req.body.indice_masa_corporal,
        salto_vertical:req.body.salto_vertical,
        salto_horizontal:req.body.salto_horizontal,
        envergadura:req.body.envergadura,
        velocidad:req.body.velocidad,
        fecha_nacimiento: req.body.fecha_nacimiento,
        edad: req.body.edad,
        perfil: req.body.perfil,
        video_url: req.body.video_url,
        avatar: req.file.filename,
        posicion_id: req.body.posicion,
        categoria_id: req.body.categoria,
      })
      .then(() => {
        return res.redirect("deportistaCrud");
      })
      .catch((error) => res.send(error));

  },

  deportistas: (req, res) => {
    deportista
      .findAll({
        include: ["posicion", "categoria"],
      })
      .then((respuesta) => {
        return res.render("verDeportista.ejs", { respuesta });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  manager: (req, res) => {

    deportista
      .findAll({
        include: ["posicion", "categoria"],
      })
      .then((respuesta) => {
        return res.render("deportistaCrud.ejs", { respuesta });
      })
      .catch((error) => {
        res.send(error);
      });

    // res.render("deportistaCrud",{products});
  },
  edit: (req, res) => {
    let deportistaId = req.params.id;
    let deportistaPk = deportista.findByPk(deportistaId, {
      include: ["categoria", "posicion"],
    });
    let categoriaAll = categoria.findAll();
    let posicionAll = posicion.findAll();

    Promise.all([deportistaPk, categoriaAll, posicionAll])
      .then(([deportistaEdit, allcategorias, allposicion]) => {
        console.log(deportistaEdit);
        return res.render("editar", {
          deportistaEdit,
          allcategorias,
          allposicion,
        });
      })
      .catch((error) => res.send(error));

    
  },
  update: (req, res) => {
    deportista
      .update(
        {
          nombre: req.body.nombre,
          email: req.body.email,
          telefono: req.body.telefono,
          estatura: req.body.estatura,
          peso:req.body.peso,
          indice_masa_corporal:req.body.indice_masa_corporal,
          salto_vertical:req.body.salto_vertical,
          salto_horizontal:req.body.salto_horizontal,
          envergadura:req.body.envergadura,
          velocidad:req.body.velocidad,
          fecha_nacimiento: req.body.fecha_nacimiento,
          edad: req.body.edad,
          perfil: req.body.perfil,
          video_url: req.body.video,
          avatar: req.file,
          posicion_id: req.body.posicion,
          categoria_id: req.body.categoria,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then(() => res.redirect("/deportistaCrud"))
      .catch((error) => res.send(error));
  },

  

  show: (req, res) => {
    deportista
      .findByPk(req.params.id, {
        include: ["posicion","categoria" ]
      })
      .then((description) => {
        res.render("detallesDeportistas", { description: description });
      })
      .catch((error) => res.send(error));
  },

  destroy: (req, res) => {
    deportista
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.redirect("/deportistaCrud"))
      .catch((error) => res.send(error));

    
  },
  
  search: ( req, res) =>{

    let busqueda = req.query.busqueda
    console.log(busqueda);

     deportista.findAll({
      include : ['posicion',"categoria"],
        where:{
          posicion_id:{[Op.like]: `%${busqueda}%`},
            
        }
      })

    .then(respuesta => { 
      console.log(respuesta);
       res.render('buscar.ejs',{respuesta});  
    })

    .catch(error => res.send(error))
 }

}
  


module.exports = productController;

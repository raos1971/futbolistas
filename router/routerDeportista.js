var express = require("express");
var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");//modulo nativo para las rutas
const fs = require("fs");

const validarDeportista=require("../middleware/validacionForDeportista");
const uploadFile=require("../middleware/multerDeportista")


const productController = require('../controller/controlerDeportista');

router.get('/formularioDeportista', productController.formulario);
router.get('/buscar', productController.search);
router.post('/formularioDeportista',uploadFile.single('avatar'),validarDeportista,productController.createDeportista);

router.get('/deportistaCrud', productController.manager);
router.get("/deportistas/:id",productController.show);
router.get('/verDeportista', productController.deportistas);
router.get('/deportistadb', productController.deportistadb);
router.get("/editar/:id",productController.edit);
router.put("/editar/:id",productController.update)
router.get('/delete/:id', productController.destroy);//rutas parametrizadas

module.exports = router;
var express = require('express');
var router = express.Router();
// const{ body,check }=require("express-validator");
const path = require('path');
const fs=require("fs");
const multer=require("multer");

const validaraManager=require("../middleware/validacionForManager")
const uploadFile=require("../middleware/multer")
const validacionLogin=require("../middleware/validacionLogin")

const managerController = require('../controller/controlerManager');




router.get('/registroManager', managerController.managerVista);
router.post('/registroManager',uploadFile.single('avatar'),validaraManager, managerController.createUsuario);
router.get('/loginManager',managerController.login );
router.post('/loginManager',validacionLogin,managerController.processLogin);

// router.get('/usuarioPerfil', managerController.profile);

module.exports = router;
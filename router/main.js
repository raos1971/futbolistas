
var express = require('express');
var router = express.Router();
const multer= require("multer");
const path = require('path');
const fs=require("fs")

const mainController = require('../controller/controler');
router.get('/', mainController.home);
// router.get('/carrito', mainController.carrito);

router.get('/nosotros', mainController.nosotros);
router.get('/producto', mainController.producto);
router.get("/home", mainController.index)
//
module.exports = router;
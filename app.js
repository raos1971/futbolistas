const express = require("express");//instala un servidor
const methodOverride = require('method-override');
const app =express();//este seria el servidor llamado app
const path=require("path")
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(session({
	secret: "roque",
	resave: false,
	saveUninitialized: false,
}));



app.set("view engine","ejs");


app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));//enviar datos por post {extended:false}convierte datos a json envi
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));//midleware permite enviar los datos por put,delet,post
app.listen(3001, (req, res)=>{
    console.log("Servidor funcionando en http://localhost:3001")
})



const mainRutas = require('./router/main');
const productRutas= require('./router/routerDeportista');
const userRutas= require('./router/routerManager');


//app.use('/', validator);
app.use('/', mainRutas);
app.use('/', productRutas);
app.use('/', userRutas);


const express = require('express');
//utilizamos para conectar con un directiva externa
const path = require('path');

//configuramos para obtener un port dinamico
require('dotenv').config();
//cargamso los valos de express a la variables app
const app = express();


//creamos un servidor node para nuestro socket
//ponemos el parametro "app" para que tome la configuracio del express
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
//emitimos y recibimos mensajes de sockets
require('./sockets/socket');




//utilizamos nuestra capeta public o el html
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//escuchamos al servidor que esta corriendo
//env nos sirve para que tome el puerto automaticament "process.env.PORT"
server.listen ( process.env.PORT, (err)=>{
  if(err) throw new Error(err);
  console.log('El servidor corriendo en el puerto',process.env.PORT);
});
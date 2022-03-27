const {io}=require('../server');
const Band = require('../models/band');
const Bands =  require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Marc Segui'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Linkin Park'));
bands.addBand(new Band('Redhot chillipeppers'));
bands.addBand(new Band('LP'));

// console.log(bands);

//emitimos y recibimos mensajes de sockets
io.on('connection', client => {
  console.log('cliente conectado...');

  //*obtenemos  las bandas desde nuestro instancia de bands
  client.emit('active-bands',bands.getBands());

  client.on('disconnect', () => {
    console.log('cliente desconectado!!!');
  });

  //!emitirmos el mensaje desde node y recibimos en nuestro html
  // client.on('mensaje',(payload) => {
  //   console.log('Mensaje',payload);

  //   io.emit('mensaje', {admin:'nuevo mensaje'});
  // });

  //* recibo desde flutter y envio a los demas 
  client.on('emitir-mensaje',(payload)=>{
    console.log(payload);
    // io.emit('nuevo-mensaje', 'Heyyy!!!');
    client.broadcast.emit('nuevo-mensaje',payload);
  });

  //*recibo el orden desd emi flutter y envio a mi web
  client.on('vote-band',(payload)=>{
    console.log(payload);
    bands.voteBand(payload.id);
    io.emit('active-bands',bands.getBands());
  });

  client.on('add-band',(payload)=>{
    const newBand = new Band(payload.name);
    console.log(newBand);
    bands.addBand(new Band(payload.name));
    io.emit('active-bands',bands.getBands());
  });

  client.on('delete-band',(payload)=>{
    bands.deleteBand(payload.id);
    io.emit('active-bands', bands.getBands());
  });
});

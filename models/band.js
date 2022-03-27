const {v4:uuidV4} = require('uuid');

class Band{

  constructor (name = 'no-name'){
    this.id = uuidV4(); // generador de  intentificador unico
    this.name = name;
    this.votos = 0;
  }
}

module.exports = Band;
const Band = require('./band');
class Bands{
  constructor(){
    this.bands = [];
  }

  //creamos el metodo de add
  addBand(band = new Band()){
    this.bands.push(band);
  }

  //metodo para obtener nuestras bandas
  getBands(){
    return this.bands;
  }
  
  //eliminar banda
  deleteBand(id=''){
    this.bands = this.bands.filter(band=>band.id !== id);
    return this.bands
  }

  //realizamos la funciona votacion
  voteBand(id=''){
    this.bands = this.bands.map(band => {
      if (band.id === id) {
        band.votos ++;
        return band;
      } else {
        return band;
      }
    });
  }
}

module.exports = Bands;
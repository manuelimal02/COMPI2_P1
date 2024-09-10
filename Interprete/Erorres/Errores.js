export class Errores {
    constructor() {
      this.ListaErrores = [];
    }
    AgregarError(error) {
      this.ListaErrores.push(error);
    }

    ObtenerErrores() {
      return this.ListaErrores;
    }
    LimpiarErrores() {
      this.ListaErrores = [];
    }
  }
  
  export const errorManager = new Errores();
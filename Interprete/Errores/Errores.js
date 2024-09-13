class ErrorManager {
    constructor() {
        this.errors = [];
    }

    NuevoError(DescripcionError, Linea, Columna) {
        const error = {
            descripcion: DescripcionError,
            linea: Linea,
            columna: Columna,
        };
        this.errors.push(error);
    }

    ObtenerErrors() {
        return this.errors;
    }

    LimpiarErrors() {
        this.errors = [];
    }
}

export default new ErrorManager();
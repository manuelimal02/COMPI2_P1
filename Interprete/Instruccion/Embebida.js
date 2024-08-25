import { Invocable } from "./Invocable.js";

class FuncionNativa extends Invocable {
    constructor(aridad, func) {
        super();
        this._aridad = aridad;
        this._func = func;
    }

    aridad() {
        return this._aridad;
    }

    invocar(interprete, args) {
        return this._func(...args);
    }
}

export const Embebidas = {
    parseInt: new FuncionNativa(1, (arg) => {
        if (arg.tipo !== "string") {
            throw new Error(`El Argumento De parseInt Debe Ser De Tipo String, Pero Se Recibió Un "${arg.tipo}".`);
        }
        const valor = parseInt(arg.valor);
        if (isNaN(valor)) {
            throw new Error(`El Valor "${arg.valor}" No Puede Convertirse A Un Número Entero.`);
        }
        return { valor: valor, tipo: "int" };
    }),
    parsefloat: new FuncionNativa(1, (arg) => {
        if (arg.tipo !== "string") {
            throw new Error(`El Argumento De parseFloat Debe Ser De Tipo String, Pero Se Recibió Un "${arg.tipo}".`);
        }
        const valor = parseFloat(arg.valor);
        if (isNaN(valor)) {
            throw new Error(`El Valor "${arg.valor}" No Puede Convertirse A Un Número Decimal.`);
        }
        return { valor: valor, tipo: "float" };
    }),
    toLowerCase: new FuncionNativa(1, (arg) => {
        if (arg.tipo !== "string") {
            throw new Error(`El Argumento De toLowerCase Debe Ser De Tipo String, Pero Se Recibió Un "${arg.tipo}".`);
        }
        return { valor: arg.valor.toLowerCase(), tipo: "string" };
    }),
    toUpperCase: new FuncionNativa(1, (arg) => {
        if (arg.tipo !== "string") {
            throw new Error(`El Argumento De toLowerCase Debe Ser De Tipo String, Pero Se Recibió Un "${arg.tipo}".`);
        }
        return { valor: arg.valor.toUpperCase(), tipo: "string" };
    }),
    
};



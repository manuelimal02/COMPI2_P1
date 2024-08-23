export class AritmeticaHandler {
    /**
     * @param {string} operador
     * @param {any} izquierda
     * @param {any} derecha
     */

    constructor(operador, izquierda, derecha) {
        this.operador = operador;
        this.izquierda = izquierda;
        this.derecha = derecha;
    }

    EjecutarHandler() {
        switch (this.operador) {
            case '+':
                return this.validarSuma();
            case '-':
                return this.validarResta();
            case '*':
                return this.validarMultiplicacion();
            case '/':
                return this.validarDivision();
            case '%':
                return this.validarModulo();
            default:
                throw new Error(`Operador No Reconocido: ${this.operador}`);
        }
    }

    validarSuma() {
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(this.izquierda + this.derecha);  // int + int = int
            } else {
                return parseFloat(this.izquierda + this.derecha);  // float + float = float, int + float = float
            }
        } else if (typeof this.izquierda === 'string' && typeof this.derecha === 'string') {
            return this.izquierda + this.derecha;  // string + string = string
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }

    validarResta() {
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(this.izquierda - this.derecha);  // int - int = int
            } else {
                return parseFloat(this.izquierda - this.derecha);  // float - float = float, int - float = float
            }
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }

    validarMultiplicacion() {
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(this.izquierda * this.derecha);  // int * int = int
            } else {
                return parseFloat(this.izquierda * this.derecha);  // float * float = float, int * float = float
            }
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }

    validarDivision() {
        if (this.derecha === 0) {
            throw new Error("Advertencia: División por cero. Resultado será null.");
        }

        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(Math.floor(this.izquierda / this.derecha));  // int / int = int
            } else {
                return parseFloat(this.izquierda / this.derecha);  // float / float = float, int / float = float
            }
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }

    validarModulo() {
        if (this.derecha === 0) {
            throw new Error("Advertencia: Módulo por cero. Resultado será null.");
        }
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(this.izquierda % this.derecha);  // int % int = int
            } else {
                throw new Error(`Error: Módulo solo se permite entre enteros.`);
            }
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }
}

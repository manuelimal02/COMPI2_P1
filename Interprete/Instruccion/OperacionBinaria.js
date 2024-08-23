export class OperacionBinariaHandler {
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
            case '+=': 
                return this.validarSumaImplicita();
            case '-=': 
                return this.validarRestaImplicita();
            case '*':
                return this.validarMultiplicacion();
            case '/':
                return this.validarDivision();
            case '%':
                return this.validarModulo();
            case '==':
                return this.validarIgualdad();
            case '!=':  
                return this.validarDesigualdad();
            case '>':
                return this.validarMayorQue();
            case '>=':
                return this.validarMayorIgualQue();
            case '<':
                return this.validarMenorQue();
            case '<=':
                return this.validarMenorIgualQue();
            case '&&':
                return this.validarAnd();
            case '||':
                return this.validarOr();
            case '!':
                return this.validarNot();
            default:
                throw new Error(`Operador No Reconocido: ${this.operador}`);
        }
    }

    validarSumaImplicita() {
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(this.izquierda + this.derecha);
            } else if (!Number.isInteger(this.izquierda)) {
                return parseFloat(this.izquierda + this.derecha);
            } else if (Number.isInteger(this.izquierda) && !Number.isInteger(this.derecha)) {
                throw new Error(`Error: No se puede realizar la operación 'int += float'.`);
            }
        } else if (typeof this.izquierda === 'string' && typeof this.derecha === 'string') {
            return this.izquierda + this.derecha;
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }

    validarRestaImplicita() {
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(this.izquierda - this.derecha);
            } else if (!Number.isInteger(this.izquierda)) {
                return parseFloat(this.izquierda - this.derecha);
            } else if (Number.isInteger(this.izquierda) && !Number.isInteger(this.derecha)) {
                throw new Error(`Error: No se puede realizar la operación 'int -= float'. La variable 'var1' es de tipo int.`);
            }
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }

    validarSuma() {
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(this.izquierda + this.derecha); 
            } else {
                return parseFloat(this.izquierda + this.derecha); 
            }
        } else if (typeof this.izquierda === 'string' && typeof this.derecha === 'string') {
            return this.izquierda + this.derecha; 
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }

    validarResta() {
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(this.izquierda - this.derecha);
            } else {
                return parseFloat(this.izquierda - this.derecha);
            }
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }

    validarMultiplicacion() {
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            if (Number.isInteger(this.izquierda) && Number.isInteger(this.derecha)) {
                return parseInt(this.izquierda * this.derecha);
            } else {
                return parseFloat(this.izquierda * this.derecha);
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
                return parseInt(this.izquierda / this.derecha);
            } else {
                return this.izquierda / this.derecha;
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
                return parseInt(this.izquierda % this.derecha);
            } else {
                throw new Error(`Error: Módulo solo se permite entre enteros.`);
            }
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
    }

    validarIgualdad() {
        if (typeof this.izquierda !== typeof this.derecha) {
            throw new Error(`Error: No se puede comparar tipos diferentes ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            return this.izquierda === this.derecha;
        } else if (typeof this.izquierda === 'string' && typeof this.derecha === 'string') {
            return this.izquierda.localeCompare(this.derecha) === 0;
        } else {
            return this.izquierda === this.derecha;
        }
    }

    validarDesigualdad() {
        if (typeof this.izquierda !== typeof this.derecha) {
            throw new Error(`Error: No se puede comparar tipos diferentes ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
        if (typeof this.izquierda === 'number' && typeof this.derecha === 'number') {
            return this.izquierda !== this.derecha;
        } else if (typeof this.izquierda === 'string' && typeof this.derecha === 'string') {
            return this.izquierda.localeCompare(this.derecha) !== 0;
        } else {
            return this.izquierda !== this.derecha;
        }
    }

    validarMayorQue() {
        this.validarTiposParaComparacion();
        return this.izquierda > this.derecha;
    }

    validarMayorIgualQue() {
        this.validarTiposParaComparacion();
        return this.izquierda >= this.derecha;
    }

    validarMenorQue() {
        this.validarTiposParaComparacion();
        return this.izquierda < this.derecha;
    }

    validarMenorIgualQue() {
        this.validarTiposParaComparacion();
        return this.izquierda <= this.derecha;
    }

    validarTiposParaComparacion() {
        const tiposValidos = ['number', 'string'];
        if (!tiposValidos.includes(typeof this.izquierda) || !tiposValidos.includes(typeof this.derecha)) {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
        if (typeof this.izquierda !== typeof this.derecha) {
            throw new Error(`Error: No se puede comparar tipos diferentes ${typeof this.izquierda} y ${typeof this.derecha}`);
        }
        if (typeof this.izquierda === 'string' && this.izquierda.length !== 1 && this.derecha.length !== 1) {
            throw new Error(`Error: Comparación de caracteres solo permitida entre literales de un solo carácter.`);
        }
    }

    validarAnd() {
        if (typeof this.izquierda === 'boolean' && typeof this.derecha === 'boolean') {
            return this.izquierda && this.derecha;
        } else {
            throw new Error(`Error: Operación AND solo se permite entre valores booleanos.`);
        }
    }

    validarOr() {
        if (typeof this.izquierda === 'boolean' && typeof this.derecha === 'boolean') {
            return this.izquierda || this.derecha;
        } else {
            throw new Error(`Error: Operación OR solo se permite entre valores booleanos.`);
        }
    }

    validarNot() {
        if (typeof this.izquierda === 'boolean') {
            return !this.izquierda;
        } else {
            throw new Error(`Error: Operación NOT solo se permite sobre un valor booleano.`);
        }
    }
}

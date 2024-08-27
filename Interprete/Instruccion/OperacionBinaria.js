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
            default:
                throw new Error(`Operador No Reconocido: ${this.operador}`);
        }
    }

    validarSuma() {
        if (this.izquierda.tipo === 'int') {
            switch (this.derecha.tipo) {
                //int + int = int
                case 'int':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'int'};
                //int + float = float
                case 'float':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if(this.izquierda.tipo === 'float') {
            switch(this.derecha.tipo) {
                //float + int = float
                case 'int':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'float'};
                //float + float = float
                case 'float':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if(this.izquierda.tipo === 'string') {
            //string + string = string
            if(this.derecha.tipo === 'string') {
                return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'string'};
            } else {
                throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }  
    }

    validarResta() {
        if (this.izquierda.tipo === 'int') {
            switch (this.derecha.tipo) {
                //int - int = int
                case 'int':
                    return {valor: this.izquierda.valor - this.derecha.valor, tipo: 'int'};
                //int - float = float
                case 'float':
                    return {valor: this.izquierda.valor - this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if (this.izquierda.tipo === 'float') {
            switch (this.derecha.tipo) {
                //float - int = float
                case 'int':
                    return {valor: this.izquierda.valor - this.derecha.valor, tipo: 'float'};
                //float - float = float
                case 'float':
                    return {valor: this.izquierda.valor - this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
    }

    validarMultiplicacion() {
        if(this.izquierda.tipo === 'int') {
            switch(this.derecha.tipo) {
                //int * int = int
                case 'int':
                    return {valor: this.izquierda.valor * this.derecha.valor, tipo: 'int'};
                //int * float = float
                case 'float':
                    return {valor: this.izquierda.valor * this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if (this.izquierda.tipo === 'float') {
            switch (this.derecha.tipo) {
                //float * int = float
                case 'int':
                    return {valor: this.izquierda.valor * this.derecha.valor, tipo: 'float'};
                //float * float = float
                case 'float':
                    return {valor: this.izquierda.valor * this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
    }

    validarDivision() {
        if (this.derecha.valor === 0) {
            throw new Error("Advertencia: División por cero. Resultado será null.");
        }
        if (this.izquierda.tipo === 'int') {
            switch (this.derecha.tipo) {
                //int / int = int
                case 'int':
                    return {valor: parseInt(this.izquierda.valor / this.derecha.valor), tipo: 'int'};
                //int / float = float
                case 'float':
                    return {valor: this.izquierda.valor / this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if (this.izquierda.tipo === 'float') {
            switch (this.derecha.tipo) {
                //float / int = float
                case 'int':
                    return {valor: this.izquierda.valor / this.derecha.valor, tipo: 'float'};
                //float / float = float
                case 'float':
                    return {valor: this.izquierda.valor / this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
    }

    validarModulo() {
        if (this.derecha.valor === 0) {
            throw new Error("Advertencia: Módulo por cero. Resultado será null.");
        }
        if (this.izquierda.tipo === 'int' && this.derecha.tipo === 'int') {
            return {valor: this.izquierda.valor % this.derecha.valor, tipo: 'int'};
        }else{
            throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
        }
    }
    
    validarIgualdad() {
        if(this.izquierda.tipo === 'int') {
            switch(this.derecha.tipo) {
                case 'int':
                    return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
                case 'float':
                    return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if(this.izquierda.tipo === 'float') {
            switch(this.derecha.tipo) {
                case 'int':
                    return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
                case 'float':
                    return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if(this.izquierda.tipo === 'string') {
            if(this.derecha.tipo === 'string') {
                return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
            } else {
                throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if(this.izquierda.tipo === 'boolean') {
            if(this.derecha.tipo === 'boolean') {
                return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
            } else {
                throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if (this.izquierda.tipo === 'char') {
            if (this.derecha.tipo === 'char') {
                return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
            } else {
                throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
    }

    validarDesigualdad() {
        if(this.izquierda.tipo === 'int') {
            switch(this.derecha.tipo) {
                case 'int':
                    return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
                case 'float':
                    return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if (this.izquierda.tipo === 'float') {
            switch (this.derecha.tipo) {
                case 'int':
                    return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
                case 'float':
                    return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if (this.izquierda.tipo === 'string') {
            if (this.derecha.tipo === 'string') {
                return {valor: this.izquierda.valor !== this.derecha.valor , tipo: 'boolean'};
            } else {
                throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if (this.izquierda.tipo === 'boolean') {
            if (this.derecha.tipo === 'boolean') {
                return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
            } else {
                throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if (this.izquierda.tipo === 'char') {
            if (this.derecha.tipo === 'char') {
                return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
            } else {
                throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
    }

    validarMayorQue() {
        this.validarTiposParaComparacion();
        return {valor: this.izquierda.valor > this.derecha.valor, tipo: 'boolean'};
    }
    
    validarMayorIgualQue() {
        this.validarTiposParaComparacion();
        return {valor: this.izquierda.valor >= this.derecha.valor, tipo: 'boolean'};
    }
    
    validarMenorQue() {
        this.validarTiposParaComparacion();
        return {valor: this.izquierda.valor < this.derecha.valor, tipo: 'boolean'};
    }
    
    validarMenorIgualQue() {
        this.validarTiposParaComparacion();
        return {valor: this.izquierda.valor <= this.derecha.valor, tipo: 'boolean'};
    }
    
    validarTiposParaComparacion() {
        const tiposValidos = ['int', 'float', 'char'];
        if (!tiposValidos.includes(this.izquierda.tipo) || !tiposValidos.includes(this.derecha.tipo)) {
            throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
        }
        // Permitir comparaciones entre int y float, pero no otros tipos mezclados
        if (this.izquierda.tipo !== this.derecha.tipo) {
            const tiposPermitidos = (this.izquierda.tipo === 'int' && this.derecha.tipo === 'float') ||
                                    (this.izquierda.tipo === 'float' && this.derecha.tipo === 'int');
            if (!tiposPermitidos) {
                throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        // Comparación de caracteres
        if (this.izquierda.tipo === 'char' && this.derecha.tipo === 'char') {
            if (this.izquierda.valor.length !== 1 || this.derecha.valor.length !== 1) {
                throw new Error(`Error: Comparación De Caracteres Solo Permitida Entre Literales De Un Solo Carácter.`);
            }
            // Convertir a valores ASCII para comparación
            this.izquierda.valor = this.izquierda.valor.charCodeAt(0);
            this.derecha.valor = this.derecha.valor.charCodeAt(0);
        }
    }
    

    validarAnd() {
        if (this.izquierda.tipo === 'boolean' && this.derecha.tipo === 'boolean') {
            return {valor: this.izquierda.valor && this.derecha.valor, tipo: 'boolean'};
        } else {    
            throw new Error(`Error: Operación AND Solo Se Permite Entre Valores Booleanos.`);
        }
    }

    validarOr() {
        if(this.izquierda.tipo === 'boolean' && this.derecha.tipo === 'boolean') {
            return {valor: this.izquierda.valor || this.derecha.valor, tipo: 'boolean'};
        } else {    
            throw new Error(`Error: Operación OR Solo Se Permite Entre Valores Booleanos.`);
        }
    }

    validarSumaImplicita() {
        if (this.izquierda.tipo === 'int') {
            switch (this.derecha.tipo) {
                //int += int = int
                case 'int':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'int'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if(this.izquierda.tipo === 'float') {
            switch(this.derecha.tipo) {
                //float += int = float
                case 'int':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'float'};
                //float += float = float
                case 'float':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if(this.izquierda.tipo === 'string') {
            //string += string = string
            if(this.derecha.tipo === 'string') {
                return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'string'};
            } else {
                throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
    }

    validarRestaImplicita() {
        if (this.izquierda.tipo === 'int') {
            switch (this.derecha.tipo) {
                //int -= int = int
                case 'int':
                    return {valor: this.izquierda.valor - this.derecha.valor, tipo: 'int'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
        if (this.izquierda.tipo === 'float') {
            switch (this.derecha.tipo) {
                //float -= int = float
                case 'int':
                    return {valor: this.izquierda.valor - this.derecha.valor, tipo: 'float'};
                //float -= float = float
                case 'float':
                    return {valor: this.izquierda.valor - this.derecha.valor, tipo: 'float'};
                default:
                    throw new Error(`Error: Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            }
        }
    }
}

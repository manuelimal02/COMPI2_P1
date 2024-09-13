import ErrorManager from "../Errores/Errores.js";
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
                case 'int':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'int'};
                case 'float':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'float'};
                default:
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if(this.izquierda.tipo === 'float') {
            switch(this.derecha.tipo) {
                case 'int':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'float'};
                case 'float':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'float'};
                default:
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if(this.izquierda.tipo === 'string') {
            //string + string = string
            if(this.derecha.tipo === 'string') {
                return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'string'};
            } else {
                console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
    }

    validarDivision() {
        if (this.derecha.valor === 0) {
            console.warn(`Advertencia: División Por Cero. El Resultado Será null." ${this.izquierda.valor}" Y "${this.derecha.valor}".`);
            ErrorManager.NuevoError(`Advertencia: División Por Cero. El Resultado Será null.`,0,0);   
            return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0); 
                    return {valor: null};
            }
        }
    }

    validarModulo() {
        if (this.derecha.valor === 0) {
            console.warn(`Advertencia: Módulo Por Cero. El Resultado Será null." ${this.izquierda.valor}" Y "${this.derecha.valor}".`);
            ErrorManager.NuevoError(`Advertencia: Módulo Por Cero. El Resultado Será null.`,0,0);   
            return {valor: null};
        }
        if (this.izquierda.tipo === 'int' && this.derecha.tipo === 'int') {
            return {valor: this.izquierda.valor % this.derecha.valor, tipo: 'int'};
        }else{
            console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
            return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if(this.izquierda.tipo === 'float') {
            switch(this.derecha.tipo) {
                case 'int':
                    return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
                case 'float':
                    return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
                default:
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if(this.izquierda.tipo === 'string') {
            if(this.derecha.tipo === 'string') {
                return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
            } else {
                console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if(this.izquierda.tipo === 'boolean') {
            if(this.derecha.tipo === 'boolean') {
                return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
            } else {
                console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if (this.izquierda.tipo === 'char') {
            if (this.derecha.tipo === 'char') {
                return {valor: this.izquierda.valor === this.derecha.valor, tipo: 'boolean'};
            } else {
                console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                return {valor: null};
            }
        }
        console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
    }

    validarDesigualdad() {
        if(this.izquierda.tipo === 'int') {
            switch(this.derecha.tipo) {
                case 'int':
                    return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
                case 'float':
                    return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
                default:
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if (this.izquierda.tipo === 'float') {
            switch (this.derecha.tipo) {
                case 'int':
                    return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
                case 'float':
                    return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
                default:
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if (this.izquierda.tipo === 'string') {
            if (this.derecha.tipo === 'string') {
                return {valor: this.izquierda.valor !== this.derecha.valor , tipo: 'boolean'};
            } else {
                console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if (this.izquierda.tipo === 'boolean') {
            if (this.derecha.tipo === 'boolean') {
                return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
            } else {
                console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if (this.izquierda.tipo === 'char') {
            if (this.derecha.tipo === 'char') {
                return {valor: this.izquierda.valor !== this.derecha.valor, tipo: 'boolean'};
            } else {
                console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
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
            console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
            ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
            return {valor: null};
        }
        // Permitir comparaciones entre int y float, pero no otros tipos mezclados
        if (this.izquierda.tipo !== this.derecha.tipo) {
            const tiposPermitidos = (this.izquierda.tipo === 'int' && this.derecha.tipo === 'float') ||
                                    (this.izquierda.tipo === 'float' && this.derecha.tipo === 'int');
            if (!tiposPermitidos) {
                console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                return {valor: null};
            }
        }
        // Comparación de caracteres
        if (this.izquierda.tipo === 'char' && this.derecha.tipo === 'char') {
            if (this.izquierda.valor.length !== 1 || this.derecha.valor.length !== 1) {
                console.warn(`Error: Solo Se Puede Comparar Un Caracter Con Otro Caracter. "${this.izquierda.valor}" Y "${this.derecha.valor}".`);
                ErrorManager.NuevoError(`Error: Solo Se Puede Comparar Un Caracter Con Otro Caracter.`,0,0);   
                return {valor: null};
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
            console.warn(`Error: Operación AND Solo Se Permite Entre Valores Booleanos." ${this.izquierda.valor}" Y "${this.derecha.valor}".`);
            ErrorManager.NuevoError(`Error: Operación AND Solo Se Permite Entre Valores Booleanos.`,0,0);   
            return {valor: null};    
        }
    }

    validarOr() {
        if(this.izquierda.tipo === 'boolean' && this.derecha.tipo === 'boolean') {
            return {valor: this.izquierda.valor || this.derecha.valor, tipo: 'boolean'};
        } else {  
            console.warn(`Error: Operación OR Solo Se Permite Entre Valores Booleanos." ${this.izquierda.valor}" Y "${this.derecha.valor}".`);
            ErrorManager.NuevoError(`Error: Operación OR Solo Se Permite Entre Valores Booleanos.`,0,0);
            return {valor: null};  
        }
    }

    validarSumaImplicita() {
        if (this.izquierda.tipo === 'int') {
            switch (this.derecha.tipo) {
                //int += int = int
                case 'int':
                    return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'int'};
                default:
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
        if(this.izquierda.tipo === 'string') {
            //string += string = string
            if(this.derecha.tipo === 'string') {
                return {valor: this.izquierda.valor + this.derecha.valor, tipo: 'string'};
            } else {
                console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
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
                    console.warn(` Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`);
                    ErrorManager.NuevoError(`Operación No Permitida Entre Tipos: "${this.izquierda.tipo}" Y "${this.derecha.tipo}".`,0,0);   
                    return {valor: null};
            }
        }
    }
}

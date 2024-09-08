export class Entorno {
    /**
     * @param {Entorno} padre
     */
    constructor(padre = undefined) {
        this.valores = {};
        this.structs = {};
        this.padre = padre;
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(tipo, nombre, valor) {
        if (this.valores[nombre]) {
            throw new Error(`La Variable: "${nombre}" Ya Está Definida.`);
        }
        this.valores[nombre] = { valor, tipo};
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const variable = this.valores[nombre];
        if (variable!=undefined) {
            return variable;
        }
        if (!variable && this.padre) {
            return this.padre.getVariable(nombre);
        }
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    assignVariable(nombre, valor) {
        const variable = this.valores[nombre]
        if (variable != undefined) {
            if (variable.tipo === "string" && valor.tipo !== "string") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "string". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            if (variable.tipo === "int" && valor.tipo !== "int") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "int". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            if (variable.tipo === "float" && valor.tipo === "int") {
                valor.valor = parseFloat(valor.valor);
                valor.tipo = 'float';
            }
            if (variable.tipo === "float" && valor.tipo !== "float") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "float". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            if (variable.tipo === "char" && valor.tipo !== "char") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "char". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            if (variable.tipo === "boolean" && valor.tipo !== "boolean") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "boolean". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            this.valores[nombre].valor = {valor: valor.valor, tipo: valor.tipo};
            this.valores[nombre].tipo = valor.tipo; 
            return;
        }
        if (!variable && this.padre) {
            this.padre.assignVariable(nombre, valor);
            return;
        }
        throw new Error(`La Variable "${nombre}" No Está Definida.`);
    }

    //Manejo De Temporales Para ForEach
    /**
     * @param {string} nombre
     */
    setTemporal(tipo, nombre, valor) {
        if(this.valores[nombre]) {
            throw new Error(`La Variable: "${nombre}" Ya Está Definida.`);
        }
        this.valores[nombre] = {valor, tipo}
    }

    //Manejo De Structs
    setStruct(nombre, atributos) {
        if(this.valores[nombre]) {
            throw new Error(`ID ${nombre} ya esta declarado.`)
        }
        if(this.structs[nombre]){
            throw new Error(`Estructura ${nombre} ya esta declarada.`)
        }
        this.structs[nombre] = {nombre, atributos}
    }

    /**
     * @param {string} nombre 
     */
    getStruct(nombre) {
        const actual = this.structs[nombre]
        if(actual != undefined) {
            return actual
        }
        if(!actual && this.padre) {
            return this.padre.getStruct(nombre)
        }
    }

    assignStruct(nombre, atributos, valor) {
        // Obtener la estructura principal
        let current = this.valores[nombre];
        
        // Verificar si la estructura principal existe
        if (!current) {
            throw new Error(`La estructura "${nombre}" no está definida.`);
        }
    
        // Inicializar el puntero al objeto actual y el tipo de estructura actual
        let parent = current.valor.valor;
        let currentType = current.tipo;
    
        // Navegar a través de los atributos intermedios
        for (let i = 0; i < atributos.length - 1; i++) {
            // Obtener la definición de la estructura actual
            const structDef = this.getStruct(currentType);
            if (!structDef) {
                throw new Error(`Definición de estructura no encontrada para "${currentType}".`);
            }
    
            // Verificar si el atributo actual existe en la definición de la estructura
            const atributo = structDef.atributos.find(attr => attr.id === atributos[i]);
            if (!atributo) {
                throw new Error(`El atributo "${atributos[i]}" no está definido en la estructura "${currentType}".`);
            }
    
            // Si el atributo intermedio no existe, inicializarlo
            if (!parent[atributos[i]]) {
                parent[atributos[i]] = { 
                    valor: {}, 
                    tipo: atributo.tipo 
                };
            }
    
            // Avanzar al siguiente nivel de la estructura
            parent = parent[atributos[i]].valor;
            // Actualizar el tipo de estructura actual
            currentType = atributo.tipo;
        }
    
        // Obtener el último atributo (el que vamos a asignar)
        const lastAttr = atributos[atributos.length - 1];
        // Obtener la definición de la estructura final
        const finalStructDef = this.getStruct(currentType);
        
        // Verificar si existe la definición de la estructura final
        if (!finalStructDef) {
            throw new Error(`Definición de estructura no encontrada para "${currentType}".`);
        }
    
        // Verificar si el atributo final existe en la definición de la estructura
        const finalAtributo = finalStructDef.atributos.find(attr => attr.id === lastAttr);
        if (!finalAtributo) {
            throw new Error(`El atributo "${lastAttr}" no está definido en la estructura "${currentType}".`);
        }
    
        // Validación de tipos
        // Comparar el tipo del valor a asignar con el tipo esperado del atributo
        if (finalAtributo.tipo === "string" && valor.tipo !== "string") {
            throw new Error(`El tipo del atributo "${lastAttr}" es "string". No coincide con el tipo del valor asignado.`);
        }
        if (finalAtributo.tipo === "int" && valor.tipo !== "int") {
            throw new Error(`El tipo del atributo "${lastAttr}" es "int". No coincide con el tipo del valor asignado.`);
        }
        // Caso especial: convertir int a float si es necesario
        if (finalAtributo.tipo === "float" && valor.tipo === "int") {
            valor.valor = parseFloat(valor.valor);
            valor.tipo = 'float';
        }
        if (finalAtributo.tipo === "float" && valor.tipo !== "float") {
            throw new Error(`El tipo del atributo "${lastAttr}" es "float". No coincide con el tipo del valor asignado.`);
        }
        if (finalAtributo.tipo === "char" && valor.tipo !== "char") {
            throw new Error(`El tipo del atributo "${lastAttr}" es "char". No coincide con el tipo del valor asignado.`);
        }
        if (finalAtributo.tipo === "boolean" && valor.tipo !== "boolean") {
            throw new Error(`El tipo del atributo "${lastAttr}" es "boolean". No coincide con el tipo del valor asignado.`);
        }
    
        // Asignación del valor
        // Si todas las validaciones pasan, asignar el nuevo valor al atributo
        parent[lastAttr] = valor;
    }
}

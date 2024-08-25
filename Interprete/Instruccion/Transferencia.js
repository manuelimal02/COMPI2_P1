export class BreakException extends Error {
    constructor() {
        super('Break');
    }
}

export class ContinueException extends Error {
    constructor() {
        super('Continue');
    }
}

export class ReturnException extends Error {
    /**
     * @param {any} valor
     */
    constructor(valor) {
        super('Return');
        this.valor = valor;
    }
}
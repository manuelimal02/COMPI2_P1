import { Entorno } from "../Entorno/Entorno.js";
export class SwitchHandler {
    /**
     * @param {any} condicion
     * @param {Array} cases
     * @param {any} defaultCase
     * @param {BaseVisitor} visitor
     */
    constructor(condicion, cases, defaultCase, visitor) {
        this.condicion = condicion;
        this.cases = cases;
        this.defaultCase = defaultCase;
        this.visitor = visitor;
    }

    EjecutarHandler() {
        let resto = false;
        for (const caso of this.cases) {
            if (caso.valor.accept(this.visitor).valor === this.condicion.accept(this.visitor).valor) {
                resto = true;
            }
            if (resto) {
                const entornoAnterior = this.visitor.entornoActual;
                this.visitor.entornoActual = new Entorno(entornoAnterior);
                for (const stmt of caso.bloquecase) {
                    stmt.accept(this.visitor);
                }
                this.visitor.entornoActual = entornoAnterior;
            }
        }
        if (this.defaultCase) {
            for (const stmt of this.defaultCase.sentencias) {
                stmt.accept(this.visitor);
            }
        }
    }
}
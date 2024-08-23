{
    const NuevoNodo = (TipoNodo, props) =>{
    const tipos = {
        'entero': Nodos.Entero,
        'decimal': Nodos.Decimal,
        'cadena': Nodos.Cadena,
        'caracter': Nodos.Caracter,	
        'booleano': Nodos.Booleano,
        'Agrupacion': Nodos.Agrupacion,
        'unaria': Nodos.OperacionUnaria,
        'DeclaracionVar': Nodos.DeclaracionVar,
        'ReferenciaVariable': Nodos.ReferenciaVariable,
        'OperacionBinaria': Nodos.OperacionBinaria,
        'OperacionUnaria': Nodos.OperacionUnaria,
        'Print': Nodos.Print,
        'sentencia': Nodos.ExpresionStmt,
        'asignacion': Nodos.Asignacion,
        'Bloque': Nodos.Bloque,
        'If': Nodos.If,
        'While': Nodos.While
    }
    const nodo = new tipos[TipoNodo](props)
    nodo.location = location()
    return nodo
    }
}

PROGRAMA = _ instrucciones:INSTRUCCIONES* _ 
            {return instrucciones}

INSTRUCCIONES = declaracion:DECLARACION _
            {return declaracion}
            / sentencia:SENTENCIA _
            {return sentencia}

DECLARACION = tipo:TIPO _ id:IDENTIFICADOR _ "=" _ expresion:EXPRESION _ ";" _
            {return NuevoNodo('DeclaracionVar', {tipo, id, expresion })}
            / tipo:TIPO _ id:IDENTIFICADOR _ ";" _
            {return NuevoNodo('DeclaracionVar', {tipo, id })}

SENTENCIA =  print_s:PRINT
            {return print_s}
            /bloque:BLOQUE
            {return bloque}
            /asignacion:ASIGNACION
            {return asignacion}

PRINT = "print(" _ expresion:EXPRESION _ ")" _ ";" _
            {return NuevoNodo('Print', { expresion })}

BLOQUE = "{" _ sentencias:INSTRUCCIONES* _ "}" 
            { return NuevoNodo('Bloque', { sentencias }) }

ASIGNACION = id:IDENTIFICADOR _ "=" _ asignacion:EXPRESION _ ";" _ 
{ return NuevoNodo('asignacion', { id, asignacion }) }

EXPRESION =  booleano:BOOLEANO
            {return booleano}
            / ternario:TERNARIO
            {return ternario}
            / agrupacion:AGRUPACION
            {return agrupacion}
            / referenciaVariable:REFERENCIAVARIABLE
            {return referenciaVariable}
            / caracter:CARACTER
            {return caracter}
            / cadena:CADENA
            {return cadena}


TERNARIO =  condicion:LOGICO _ "?" _ expTrue:LOGICO _ ":"_ expFalse:LOGICO _ 
            { return NuevoNodo('ternario', {condicion, expTrue, expFalse }) }
            / LOGICO

LOGICO = OR

OR = izquierda:AND expansion:(_ operador:("||") _ derecha:AND 
{return { tipo: operador, derecha }})* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
        const { tipo, derecha } = operacionActual
        return NuevoNodo('OperacionBinaria', { operador:tipo, izquierda: operacionAnterior, derecha })
        },
        izquierda
    )
}

AND = izquierda:IGUALDAD expansion:(_ operador:("&&") _ derecha:IGUALDAD 
{return { tipo: operador, derecha}})* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const { tipo, derecha } = operacionActual
            return NuevoNodo('OperacionBinaria', { operador:tipo, izquierda: operacionAnterior, derecha })
            },
            izquierda
        )
}

IGUALDAD = izquierda:RELACIONAL expansion:(_ operador:("=="/"!=") _ derecha:RELACIONAL 
{return { tipo: operador, derecha } })* { 
return expansion.reduce(
    (operacionAnterior, operacionActual) => {
        const { tipo, derecha } = operacionActual
        return NuevoNodo('OperacionBinaria', { operador:tipo, izquierda: operacionAnterior, derecha })
        },
        izquierda
    )
}

RELACIONAL = izquierda:ARITMETICA expansion:(_ operador:("<="/">="/"<"/">") _ derecha:ARITMETICA 
{ return { tipo: operador, derecha } })* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
        const { tipo, derecha } = operacionActual
        return NuevoNodo('OperacionBinaria', { operador:tipo, izquierda: operacionAnterior, derecha })
        },
        izquierda
    )
}

ARITMETICA = SUMA

SUMA = izquierda:MULTIPLICACION expansion:( _ operador:("+" / "-") _ derecha:MULTIPLICACION {return {tipo: operador, derecha}})* {
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const {tipo, derecha} = operacionActual
            return NuevoNodo('OperacionBinaria', {operador: tipo, izquierda: operacionAnterior, derecha})
        },
        izquierda
    )
}
MULTIPLICACION = izquierda:UNARIA expansion:( _ operador:("*" / "/" / "%") _ derecha:UNARIA {return {tipo: operador, derecha}})* {
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const {tipo, derecha} = operacionActual
            return NuevoNodo('OperacionBinaria', {operador: tipo, izquierda: operacionAnterior, derecha})
        },
        izquierda
    )
}
UNARIA = "-" _ datos:OTRAEXPRESION {return NuevoNodo('OperacionUnaria', {operador: '-', datos: datos})}
        / OTRAEXPRESION

OTRAEXPRESION = decimal:DECIMAL
            {return decimal}
            / entero:ENTERO
            {return entero}
            / booleano:BOOLEANO
            {return booleano}
            / caracter:CARACTER
            {return caracter}
            / cadena:CADENA
            {return cadena}
            / agrupacion:AGRUPACION
            {return agrupacion}
            / referenciaVariable:REFERENCIAVARIABLE

TIPO = "int" 
            {return text()}
            / "float" 
            {return text()}    
            / "string" 
            {return text()}
            / "bool" 
            {return text()}
            / "char" 
            {return text()}
            / "var"
            {return text()}

IDENTIFICADOR = [a-zA-Z_][a-zA-Z0-9_]* 
            { return text(); }

DECIMAL = [0-9]+ "." [0-9]+
            {return NuevoNodo('decimal', {valor: parseFloat(text())})}

ENTERO = [0-9]+
            {return NuevoNodo('entero', {valor: parseInt(text())})}

CADENA = "\"" contenido:[^"]* "\""
            {   
                var text = contenido.join('');
                text = text.replace(/\\n/g, "\n");
                text = text.replace(/\\\\/g, "\\");
                text = text.replace(/\\\"/g,"\"");
                text = text.replace(/\\r/g, "\r");
                text = text.replace(/\\t/g, "\t");
                text = text.replace(/\\\'/g, "'");
                return NuevoNodo('cadena', {valor: text});
            }

CARACTER = "'" caracter:[\x00-\x7F] "'" 
            { 
                return NuevoNodo('caracter', { valor: caracter });
            }

BOOLEANO = "true" 
            {return NuevoNodo('booleano', {valor: true})}
            / "false" 
            {return NuevoNodo('booleano', {valor: false})}

AGRUPACION = _ "(" _ expresion:EXPRESION _ ")"_ 
            {return NuevoNodo('Agrupacion', {expresion})}

REFERENCIAVARIABLE = id:IDENTIFICADOR 
            {return NuevoNodo('ReferenciaVariable', {id})}


_ = (ESPACIOBLANCO / COMENTARIO)*

ESPACIOBLANCO = [ \t\n\r]+

COMENTARIO = COMENTARIOL / COMENTARIOLN

COMENTARIOL = "//" (![\n\r].)*

COMENTARIOLN = "/*" (!"*/".)* "*/"
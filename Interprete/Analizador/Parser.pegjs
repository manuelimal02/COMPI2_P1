{
    const NuevoNodo = (TipoNodo, props) =>{
    const tipos = {
        'entero': Nodos.Entero,
        'decimal': Nodos.Decimal,
        'cadena': Nodos.Cadena,
        'caracter': Nodos.Caracter,	
        'booleano': Nodos.Booleano,
        'Agrupacion': Nodos.Agrupacion,
        'DeclaracionVar': Nodos.DeclaracionVar,
        'ReferenciaVariable': Nodos.ReferenciaVariable,
        'OperacionBinaria': Nodos.OperacionBinaria,
        'OperacionUnaria': Nodos.OperacionUnaria,
        'Print': Nodos.Print,
        'ternario': Nodos.Ternario,
        'asignacion': Nodos.Asignacion,
        'Bloque': Nodos.Bloque,
        'If': Nodos.If,
        'While': Nodos.While,
        'Switch': Nodos.Switch
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

SENTENCIA =  if_1:IF
            {return if_1}
            / print_s:PRINT
            {return print_s}
            /bloque:BLOQUE
            {return bloque}
            /asignacion:ASIGNACION
            {return asignacion}
            /switch_s:SWITCH
            {return switch_s}

IF = "if" _ "(" _ condicion:EXPRESION _ ")" _ sentenciasVerdadero:SENTENCIA 
            sentenciasFalso:(
            _ "else" _ sentenciasFalso:SENTENCIA 
            { return sentenciasFalso } )? 
            { return NuevoNodo('If', { condicion, sentenciasVerdadero, sentenciasFalso }) }

PRINT = "print(" _ expresion:EXPRESION _ ")" _ ";" _
            {return NuevoNodo('Print', { expresion })}

BLOQUE = "{" _ sentencias:INSTRUCCIONES* _ "}" 
            {return NuevoNodo('Bloque', { sentencias }) }

SWITCH = "switch" _ "(" _ condicion:EXPRESION _ ")" _ "{" _ cases:SWITCHCASE* default1:DEFAULTCASE? _ "}" 
            {return NuevoNodo('Switch', { condicion, cases, default1 }) }

SWITCHCASE = _ "case" _ valor:EXPRESION _ ":" _ bloquecase:INSTRUCCIONES* 
            {return { valor, bloquecase } }

DEFAULTCASE = _ "default" _ ":" _ sentencias:SENTENCIA* 
            {return { sentencias } }



ASIGNACION = id:IDENTIFICADOR _ "=" _ asignacion:EXPRESION _ ";" _ 
            { return NuevoNodo('asignacion', { id, asignacion }) }
            /id:IDENTIFICADOR _ operador:("+="/"-=")_ expresion:EXPRESION _ ";" _ 
            { return NuevoNodo('asignacion', 
            { id, asignacion: NuevoNodo('OperacionBinaria', 
            { operador, izquierda: NuevoNodo('ReferenciaVariable', { id }) , derecha: expresion }) }) }

EXPRESION =  ternario:TERNARIO
            {return ternario}
            /booleano:BOOLEANO
            {return booleano}
            / agrupacion:AGRUPACION
            {return agrupacion}
            / referenciaVariable:REFERENCIAVARIABLE
            {return referenciaVariable}
            / caracter:CARACTER
            {return caracter}
            / cadena:CADENA
            {return cadena}

Typeof = "typeof" _ exp:EXPRESION _ {return crearHoja('tipoOf', {exp})}

TERNARIO =  condicion:LOGICO _ "?" _ verdadero:LOGICO _ ":"_ falso:LOGICO _ 
            { return NuevoNodo('ternario', {condicion, verdadero, falso }) }
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
UNARIA = "-" _ expresion:OTRAEXPRESION {return NuevoNodo('OperacionUnaria', {operador: '-', expresion: expresion})}
        / OTRAEXPRESION

INCDEC= _ expresion:OTRAEXPRESION _ "++"
            { return NuevoNodo('OperacionUnaria', { operador: '++', expresion: expresion }) }
            / _ expresion:OTRAEXPRESION _ "--"
            { return NuevoNodo('OperacionUnaria', { operador: '--', expresion: expresion }) }

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
            / "boolean" 
            {return "bool"}
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
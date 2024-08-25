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
        'Switch': Nodos.Switch,
        'For': Nodos.For,
        'Break': Nodos.Break,
        'Continue': Nodos.Continue,
        'Return': Nodos.Return,
        'Llamada': Nodos.Llamada, 
        'Embebida': Nodos.Embebida,
        'DeclaracionArreglo1': Nodos.DeclaracionArreglo1,
        'DeclaracionArreglo2': Nodos.DeclaracionArreglo2,
        'DeclaracionArreglo3': Nodos.DeclaracionArreglo3,
        'IndexArreglo': Nodos.IndexArreglo
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
            /arreglo:ARREGLO
            {return arreglo}

ARREGLO = tipo:TIPO _ "[]" _ id:IDENTIFICADOR _ "=" _ valores:VALORES _ ";" 
            {return NuevoNodo('DeclaracionArreglo1', {tipo, id, valores})}
        /tipo1:TIPO _ "[]" _ id:IDENTIFICADOR _ "=" _ "new" _ tipo2:TIPO _ "[" _ numero:EXPRESION _ "]" _ ";" 
            {return NuevoNodo('DeclaracionArreglo2', {tipo1, id, tipo2, numero})}
        /tipo:TIPO _ "[]" _ id1:IDENTIFICADOR _ "=" _ id2:IDENTIFICADOR _ ";" 
            {return NuevoNodo('DeclaracionArreglo3', {tipo, id1, id2})}

VALORES = "{" _ valores:LISTAVALORES _ "}" 
            {return valores}

LISTAVALORES = expresion1:EXPRESION _ valores:("," _ expresion:EXPRESION {return expresion})* 
            {return [expresion1, ...valores]}

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
            /while_s:WHILE
            {return while_s}
            /for_s:FOR
            {return for_s}
            /break_s:BREAK
            {return break_s}
            /continue_s:CONTUNUE
            {return continue_s}
            /return_s:RETURN
            {return return_s}

IF = "if" _ "(" _ condicion:EXPRESION _ ")" _ sentenciasVerdadero:SENTENCIA 
            sentenciasFalso:(
            _ "else" _ sentenciasFalso:SENTENCIA 
            { return sentenciasFalso } )? 
            { return NuevoNodo('If', { condicion, sentenciasVerdadero, sentenciasFalso }) }

PRINT = "print(" _ expresion:EXPRESIONES _ ")" _ ";" _
        {return NuevoNodo('Print', { expresion })}

EXPRESIONES = primera:EXPRESION resto:(_ "," _ EXPRESION)* 
        {
            const expresiones = [primera];
            resto.forEach(([ , , , exp]) => expresiones.push(exp));
            return expresiones;
        }

BLOQUE = "{" _ sentencias:INSTRUCCIONES* _ "}" 
            {return NuevoNodo('Bloque', { sentencias }) }

SWITCH = "switch" _ "(" _ condicion:EXPRESION _ ")" _ "{" _ cases:SWITCHCASE* default1:DEFAULTCASE? _ "}" 
            {return NuevoNodo('Switch', { condicion, cases, default1 }) }

SWITCHCASE = _ "case" _ valor:EXPRESION _ ":" _ bloquecase:INSTRUCCIONES* 
            {return { valor, bloquecase } }

DEFAULTCASE = _ "default" _ ":" _ sentencias:SENTENCIA* 
            {return { sentencias } }

WHILE = _ "while" _ "(" _ condicion:EXPRESION _ ")" _ sentencias:BLOQUE 
            {return NuevoNodo('While', { condicion, sentencias }) }

FOR = "for" _ "("_ declaracion:FORINIT _ condicion:EXPRESION _ ";" _ incremento:ASIGNACION _ ")" _ sentencia:SENTENCIA 
            {return NuevoNodo('For', { declaracion, condicion, incremento, sentencia }) }

FORINIT = declaracion:DECLARACION 
            {return declaracion}
            / expresion:EXPRESION _ ";" _
            {return expresion}
            / ";" _
            {return null}

BREAK = "break" _ ";" _ 
            {return NuevoNodo('Break')}

CONTUNUE = "continue" _ ";" _ 
            {return NuevoNodo('Continue')}

RETURN = "return" _ expresion:EXPRESION? _ ";" _ 
            {return NuevoNodo('Return', {expresion})}

ASIGNACION = id:IDENTIFICADOR _ "=" _ asignacion:EXPRESION _ ";" _ 
            { return NuevoNodo('asignacion', { id, asignacion }) }

            /id:IDENTIFICADOR _ operador:("+="/"-=")_ expresion:EXPRESION _ ";" _ 
            { return NuevoNodo('asignacion', 
            { id, asignacion: NuevoNodo('OperacionBinaria', 
            { operador, izquierda: NuevoNodo('ReferenciaVariable', { id }) , derecha: expresion }) }) }

            /id:IDENTIFICADOR _ operador:("+="/"-=")_ expresion:EXPRESION _ 
            { return NuevoNodo('asignacion', 
            { id, asignacion: NuevoNodo('OperacionBinaria', 
            { operador, izquierda: NuevoNodo('ReferenciaVariable', { id }) , derecha: expresion }) }) }
            
            / id:IDENTIFICADOR _ operador:("++" / "--") _  ";" _
            { return NuevoNodo('asignacion', 
            { id, asignacion: NuevoNodo('OperacionUnaria', 
            { operador, expresion: NuevoNodo('ReferenciaVariable', { id }) }) }) }

            / id:IDENTIFICADOR _ operador:("++" / "--") _ 
            { return NuevoNodo('asignacion', 
            { id, asignacion: NuevoNodo('OperacionUnaria', 
            { operador, expresion: NuevoNodo('ReferenciaVariable', { id }) }) }) }

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

UNARIA = "-" _ expresion:UNARIA 
            {return NuevoNodo('OperacionUnaria', {operador: '-', expresion: expresion})}
        / "!" _ expresion:UNARIA 
            {return NuevoNodo('OperacionUnaria', {operador: '!', expresion: expresion})}
        / embe:("typeof") _ expresion:OTRAEXPRESION 
            {return NuevoNodo('Embebida', {Nombre: embe, Argumento: expresion})}
        / embe:("toString")"(" _ expresion:OTRAEXPRESION _ ")" _
            {return NuevoNodo('Embebida', {Nombre: embe, Argumento: expresion})}
        //arr1.indexOf(20)
        / id:IDENTIFICADOR _ ".indexOf" _ "(" _ expresion:OTRAEXPRESION _ ")" _
            {return NuevoNodo('IndexArreglo', {id, expresion})}
        / LLLAMADA

LLLAMADA = callee:OTRAEXPRESION _ parametros:("(" argumentos:ARGUMENTOS? ")" { return argumentos })* {
    return parametros.reduce(
        (callee, argumentos) => {
            return NuevoNodo('Llamada', { callee, argumentos: argumentos || [] })
            },
    callee
    )
}

ARGUMENTOS = argumento:EXPRESION _ argumentos:("," _ expresion:EXPRESION 
{ return expresion })* 
{ return [argumento, ...argumentos] }

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
            {return text()}
            / "char" 
            {return text()}
            / "var"
            {return text()}

IDENTIFICADOR = [a-zA-Z_][a-zA-Z0-9_]* 
            { return text(); }

DECIMAL = [0-9]+ "." [0-9]+
            {return NuevoNodo('decimal', {valor: parseFloat(text()), tipo: "float"})}

ENTERO = [0-9]+
            {return NuevoNodo('entero', {valor: parseInt(text()), tipo: "int"})}

CADENA = "\"" contenido:[^"]* "\""
            {   
                var text = contenido.join('');
                text = text.replace(/\\n/g, "\n");
                text = text.replace(/\\\\/g, "\\");
                text = text.replace(/\\\"/g,"\"");
                text = text.replace(/\\r/g, "\r");
                text = text.replace(/\\t/g, "\t");
                text = text.replace(/\\\'/g, "'");
                return NuevoNodo('cadena', {valor: text, tipo: "string"});
            }

CARACTER = "'" caracter:[\x00-\x7F] "'" 
            { 
                return NuevoNodo('caracter', { valor: caracter, tipo: "char" });
            }

BOOLEANO = "true" 
            {return NuevoNodo('booleano', {valor: true, tipo: "boolean"})}
            / "false" 
            {return NuevoNodo('booleano', {valor: false, tipo: "boolean"})}

AGRUPACION = _ "(" _ expresion:EXPRESION _ ")"_ 
            {return NuevoNodo('Agrupacion', {expresion})}

REFERENCIAVARIABLE = id:IDENTIFICADOR 
            {return NuevoNodo('ReferenciaVariable', {id})}


_ = (ESPACIOBLANCO / COMENTARIO)*

ESPACIOBLANCO = [ \t\n\r]+

COMENTARIO = COMENTARIOL / COMENTARIOLN

COMENTARIOL = "//" (![\n\r].)*

COMENTARIOLN = "/*" (!"*/".)* "*/"
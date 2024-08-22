{
    const NuevoNodo = (TipoNodo, props) =>{
    const tipos = {
        'numero': Nodos.Numero,
        'cadena': Nodos.Cadena,
        'caracter': Nodos.Caracter,	
        'booleano': Nodos.Booleano,
        'agrupacion': Nodos.Agrupacion,
        'binaria': Nodos.OperacionBinaria,
        'unaria': Nodos.OperacionUnaria,
        'DeclaracionVar': Nodos.DeclaracionVar,
        'referenciaVariable': Nodos.ReferenciaVariable,
        'print': Nodos.Print,
        'sentencia': Nodos.ExpresionStmt,
        'asignacion': Nodos.Asignacion,
        'bloque': Nodos.Bloque,
        'if': Nodos.If,
        'while': Nodos.While
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
            / print:PRINT _
            {return print}
            / sentencia:SENTENCIA _
            {return sentencia}


DECLARACION = tipo:TIPO _ id:IDENTIFICADOR _ "=" _ expresion:EXPRESION _ ";" _
            {return NuevoNodo('DeclaracionVar', {tipo, id, expresion })}
            / tipo:TIPO _ id:IDENTIFICADOR _ ";" _
            {return NuevoNodo('DeclaracionVar', {tipo, id })}

PRINT = "print(" _ expresion:EXPRESION _ ")" _ ";" _
            {return NuevoNodo('print', { expresion })}

SENTENCIA =  expresion:EXPRESION _ ";"_
            {return NuevoNodo('sentencia', { expresion }) }


EXPRESION = numero:NUMERO
            {return numero}
            / booleano:BOOLEANO
            {return booleano}
            / cadena:CADENA
            {return cadena}
            / caracter:CARACTER
            {return caracter}
            / agrupacion:AGRUPACION
            {return agrupacion}
            / referenciaVariable:REFERENCIAVARIABLE
            {return referenciaVariable}


AGRUPACION = _ "(" _ expresion:EXPRESION _ ")"_ 
            {return NuevoNodo('agrupacion', {expresion})}

REFERENCIAVARIABLE = id:IDENTIFICADOR 
            {return NuevoNodo('referenciaVariable', {id})}

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

IDENTIFICADOR = [a-zA-Z][a-zA-Z0-9]* 
            {return text()}
NUMERO = [0-9]+( "." [0-9]+ )? 
            {return NuevoNodo('numero', {valor: parseFloat(text(), 10)})}
CADENA = "\"" contenido:[^"]* "\""
            {   
                var text = contenido.join('');  // Convierte la lista de caracteres en una cadena
                text = text.replace(/\\n/g, "\n");
                text = text.replace(/\\\\/g, "\\");
                text = text.replace(/\\\"/g,"\"");
                text = text.replace(/\\r/g, "\r");
                text = text.replace(/\\t/g, "\t");
                text = text.replace(/\\\'/g, "'");
                return NuevoNodo('cadena', {valor: text});
            }

CARACTER = "'" [a-zA-Z0-9_]? "'"
            {return NuevoNodo('caracter', {valor: text()})}
BOOLEANO = "true" 
            {return NuevoNodo('booleano', {valor: true})}
            / "false" 
            {return NuevoNodo('booleano', {valor: false})}

_ = [ \t\n\r]*
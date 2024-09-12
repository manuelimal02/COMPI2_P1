# GRAMATICA
PROGRAMA = INSTRUCCIONES* 

INSTRUCCIONES = SENTENCIA 
            | DECLARACION
            | COMENTARIO

SENTENCIA = BLOQUE
            | STRUCT
            | FUNCIONFORRANEA
            | PRINT
            | IF
            | BREAK
            | CONTUNUE
            | RETURN
            | LLAMADA ";" 
            | ASIGNACIONATRIBUTO
            | ASIGNACION
            | ASIGNACIONARREGLO
            | ASIGNACIONMATRIZ
            | SWITCH
            | WHILE
            | FOR
            | FOREACH

BLOQUE = "{" INSTRUCCIONES* "}" 

DECLARACION = (IDENTIFICADOR | "var") IDENTIFICADOR  "="  EXPRESION ";" 
            | IDENTIFICADOR "=" EXPRESION  ";" 
            | TIPO IDENTIFICADOR  ";" 
            | ARREGLO
            | MATRIZ 

## STRUCTS
STRUCT = "struct" IDENTIFICADOR "{" ATRIBUTO* "}" ";"?

ATRIBUTO =  ("int"|"float"|"string"|"boolean"|"char"|IDENTIFICADOR) IDENTIFICADOR ";"  

ASIGNACIONSTRUCT = IDENTIFICADOR  "{"  LISTAATRIBUTOS "}" 

LISTAATRIBUTOS =  LISTAATRIBUTOS "," IDENTIFICADOR  ":"   EXPRESION  
            | IDENTIFICADOR  ":"   EXPRESION

ACCESONATRIBUTO = IDENTIFICADOR  ("." IDENTIFICADOR)* 

ASIGNACIONATRIBUTO =  IDENTIFICADOR  ("."  IDENTIFICADOR)* "="   EXPRESION  ";"


## FUNCIONES
FUNCIONFORRANEA = (TIPO/ "void")  IDENTIFICADOR  "(" PARAMETROS? ")" BLOQUE

PARAMETROS = PARAMETROS "," PARAMETRO 
            | PARAMETRO

PARAMETRO = (TIPO/IDENTIFICADOR) ARREGLODIMENSION?  IDENTIFICADOR

ARREGLODIMENSION = ("["  "]")*


## ARREGLOS
ARREGLO = TIPO  "[]"  IDENTIFICADOR  "="  VALORES  ";" 
        | TIPO  "[]"  IDENTIFICADOR  "="  "new" TIPO  "[" EXPRESION  "]"  ";" 
        | TIPO  "[]"  IDENTIFICADOR  "="  IDENTIFICADOR  ";" 

VALORES = "{" LISTAVALORES "}" 

LISTAVALORES = LISTAVALORES "," EXPRESION
            | EXPRESION


## SENTENCIAS
IF =  "if" "(" EXPRESION ")" SENTENCIA
            | "else" SENTENCIA 
            | "else"

PRINT =  "System.out.println("  EXPRESIONES  ")"  ";" 

EXPRESIONES = EXPRESIONES "," EXPRESION
            | EXPRESION

SWITCH = "switch"  "(" EXPRESION  ")"  "{" SWITCHCASE* DEFAULTCASE? "}" 

SWITCHCASE = "case" EXPRESION  ":" INSTRUCCIONES* 

DEFAULTCASE = "default" ":" SENTENCIA* 

WHILE = "while"  "(" EXPRESION ")"  BLOQUE 

FOR = "for"  "(" FORINIT EXPRESION  ";" ASIGNACION  ")" SENTENCIA 

FORINIT = ASIGNACION
            |DECLARACION 

FOREACH = "for" "("   TIPO  IDENTIFICADOR  ":" IDENTIFICADOR  ")"  SENTENCIA 

BREAK =  "break"  ";"  

CONTUNUE =  "continue"  ";"  

RETURN =  "return"  EXPRESION?  ";"  

ASIGNACION = IDENTIFICADOR  "="  EXPRESION  ";"  
            | IDENTIFICADOR  "="  EXPRESION 
            | IDENTIFICADOR ("+="/"-=") EXPRESION  ";"  
            | IDENTIFICADOR ("+="/"-=") EXPRESION  
            | IDENTIFICADOR ("++" / "--")   ";" 
            | IDENTIFICADOR ("++" / "--")  

ASIGNACIONARREGLO = IDENTIFICADOR  "[" EXPRESION  "]"  "=" EXPRESION  ";"  

ASIGNACIONMATRIZ = IDENTIFICADOR VALORESMATRIZ  "=" EXPRESION  ";" 

## MATRICES
MATRIZ = TIPO LISTADIMENSIONES  IDENTIFICADOR  "="  INICIALIZACIONMATRIZ  ";" 
            | TIPO LISTADIMENSIONES  IDENTIFICADOR  "="  "new" TIPO  VALORESMATRIZ  ";" 

LISTADIMENSIONES = "["  "]" LISTADIMENSIONES? 

INICIALIZACIONMATRIZ =  "{"  LISTAVALORES  "}" 

LISTAVALORES =  "{"  LISTAVALORES  "}" ( ","  LISTAVALORES)? 
            |EXPRESION ( ","  LISTAVALORES)?

VALORESMATRIZ =  "["  EXPRESION  "]" VALORESMATRIZ* 

## EXPRESIONES
EXPRESION = TERNARIO
            | BOOLEANO
            | AGRUPACION
            | REFERENCIAVARIABLE
            | CARACTER
            | CADENA

TERNARIO = LOGICO  "?" LOGICO  ":" LOGICO  
            / LOGICO
LOGICO = OR

OR = AND ("||")  AND  

AND = IGUALDAD ("&&")  IGUALDAD 

IGUALDAD = RELACIONAL ("=="|"!=")  RELACIONAL 

RELACIONAL = ARITMETICA ("<="|">="|"<"|">")  ARITMETICA 

ARITMETICA = SUMA

SUMA = MULTIPLICACION ("+"|"-")  MULTIPLICACION 

MULTIPLICACION = UNARIA ("*"|"/"|"%")  UNARIA

UNARIA = "-"  UNARIA 
            | "!"  UNARIA 
            | "typeof" EXPRESION 
            | "toString" "("  EXPRESION  ")" 
            | "Object.keys" "("  IDENTIFICADOR  ")" 
            | IDENTIFICADOR ".indexOf"  "("  index:OTRAEXPRESION  ")"
            | IDENTIFICADOR ".join()"
            | IDENTIFICADOR VALORESLENGTH ".length"
            | IDENTIFICADOR VALORESMATRIZ
            | IDENTIFICADOR "["  index:OTRAEXPRESION  "]"
            | ACCESONATRIBUTO
            | LLAMADA
            | OTRAEXPRESION

VALORESLENGTH = "[" :EXPRESION  "]" 

LLAMADA = OTRAEXPRESION "(" ARGUMENTOS? ")" 

ARGUMENTOS = ARGUMENTOS ","  EXPRESION 
            | EXPRESION 

OTRAEXPRESION = DECIMAL
            | ENTERO
            | BOOLEANO
            | AGRUPACION
            | ASIGNACIONSTRUCT 
            | REFERENCIAVARIABLE
            | CARACTER
            | CADENA

TIPO = "int" 
            | "float" 
            | "string" 
            | "boolean" 
            | "char" 
            | "var"

IDENTIFICADOR = [a-zA-Z][a-zA-Z0-9]* 

DECIMAL = [0-9]+ "." [0-9]+

ENTERO = [0-9]+

CADENA = "\""[^"]* "\""

CARACTER = "'" caracter:[\x00-\x7F] "'" 

BOOLEANO = "true" 
            |"false" 

AGRUPACION =  "("  EXPRESION  ")" 

REFERENCIAVARIABLE = IDENTIFICADOR 

COMENTARIO = COMENTARIOL
            | COMENTARIOLN

COMENTARIOL = "//" (![\n\r].)*

COMENTARIOLN = "/*" (!"*/".)* "*/"
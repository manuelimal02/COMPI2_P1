let UltimoAST = null;
import { parse } from '../Interprete/Analizador/Parser.js';
import { Interprete } from '../Interprete/Analizador/InterpreteV.js';

export function FuncionArchivo() {
    const entrada = document.getElementById('txtAreaEntrada');
    const salida = document.getElementById('txtAreaSalida');
    const fileInput = document.getElementById('fileInput');
    const AbrirArchivo = document.getElementById('AbrirArchivo');
    const CrearArchivo = document.getElementById('CrearArchivo');
    const GuardarArchivo = document.getElementById('GuardarArchivo');
    const TablaSimbolos = document.getElementById('TablaSimbolos');

    function FuncionAbrirArchivo(evento) {
        const archivo = evento.target.files[0];
        if (archivo && archivo.name.endsWith('.oak')) {
            const lector = new FileReader();
            lector.onload = function(e) {
                entrada.value = e.target.result;
                ActualizarNumeroLinea(entrada, document.getElementById('lnEntrada'));
            };
            lector.readAsText(archivo);
        } else {
            alert('Seleccione Archivo Con La Extensión .OAK');
        }
    }

    function ContenidoArchivo(contenido, nombreArchivo) {
        const blob = new Blob([contenido], { type: 'text/plain' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = nombreArchivo;
        enlace.click();
    }

    function handleNuevoArchivo() {
        if (entrada.value.trim() !== "") {
            const debeGuardar = confirm("¿Desea Crear Un Archivo Con El Contenido Actual?");
            if (debeGuardar) {
                const nombreArchivo = prompt("Ingrese Nombre De Archivo .OAK", "CrearArchivo.oak");
                if (nombreArchivo) {
                    ContenidoArchivo(entrada.value, nombreArchivo);
                }
            }
        }else{
            alert("No Hay Contenido Para Crear.");
        }
        entrada.value = "";
        salida.value = "";
        ActualizarNumeroLinea(entrada, document.getElementById('lnEntrada'));
        ActualizarNumeroLinea(salida, document.getElementById('lnSalida'));
    }

    async function handleGuardarArchivo() {
        try {
            const options = {
                types: [{
                    description: 'Archivo OakLang',
                    accept: { 'text/plain': ['.oak'] }
                }],
                suggestedName: 'GuardarArchivo.oak'
            };
            const archivoHandler = await window.showSaveFilePicker(options);
            const stream = await archivoHandler.createWritable();
            await stream.write(entrada.value);
            await stream.close();
    
            alert('Archivo Guardado Exitosamente.');
        } catch (error) {
            console.error('Error Al Guardar El Archivo:', error);
        }
    }

    function ActualizarNumeroLinea(areaTexto, numerosLinea) {
        const lineas = areaTexto.value.split('\n').length;
        numerosLinea.innerHTML = Array.from({ length: lineas }, (_, i) => i + 1).join('<br>');
    }

    function TablaSimbolosHTML() {
        const interprete = new Interprete();
        console.log("Tabla De Simbolos");
        console.log(interprete.entornoActual);
    }

    AbrirArchivo.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', FuncionAbrirArchivo);

    CrearArchivo.addEventListener('click', () => {
        handleNuevoArchivo();
    });

    GuardarArchivo.addEventListener('click', () => {
        handleGuardarArchivo();
    });

    TablaSimbolos.addEventListener('click', () => {
        TablaSimbolosHTML();
    });
}

export function FuncionInterprete() {
    const entrada = document.getElementById('txtAreaEntrada');
    const salida = document.getElementById('txtAreaSalida');
    const LNEntrada = document.getElementById('lnEntrada');
    const LNSalida = document.getElementById('lnSalida');
    const BtnEjecutar = document.getElementById('analizaEntrada');

    if (!entrada || !salida || !LNEntrada || !LNSalida || !BtnEjecutar) {
        console.error("Faltan Elementos En EL DOM");
        return;
    }

    function ActualizarNumeroLinea(areaTexto, numerosLinea) {
        const lineas = areaTexto.value.split('\n').length;
        numerosLinea.innerHTML = Array.from({ length: lineas }, (_, i) => i + 1).join('<br>');
    }

    function sincronizarScroll(areaTexto, numerosLinea) {
        numerosLinea.scrollTop = areaTexto.scrollTop;
    }

    function manejarEntrada() {
        ActualizarNumeroLinea(entrada, LNEntrada);
        ActualizarNumeroLinea(salida, LNSalida);
    }

    function ejecutarCodigo() {
        const codigo = entrada.value;
        const interprete = new Interprete();
        let sentencias;
        
        try {
            sentencias = parse(codigo);
            console.log({ sentencias });
        } catch (error) {
            salida.innerHTML = "Error de sintaxis: " + error.message;
            console.error("Error de sintaxis:", error);
            return;
        }
    
        sentencias.forEach(sentencia => {
            try {
                sentencia.accept(interprete);
            } catch (error) {
                // Aquí se captura el error de la sentencia específica
                interprete.salida += "Error: " + error.message + '\n';
                console.error("Error:", error);
            }
        });
    
        salida.value = interprete.salida;
        ActualizarNumeroLinea(salida, LNSalida);
    }
    

    entrada.addEventListener('input', manejarEntrada);
    entrada.addEventListener('scroll', () => sincronizarScroll(entrada, LNEntrada));
    salida.addEventListener('scroll', () => sincronizarScroll(salida, LNSalida));
    BtnEjecutar.addEventListener('click', ejecutarCodigo);

    manejarEntrada();
}

export function obtenerAST() {
    return UltimoAST;
}

document.addEventListener("DOMContentLoaded", function() {
    FuncionInterprete();
    FuncionArchivo();
});